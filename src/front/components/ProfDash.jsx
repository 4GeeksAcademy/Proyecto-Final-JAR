import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../front/profdash.css";
import { getProfessionalCandidatures } from "../services/CandidatureServices.jsx";

const statusLabels = {
  IN_PROCESS: "In Progress",
  ACCEPTED: "Accepted",
  REJECTED: "Rejected"
};

export const ProfessionalDashboard = () => {
  const [candidatures, setCandidatures] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [pastPage, setPastPage] = useState(1);
  const [archivedPage, setArchivedPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const pageSize = 5;
  const navigate = useNavigate();

  useEffect(() => {
  const fetchCandidatures = async () => {
    try {
      setLoading(true);
      const data = await getProfessionalCandidatures();
      setCandidatures(data || []);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message || "Failed to load candidatures");
    } finally {
      setLoading(false);
    }
  };
  fetchCandidatures();
}, []);

  // Categorize candidatures
  const activeCandidatures = candidatures.filter(c => 
    c.candidature_status === "IN_PROCESS" && c.post?.post_active
  );
  
  const pastCandidatures = candidatures.filter(c => 
    c.candidature_status === "ACCEPTED" || c.candidature_status === "REJECTED"
  );
  
  const archivedCandidatures = candidatures.filter(c => 
    c.post && !c.post.post_active && c.candidature_status !== "IN_PROCESS"
  );

  // Pagination helpers
  const paginate = (array, page) => 
    array.slice((page - 1) * pageSize, page * pageSize);
  
  const totalPages = (array) => 
    Math.ceil(array.length / pageSize) || 1;

  const renderPagination = (current, total, setPage) => {
    if (total <= 1) return null;
    return (
      <nav>
        <ul className="pagination">
          <li className={`page-item ${current === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => setPage(current - 1)}
              disabled={current === 1}
            >
              &laquo;
            </button>
          </li>
          {Array.from({ length: total }, (_, i) => i + 1).map(page => (
            <li
              key={page}
              className={`page-item ${page === current ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => setPage(page)}
              >
                {page}
              </button>
            </li>
          ))}
          <li className={`page-item ${current === total ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => setPage(current + 1)}
              disabled={current === total}
            >
              &raquo;
            </button>
          </li>
        </ul>
      </nav>
    );
  };

  const renderCard = (candidature, isArchived = false) => {
  const { post } = candidature;
  const location = post?.remote_project
    ? "Remote"
    : [post?.project_city, post?.project_county, post?.project_country]
        .filter(Boolean)
        .join(", ");
  
  const formattedDate = new Date(candidature.candidature_date).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });

  const statusClass = `status-${candidature.candidature_status.toLowerCase()}`;

  return (
    <div key={candidature.id} className="project-card">
      <div className="project-card__header">
        <h3 className="project-card__title">{post?.category?.name || "Project"}</h3>
        <div className="project-card__meta">
          <span className="project-card__meta-item">
            {location || "Location not specified"}
          </span>
          <span className="project-card__meta-sep"></span>
          <span className="project-card__meta-item">
             📅 {formattedDate}
          </span>
          <span className="project-card__meta-sep">-</span>
          <span className="project-card__meta-item">
             {post?.estimated_budged || "N/A"}
          </span>
        </div>
      </div>
      
      <div className="project-card__body">
        <p className="project-card__description">
          {post?.post_description 
            ? `${post.post_description.substring(0, 400)}${post.post_description.length > 300 ? '...' : ''}`
            : "No description available"}
        </p>
      </div>
      
      <div className="project-card__footer">
        <div className="project-card__status-filter">
          <span className={`badge ${statusClass}`}>
            {statusLabels[candidature.candidature_status]}
          </span>
          {isArchived && <span className="badge bg-secondary">Archived</span>}
        </div>
        
        <div className="project-card__actions">
          <button
            className="project-card__btn project-card__btn--view"
            onClick={() => navigate(`/post/${post?.id}`)}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading your candidatures...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger mt-5">
        <strong>Error:</strong> {error}
        <button 
          className="btn btn-sm btn-outline-danger ms-3"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container py-4">
      {/* Active Candidatures Section */}
      <section className="mb-5">
        <h3 className="mb-4 border-bottom pb-2">Active Candidatures</h3>
        {activeCandidatures.length === 0 ? (
          <div className="alert alert-info">
            You have no active candidatures
          </div>
        ) : (
          <>
            {renderPagination(activePage, totalPages(activeCandidatures), setActivePage)}
            <div className="row mt-3">
              {paginate(activeCandidatures, activePage).map(c => renderCard(c))}
            </div>
          </>
        )}
      </section>

      {/* Past Candidatures Section */}
      <section className="mb-5">
        <h3 className="mb-4 border-bottom pb-2">Past Candidatures</h3>
        {pastCandidatures.length === 0 ? (
          <div className="alert alert-info">
            You have no past candidatures
          </div>
        ) : (
          <>
            {renderPagination(pastPage, totalPages(pastCandidatures), setPastPage)}
            <div className="row mt-3">
              {paginate(pastCandidatures, pastPage).map(c => renderCard(c))}
            </div>
          </>
        )}
      </section>

      {/* Archived Candidatures Section */}
      <section>
        <h3 className="mb-4 border-bottom pb-2">Archived Candidatures</h3>
        {archivedCandidatures.length === 0 ? (
          <div className="alert alert-info">
            You have no archived candidatures
          </div>
        ) : (
          <>
            {renderPagination(archivedPage, totalPages(archivedCandidatures), setArchivedPage)}
            <div className="row mt-3">
              {paginate(archivedCandidatures, archivedPage).map(c => renderCard(c, true))}
            </div>
          </>
        )}
      </section>
    </div>
  );
};