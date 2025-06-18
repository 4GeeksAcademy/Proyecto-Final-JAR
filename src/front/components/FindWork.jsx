import { useState, useEffect } from "react";
import { getPosts } from "../services/PostServices.jsx";
import { getCategories } from "../services/CategoryServices.jsx";
import "../../front/FindWork.css";

export const FindWork = () => {
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
      <div className="row findwork__row customCard">
        <nav>
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)} aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index + 1} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                <button className="page-link" onClick={() => setCurrentPage(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)} aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </button>
            </li>
          </ul>
        </nav>
        {paginatedPosts.map(post => (
          <div key={post.id} className="col-12 customCard">
            <div className="card findwork__card p-3 shadow-sm">
              <div className="row findwork__row w-100 align-items-center">
                <div className="col-lg-4 col-md-4 col-sm-6 d-flex justify-content-between">
                  <p className="customTittle">{categoryMap[post.category_id] || "Unknown Category"}</p>
                  <p>{post.project_city}, {post.project_country}</p>
                </div>
                <div className="col-lg-4 col-md-4 col6-sm-6 d-flex justify-content-between">
                  <p>📅 {post.post_date}</p>
                </div>
              </div>
              <div className="row findwork__row">
                <p className="col-12 customDescription">{post.post_description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};