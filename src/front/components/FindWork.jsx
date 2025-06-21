import { useState, useEffect } from "react";
import { getPosts } from "../services/PostServices.jsx";
import { getCategories } from "../services/CategoryServices.jsx";
import "../../front/FindWork.css";
import storeReducer from "../store.js";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const FindWork = () => {
  const {store, dispatch} = useGlobalReducer();
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryMap, setCategoryMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ 
    category_name: "", 
    project_country: "", 
    project_city: "" 
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [uniqueData, setUniqueData] = useState({
    countries: [],
    cities: []
  });
  const itemsPerPage = 5;
  const navigate = useNavigate();
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [postData, categoryData] = await Promise.all([
          getPosts(),
          getCategories()
        ]);

        setPosts(postData);
        setCategories(categoryData);
        
        // Create category map
        const map = categoryData.reduce((acc, cat) => {
          acc[cat.id] = cat.name;
          return acc;
        }, {});
        setCategoryMap(map);

        // Extract unique locations
        setUniqueData({
          countries: [...new Set(postData.map(p => p.project_country))].filter(Boolean),
          cities: [...new Set(postData.map(p => p.project_city))].filter(Boolean)
        });
        
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchAllData();
  }, []);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
    setCurrentPage(1);
  };

  const filteredPosts = posts.filter(pos => {
    const postCategoryName = categoryMap[pos.category_id];
    return (
      (!filters.category_name || postCategoryName === filters.category_name) &&
      (!filters.project_country || pos.project_country === filters.project_country) &&
      (!filters.project_city || pos.project_city === filters.project_city)
    );
  });

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

  if (loading) return <div className="container text-center my-5">Loading...</div>;
  if (error) return <div className="container text-center my-5">Error: {error}</div>;


  const handleClick = (post) => {
   if (store.user?.is_professional && store.user?.plan?.name?.length > 0) {
      
      console.log('poner aqui el navigate a la pagina de detalles del post', post);
      
    } else {
      navigate('/pricing')
    }
  }

  return (
    <div className="container">
      <div className="container-fluid filtersCustom align-content-center my-5">
        <h2 className="text-center text-white my-5">🔍 Search Options</h2>
        <div className="container my-5">
          <div className="row findwork__row g-3">
            <div className="col-lg-2 col-md-6 col-sm-12">
              <select 
                className="form-select" 
                value={filters.category_name}
                onChange={(e) => handleFilterChange("category_name", e.target.value)}
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div className="col-lg-2 col-md-6 col-sm-12">
              <select 
                className="form-select"
                value={filters.project_country}
                onChange={(e) => handleFilterChange("project_country", e.target.value)}
              >
                <option value="">Select Country</option>
                {uniqueData.countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>
            <div className="col-lg-2 col-md-6 col-sm-12">
              <select 
                className="form-select"
                value={filters.project_city}
                onChange={(e) => handleFilterChange("project_city", e.target.value)}
              >
                <option value="">Select City</option>
                {uniqueData.cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      
      {/* Sección de proyectos con el nuevo diseño */}
      <div className="published-projects">
        <div className="dashboard-container">
          <h2 className="section-title">Latest Projects</h2>

          {/* Paginación */}
          <nav className="projects-pagination">
            <ul className="pagination-list">
              <li className={`pagination-item ${currentPage === 1 ? "disabled" : ""}`}>
                <button
                  className="pagination-button"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  &laquo;
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, i) => (
                <li key={i + 1} className={`pagination-item ${currentPage === i + 1 ? "active" : ""}`}>
                  <button
                    className="pagination-button"
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
              <li className={`pagination-item ${currentPage === totalPages ? "disabled" : ""}`}>
                <button
                  className="pagination-button"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  &raquo;
                </button>
              </li>
            </ul>
          </nav>

          {/* Grid de proyectos */}
          <div className="projects-grid">
            {paginatedPosts.map(post => (
              <div key={post.id} className="project-card">
                <div className="card-header">
                  <h3 className="card-title">{categoryMap[post.category_id] || "Unknown Category"}</h3>
                  <div className="card-meta">
                    <span>{post.project_city}, {post.project_country}</span>
                    <span className="meta-separator">|</span>
                    <span>📅 {post.post_date.split('T')[0].split('-').reverse().join('-')}</span>
                  </div>
                </div>

                <div className="card-body">
                  <p className="card-description">{post.post_description}</p>
                </div>

                <div className="card-footer">
                  <button className="primary-button">View more</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};