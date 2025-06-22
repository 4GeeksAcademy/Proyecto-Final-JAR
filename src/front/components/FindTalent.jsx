import { useState, useEffect } from "react";
import { getProfessionals } from "../services/ProfessionalServices.jsx";
import "../../front/FindWork.css";
import { Link } from "react-router-dom";

export const FindTalent = () => {
  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ min_rating: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProfessionals();
        setProfessionals(data);
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

  const filteredProfessionals = professionals.filter(pro =>
    !filters.min_rating || (pro.average_rating && pro.average_rating >= parseFloat(filters.min_rating))
  );

  const totalPages = Math.ceil(filteredProfessionals.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProfessionals = filteredProfessionals.slice(startIndex, endIndex);

  if (loading) return <div className="container text-center my-5">Cargando profesionales...</div>;
  if (error) return <div className="container text-center my-5 text-danger">Error: {error}</div>;

  return (
    <div className="container">
      <div className="container-fluid filtersCustom align-content-center my-5">
        <h2 className="text-center text-white my-5">🔍 Buscar Profesionales</h2>
        <div className="container my-5">
          <div className="row findwork__row g-3">
            <div className="col-lg-3 col-md-6 col-sm-12">
              <select className="form-select" onChange={(e) => handleFilterChange("min_rating", e.target.value)}>
                <option value="">Filtrar por rating</option>
                <option value="3">⭐ 3+ estrellas</option>
                <option value="4">⭐ 4+ estrellas</option>
                <option value="4.5">⭐ 4.5+ estrellas</option>
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

        {paginatedProfessionals.map(pro => (
          <div key={pro.id} className="col-12 customCard">
            <div className="card findwork__card p-3 shadow-sm">
              <div className="name-rating-container">
                <h5 className="profname">{pro.name || "Nombre del Profesional"}</h5>
                <div className="rating-container">
                  <p className="mb-0">⭐ <strong>{pro.average_rating ? pro.average_rating.toFixed(1) : "No rating"}</strong></p>
                </div>
              </div>

              <div className="row findwork__row">
                <p className="col-12 customDescription">
                  {pro.prof_experience
                    ? pro.prof_experience.length > 600
                      ? pro.prof_experience.slice(0, 600) + "..."
                      : pro.prof_experience
                    : "Sin descripción disponible."}
                </p>
              </div>
              <div className="row mt-3">
                <div className="col text-end">
                  <Link to={`/profesional/${pro.id}`}className="btn-custom-details">View details</Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
