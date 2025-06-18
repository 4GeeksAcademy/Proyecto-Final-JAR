import { useState, useEffect } from "react";
import { getPosts } from "../services/PostServices.jsx";
import "../../front/FindWork.css";


export const FindWork = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ category_id: "", project_country: "", project_city: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [uniqueData, setUniqueData] = useState({
    countries: [],
    cities: [],
    categories: []
  });
  const itemsPerPage = 5;



  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = await getPosts();
  //       setPosts(data);
  //       setLoading(false);
  //     } catch (err) {
  //       setError(err.message);
  //       setLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
        
        // Extract unique values from posts
        const countries = [...new Set(data.map(post => post.project_country))].filter(Boolean);
        const cities = [...new Set(data.map(post => post.project_city))].filter(Boolean);
        const categories = [...new Set(data.map(post => post.category_id.toString()))].filter(Boolean);

        setUniqueData({
          countries,
          cities,
          categories
        });
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleFilterChange = (filterType, value) => {
    setFilters({ ...filters, [filterType]: value });
    setCurrentPage(1);
  };

  const filteredPosts = posts.filter(pos =>
    (!filters.category_id || pos.category_id.toString() === filters.category_id) &&
    (!filters.project_country || pos.project_country === filters.project_country) &&
    (!filters.project_city || pos.project_city === filters.project_city) 
  );

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
                value={filters.category_id}
                onChange={(e) => handleFilterChange("category_id", e.target.value)}
              >
                <option value="">Select Category</option>
                {uniqueData.categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
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
                  <p className="customTittle">{post.category_id}</p>
                  <p>{post.project_city}, {post.project_country}</p>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-6 d-flex justify-content-between">
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
}