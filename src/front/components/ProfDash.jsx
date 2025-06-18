import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../front/dashboard.css";

const statusLabels = {
  IN_PROCESS: "In Progress",
  ACCEPTED: "Accepted",
  REJECTED: "Rejected"
};

export const ProfessionalDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [pastPage, setPastPage] = useState(1);
  const pageSize = 4;
  const navigate = useNavigate();

  // Api: 

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        // Simulamos retraso de red
        await new Promise(resolve => setTimeout(resolve, 600));
        
        // Datos simulados actualizados
        const mockData = [
          {
            id: 1,
            candidature_status: "IN_PROCESS",
            candidature_date: "2025-06-12T10:30:00Z",
            post: {
              id: 101,
              title: "E-commerce Mobile-First UI Design",
              remote_project: false,
              project_city: "Madrid",
              project_county: "Madrid",
              project_country: "Spain",
              post_description: "We need a talented UI designer to create a mobile-first e-commerce interface that provides an exceptional user experience on all devices. The design should be modern, intuitive and conversion-focused.",
              estimated_budged: "$30 – $60",
              post_open: true,
              post_active: true,
              post_completed: false,
              post_date: "2025-06-10",
              category: {
                name: "Design"
              }
            }
          },
          {
            id: 2,
            candidature_status: "ACCEPTED",
            candidature_date: "2025-06-15T14:45:00Z",
            post: {
              id: 102,
              title: "Conversion Funnel Optimization",
              remote_project: true,
              project_city: "Buenos Aires",
              project_county: "Buenos Aires",
              project_country: "Argentina",
              post_description: "Looking for a marketing expert to optimize our conversion funnels. We need to improve our lead generation and sales conversion rates through A/B testing and data analysis.",
              estimated_budged: "$25 – $55",
              post_open: true,
              post_active: true,
              post_completed: false,
              post_date: "2025-06-12",
              category: {
                name: "Marketing"
              }
            }
          },
          {
            id: 3,
            candidature_status: "REJECTED",
            candidature_date: "2025-06-18T09:15:00Z",
            post: {
              id: 103,
              title: "AI Automation Solutions",
              remote_project: false,
              project_city: "Paris",
              project_county: "Île-de-France",
              project_country: "France",
              post_description: "Develop AI-powered tools to automate data processing workflows, reducing manual effort by 70%. Requires experience with machine learning and natural language processing.",
              estimated_budged: "$60 – $120",
              post_open: false,
              post_active: false,
              post_completed: false,
              post_date: "2025-06-21",
              category: {
                name: "Technology"
              }
            }
          },
          {
            id: 4,
            candidature_status: "REJECTED",
            candidature_date: "2025-06-18T09:15:00Z",
            post: {
              id: 103,
              title: "AI Automation Solutions",
              remote_project: false,
              project_city: "Paris",
              project_county: "Île-de-France",
              project_country: "France",
              post_description: "Develop AI-powered tools to automate data processing workflows, reducing manual effort by 70%. Requires experience with machine learning and natural language processing.",
              estimated_budged: "$60 – $120",
              post_open: false,
              post_active: false,
              post_completed: false,
              post_date: "2025-06-21",
              category: {
                name: "Technology"
              }
            }
          },
          {
            id: 5,
            candidature_status: "REJECTED",
            candidature_date: "2025-06-18T09:15:00Z",
            post: {
              id: 103,
              title: "AI Automation Solutions",
              remote_project: false,
              project_city: "Paris",
              project_county: "Île-de-France",
              project_country: "France",
              post_description: "Develop AI-powered tools to automate data processing workflows, reducing manual effort by 70%. Requires experience with machine learning and natural language processing.",
              estimated_budged: "$60 – $120",
              post_open: false,
              post_active: false,
              post_completed: false,
              post_date: "2025-06-21",
              category: {
                name: "Technology"
              }
            }
          }
        ];
        
        setApplications(mockData);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } 
    };
    
    fetchApplications();
  }, []);

  // Separar aplicaciones activas y archivadas
  const activeApps = applications.filter(a => a.post.post_active);
  const pastApps = applications.filter(a => !a.post.post_active);

  const totalActivePages = Math.ceil(activeApps.length / pageSize);
  const totalPastPages = Math.ceil(pastApps.length / pageSize);

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

  const renderCard = (app) => {
    const { post } = app;
    const location = post.remote_project 
      ? "Remote" 
      : `${post.project_city}, ${post.project_county}, ${post.project_country}`;
    
    const formattedDate = new Date(app.candidature_date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });

    // Formatear la descripción del proyecto
    const projectDescription = post.post_description.length > 150 
      ? `${post.post_description.substring(0, 150)}...` 
      : post.post_description;

    return (
      <div key={app.id} className="col-12 customCard">
        <div className="card findwork__card p-3 shadow-sm">
          <div className="row findwork__row w-100 align-items-center">
            <div className="col-lg-6 col-md-6 col-sm-6">
              <p className="customTittle">{post.title}</p>
              <p className="customLocation">{location}</p>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 d-flex flex-wrap justify-content-end">
              <div className="d-flex align-items-center me-3">
                <span className="calendar-icon me-1">📅</span>
                <p className="customDate m-0">{formattedDate}</p>
              </div>
              <div className="d-flex align-items-center me-3">
                <span className="money-icon me-1">💰</span>
                <p className="customBudget m-0">{post.estimated_budged}</p>
              </div>
              <span className={`status-badge status-${app.candidature_status.toLowerCase()}`}>
                {statusLabels[app.candidature_status]}
              </span>
            </div>
          </div>
          <div className="row findwork__row mt-3">
            <div className="col-12">
              <div className="project-description">
                <h5 className="description-title">Project Description</h5>
                <p className="customDescription">
                  {projectDescription}
                </p>
              </div>
              <div className="d-flex mt-2">
                <div className="category-badge me-2">
                  <span className="category-icon"></span>
                  <span>{post.category?.name || "N/A"}</span>
                </div>
                <div className={`status-tag status-${app.candidature_status.toLowerCase()}`}>
                  {statusLabels[app.candidature_status]}
                </div>
              </div>
            </div>
          </div>
          <div className="row findwork__row mt-3">
            <div className="col-12 d-flex justify-content-end">
              <button 
                className="btn btn-primary btn-action me-2"
                onClick={() => navigate(`/offers/${post.id}`)}
              >
                View Project Details
              </button>
              <button 
                className="btn btn-outline-secondary btn-action"
                onClick={() => navigate(`/messages/${app.id}`)}
              >
                Contact Client
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="dashboard-container professional-dashboard">
      <div className="dashboard-header">
        <h1 className="text-center mb-3">Professional Applications</h1>
        <p className="text-center text-muted mb-4">
          Track and manage all your job applications in one place
        </p>
      </div>

      <section className="posts-section">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="section-title">
             Active Applications
          </h3>
          <span className="badge bg-primary">
            {activeApps.length} application{activeApps.length !== 1 ? 's' : ''}
          </span>
        </div>
        
        {activeApps.length === 0 ? (
          <div className="alert alert-info">
            <i className="bi bi-info-circle me-2"></i>
            You don't have any active applications. Start applying to jobs now!
          </div>
        ) : (
          <>
            {renderPagination(activePage, totalActivePages, setActivePage)}
            <div className="row findwork__row">
              {slicePage(activeApps, activePage).map(renderCard)}
            </div>
          </>
        )}
      </section>

      <section className="posts-section archived mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="section-title">
             Past Applications
          </h3>
          <span className="badge bg-secondary">
            {pastApps.length} application{pastApps.length !== 1 ? 's' : ''}
          </span>
        </div>
        
        {pastApps.length === 0 ? (
          <div className="alert alert-secondary">
            <i className="bi bi-clock-history me-2"></i>
            Your past applications will appear here once they are closed or completed.
          </div>
        ) : (
          <>
            {renderPagination(pastPage, totalPastPages, setPastPage)}
            <div className="row findwork__row">
              {slicePage(pastApps, pastPage).map(renderCard)}
            </div>
          </>
        )}
      </section>
    </div>
  );
};