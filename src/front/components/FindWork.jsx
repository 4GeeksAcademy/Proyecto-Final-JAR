import { useState, useEffect } from "react";
import { getPosts } from "../services/PostServices.jsx";
import "../../front/FindWork.css";
import  useGlobalReducer  from "../hooks/useGlobalReducer";

export const FindWork = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ category: "", country: "", city: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;



  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
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

  const filteredJobs = posts.filter(job =>
    (!filters.category || job.category === filters.category) &&
    (!filters.country || job.country === filters.country) &&
    (!filters.city || job.city === filters.city) 
    // (!filters.date || job.date === filters.date)
  );

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedJobs = filteredJobs.slice(startIndex, endIndex);

  if (loading) return <div className="container text-center my-5">Loading...</div>;
  if (error) return <div className="container text-center my-5">Error: {error}</div>;

  return (
    <div className="container">
      <div className="container-fluid filtersCustom align-content-center my-5">
        <h2 className="text-center text-white my-5">🔍 Search Options</h2>
        <div className="container my-5">
          <div className="row findwork__row g-3">
            {/* <div className="col-lg-2 col-md-6 col-sm-12">
              <select className="form-select" onChange={(e) => handleFilterChange("category", e.target.value)}>
                <option value="">Seleccionar Categoría</option>
                <option value="Tecnología">Tecnología</option>
                <option value="Diseño">Diseño</option>
                <option value="Marketing">Marketing</option>
              </select>
            </div>
            <div className="col-lg-2 col-md-6 col-sm-12">
              <select className="form-select" onChange={(e) => handleFilterChange("country", e.target.value)}>
                <option value="">Seleccionar País</option>
                <option value="España">España</option>
                <option value="México">México</option>
                <option value="Argentina">Argentina</option>
              </select>
            </div>
            <div className="col-lg-2 col-md-6 col-sm-12">
              <select className="form-select" onChange={(e) => handleFilterChange("city", e.target.value)}>
                <option value="">Seleccionar Ciudad</option>
                <option value="Madrid">Madrid</option>
                <option value="CDMX">CDMX</option>
                <option value="Buenos Aires">Buenos Aires</option>
              </select>
            </div> */}
            {/* <div className="col-lg-2 col-md-6 col-sm-12">
              <input type="date" className="form-control" onChange={(e) => handleFilterChange("date", e.target.value)} />
            </div> */}
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
        {paginatedJobs.map(post => (
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
};