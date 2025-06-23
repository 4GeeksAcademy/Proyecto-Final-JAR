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
  const [applications, setApplications] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [pastPage, setPastPage] = useState(1);
  const [loading, setLoading] = useState();
  const [error, setError] = useState(null);
  const pageSize = 5;
  const navigate = useNavigate();

  useEffect(() => {
  const fetchApplications = async () => {
    try {
      setLoading(true)
      const data = await getProfessionalCandidatures();
      console.log("Received data:", data); 
      setApplications(data || []); 
      setLoading(false);
    } catch (err) {
      console.error("Full error:", err); 
      setError(err.message);
      setLoading(false);
    }
  };
  fetchApplications();
}, []);

  const activeApps = applications.filter(a => a.post?.post_active);
  const pastApps = applications.filter(a => !a.post.post_active);

  const totalActivePages = Math.ceil(activeApps.length / pageSize) || 1;
  const totalPastPages = Math.ceil(pastApps.length / pageSize) || 1;

  const slicePage = (arr, page) =>
    arr.slice((page - 1) * pageSize, page * pageSize);

  const renderPagination = (current, total, onPageChange) => {
    if (total <= 1) return null;
    return (
      <nav>
        <ul className="pagination">
          <li className={`page-item ${current === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => onPageChange(current - 1)}
              disabled={current === 1}
            >
              &laquo;
            </button>
          </li>
          {Array.from({ length: total }, (_, i) => i + 1).map(n => (
            <li
              key={n}
              className={`page-item ${n === current ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => onPageChange(n)}
              >
                {n}
              </button>
            </li>
          ))}
          <li className={`page-item ${current === total ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => onPageChange(current + 1)}
              disabled={current === total}
            >
              &raquo;
            </button>
          </li>
        </ul>
      </nav>
    );
  };

  const renderCard = (app, isArchived = false) => {
    const { post } = app;
    const location = post.remote_project
      ? "Remote"
      : `${post.project_city}${post.project_county ? `, ${post.project_county}` : ""}${post.project_country ? `, ${post.project_country}` : ""}`;

    const formattedDate = new Date(app.candidature_date).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });

    return (
      <div key={app.id} className="col-12 customCard">
        <div className="card findwork__card p-3 shadow-sm">
          <div className="row findwork__row w-100 align-items-center">
            <div className="col-lg-4 col-md-4 col-sm-6 d-flex justify-content-between">
              <p className="customTittle">{post.title}</p>
              <p>{location}</p>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 d-flex justify-content-between">
              <p>📅 {formattedDate}</p>
              <p>{isArchived ? <span className="text-success">✔️ Archived</span> : `💰 ${post.estimated_budged}`}</p>
            </div>
          </div>
          <div className="row findwork__row">
            <p className="col-12 customDescription">{post.post_description}</p>
          </div>
          <div className="row findwork__row">
            <div className="col-12 d-flex align-items-center gap-3">
              <span className={`badge status-badge status-${app.candidature_status.toLowerCase()}`}>
                {statusLabels[app.candidature_status]}
              </span>
              <span className="category-badge">{post.category?.name} </span>
            </div>
          </div>
          <div className="row findwork__row">
            <div className="col-12 text-end">
              <button
                className="btn btn-primary btn-sm me-2"
                onClick={() => navigate(`/offers/${post.id}`)}
              >
                View more
              </button>
              <button
                className="btn btn-secondary btn-sm me-2"
                onClick={() => navigate(`/messages/${app.id}`)}
              >
                Contact
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return <div className="text-center mt-5">Loading applications...</div>;
  }

  if (error) {
    return <div className="text-center mt-5 text-danger">Error: {error}</div>;
  }

return (
  <div className="dashboard-container">
    <section className="posts-section">
      <h3>My Active Applications</h3>
      {activeApps.length === 0 ? (
        <div className="text-center mt-3">You have no active candidatures</div>
      ) : (
        <>
          {renderPagination(activePage, totalActivePages, setActivePage)}
          <div className="row findwork__row customCard">
            {slicePage(activeApps, activePage).map(app => renderCard(app, false))}
          </div>
        </>
      )}
    </section>

    <section className="posts-section archived">
      <h3>My Past Applications</h3>
      {pastApps.length === 0 ? (
        <div className="text-center mt-3">You have no past candidatures</div>
      ) : (
        <>
          {renderPagination(pastPage, totalPastPages, setPastPage)}
          <div className="row findwork__row customCard">
            {slicePage(pastApps, pastPage).map(app => renderCard(app, true))}
          </div>
        </>
      )}
    </section>
  </div>
);
}