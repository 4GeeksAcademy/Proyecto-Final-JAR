import { useState } from "react";
import "../../front/FindWork.css";

const jobData = [
  { id: 1, country: "España", city: "Madrid", date: "2025-06-10", category: "Tecnología", description: "Desarrollo de aplicaciones web." },
  { id: 2, country: "México", city: "CDMX", date: "2025-06-12", category: "Diseño", description: "Diseño de interfaces y experiencia de usuario." },
  { id: 3, country: "Argentina", city: "Buenos Aires", date: "2025-06-15", category: "Marketing", description: "Estrategias de marketing digital." },
  { id: 4, country: "Colombia", city: "Bogotá", date: "2025-06-18", category: "Administración", description: "Gestión de proyectos corporativos." },
  { id: 5, country: "Chile", city: "Santiago", date: "2025-06-20", category: "Finanzas", description: "Análisis financiero para inversiones." },
  { id: 6, country: "Estados Unidos", city: "Nueva York", date: "2025-06-22", category: "Tecnología", description: "Desarrollo de software de inteligencia artificial." },
  { id: 7, country: "Brasil", city: "Río de Janeiro", date: "2025-06-25", category: "Diseño", description: "Creación de contenido visual para redes sociales." },
  { id: 8, country: "Francia", city: "París", date: "2025-06-28", category: "Marketing", description: "Gestión de campañas publicitarias." },
  { id: 9, country: "Alemania", city: "Berlín", date: "2025-06-30", category: "Administración", description: "Coordinación de recursos humanos." },
  { id: 10, country: "Italia", city: "Roma", date: "2025-07-02", category: "Finanzas", description: "Evaluación de riesgos financieros." },
   { id: 1, country: "España", city: "Madrid", date: "2025-06-10", category: "Tecnología", description: "Desarrollo de aplicaciones web." },
  { id: 2, country: "México", city: "CDMX", date: "2025-06-12", category: "Diseño", description: "Diseño de interfaces y experiencia de usuario." },
  { id: 3, country: "Argentina", city: "Buenos Aires", date: "2025-06-15", category: "Marketing", description: "Estrategias de marketing digital." },
  { id: 4, country: "Colombia", city: "Bogotá", date: "2025-06-18", category: "Administración", description: "Gestión de proyectos corporativos." },
  { id: 5, country: "Chile", city: "Santiago", date: "2025-06-20", category: "Finanzas", description: "Análisis financiero para inversiones." },
  { id: 6, country: "Estados Unidos", city: "Nueva York", date: "2025-06-22", category: "Tecnología", description: "Desarrollo de software de inteligencia artificial." },
  { id: 7, country: "Brasil", city: "Río de Janeiro", date: "2025-06-25", category: "Diseño", description: "Creación de contenido visual para redes sociales." },
  { id: 8, country: "Francia", city: "París", date: "2025-06-28", category: "Marketing", description: "Gestión de campañas publicitarias." },
  { id: 9, country: "Alemania", city: "Berlín", date: "2025-06-30", category: "Administración", description: "Coordinación de recursos humanos." },
  { id: 10, country: "Italia", city: "Roma", date: "2025-07-02", category: "Finanzas", description: "Evaluación de riesgos financieros." }
];

export const FindWork = () => {
  const [filters, setFilters] = useState({ category: "", country: "", city: "", date: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleFilterChange = (filterType, value) => {
    setFilters({ ...filters, [filterType]: value });
    setCurrentPage(1); // Reinicia la paginación cuando se aplican filtros
  };

  const filteredJobs = jobData.filter(job =>
    (!filters.category || job.category === filters.category) &&
    (!filters.country || job.country === filters.country) &&
    (!filters.city || job.city === filters.city) &&
    (!filters.date || job.date === filters.date)
  );

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedJobs = filteredJobs.slice(startIndex, endIndex);

  return (
    <div className="container">
  {/* Filtros */}
  <div className="container-fluid filtersCustom align-content-center my-5">
    <h2 className="text-center text-white my-5">🔎 Find Professionals</h2>
    <div className="container my-5">
      <div className="row findwork__row g-3">
        <div className="col-lg-2 col-md-6 col-sm-12">
          <select className="form-select" onChange={(e) => handleFilterChange("category", e.target.value)}>
            <option value="">Select Category</option>
            <option value="Development">Development</option>
            <option value="Design">Design</option>
            <option value="Marketing">Marketing</option>
          </select>
        </div>
        <div className="col-lg-2 col-md-6 col-sm-12">
          <select className="form-select" onChange={(e) => handleFilterChange("country", e.target.value)}>
            <option value="">Select Country</option>
            <option value="Spain">Spain</option>
            <option value="Mexico">Mexico</option>
            <option value="Argentina">Argentina</option>
          </select>
        </div>
        <div className="col-lg-2 col-md-6 col-sm-12">
          <select className="form-select" onChange={(e) => handleFilterChange("city", e.target.value)}>
            <option value="">Select City</option>
            <option value="Madrid">Madrid</option>
            <option value="CDMX">CDMX</option>
            <option value="Buenos Aires">Buenos Aires</option>
          </select>
        </div>
        <div className="col-lg-2 col-md-6 col-sm-12">
          <input type="date" className="form-control" onChange={(e) => handleFilterChange("date", e.target.value)} />
        </div>
      </div>
    </div>
  </div>

  {/* Resultados con paginación */}
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

    {paginatedJobs.map((pro) => (
      <div key={pro.id} className="col-12 customCard">
        <div className="card findwork__card p-3 shadow-sm">
          <div className="row findwork__row w-100 align-items-center">
            <div className="col-lg-4 col-md-4 col-sm-6 d-flex justify-content-between">
              <p className="customTittle">{pro.category}</p>
              <p>{pro.city}, {pro.country}</p>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 d-flex justify-content-between">
              <p>📅 {pro.date}</p>
            </div>
          </div>
          <div className="row findwork__row">
            <p className="col-12 customDescription">{pro.description}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
  );
};
