import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../front/profdash.css"; 

const statusLabels = {
  IN_PROCESS: "In Progress",
  ACCEPTED: "Accepted",
  REJECTED: "Rejected"
};

export const ProfessionalDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [pastPage, setPastPage] = useState(1);
  const pageSize = 5;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplications = async () => {
      await new Promise(res => setTimeout(res, 300));
      setApplications([
        {
          id: 1,
          candidature_status: "IN_PROCESS",
          candidature_date: "2025-06-12T10:30:00Z",
          candidature_message: "Me interesa mucho este proyecto, tengo experiencia en apps mobile...",
          post: {
            id: 101,
            title: "E-commerce Mobile-First UI Design",
            remote_project: false,
            project_city: "Madrid",
            project_county: "Madrid",
            project_country: "España",
            post_description: "Diseño de UI mobile-first para e-commerce. Se busca diseñador con experiencia probada en flows de conversión.",
            estimated_budged: "$30 – $60",
            post_open: true,
            post_active: true,
            post_completed: false,
            post_date: "2025-06-10",
            category: { name: "Design" }
          }
        },
        {
          id: 2,
          candidature_status: "ACCEPTED",
          candidature_date: "2025-06-15T14:45:00Z",
          candidature_message: "Puedo aportar ideas de automatización. Consultame!",
          post: {
            id: 102,
            title: "AI Automation Solutions",
            remote_project: true,
            project_city: "Remote",
            project_county: "",
            project_country: "",
            post_description: "Herramientas AI para automatización de procesos de datos, requiere experiencia en ML.",
            estimated_budged: "$60 – $120",
            post_open: true,
            post_active: true,
            post_completed: false,
            post_date: "2025-06-21",
            category: { name: "Technology" }
          }
        },
        {
          id: 3,
          candidature_status: "REJECTED",
          candidature_date: "2025-06-21T11:15:00Z",
          candidature_message: "He trabajado QA en e-commerce para Alemania.",
          post: {
            id: 103,
            title: "QA para E-commerce",
            remote_project: false,
            project_city: "Berlin",
            project_county: "Berlin",
            project_country: "Alemania",
            post_description: "Pruebas E2E para plataformas de e-commerce mobile. Se espera experiencia previa.",
            estimated_budged: "$20 – $40",
            post_open: false,
            post_active: false,
            post_completed: false,
            post_date: "2025-06-23",
            category: { name: "QA" }
          }
        },
        {
          id: 4,
          candidature_status: "REJECTED",
          candidature_date: "2025-06-21T11:15:00Z",
          candidature_message: "He trabajado QA en e-commerce para Alemania.",
          post: {
            id: 103,
            title: "QA para E-commerce",
            remote_project: false,
            project_city: "Berlin",
            project_county: "Berlin",
            project_country: "Alemania",
            post_description: "Pruebas E2E para plataformas de e-commerce mobile. Se espera experiencia previa.",
            estimated_budged: "$20 – $40",
            post_open: false,
            post_active: false,
            post_completed: false,
            post_date: "2025-06-23",
            category: { name: "QA" }
          }
        },
        {
          id: 5,
          candidature_status: "REJECTED",
          candidature_date: "2025-06-21T11:15:00Z",
          candidature_message: "He trabajado QA en e-commerce para Alemania.",
          post: {
            id: 103,
            title: "QA para E-commerce",
            remote_project: false,
            project_city: "Berlin",
            project_county: "Berlin",
            project_country: "Alemania",
            post_description: "Pruebas E2E para plataformas de e-commerce mobile. Se espera experiencia previa.",
            estimated_budged: "$20 – $40",
            post_open: false,
            post_active: false,
            post_completed: false,
            post_date: "2025-06-23",
            category: { name: "QA" }
          }
        },
        {
          id: 6,
          candidature_status: "REJECTED",
          candidature_date: "2025-06-21T11:15:00Z",
          candidature_message: "He trabajado QA en e-commerce para Alemania.",
          post: {
            id: 103,
            title: "QA para E-commerce",
            remote_project: false,
            project_city: "Berlin",
            project_county: "Berlin",
            project_country: "Alemania",
            post_description: "Pruebas E2E para plataformas de e-commerce mobile. Se espera experiencia previa.",
            estimated_budged: "$20 – $40",
            post_open: false,
            post_active: false,
            post_completed: false,
            post_date: "2025-06-23",
            category: { name: "QA" }
          }
        },
        {
          id: 7,
          candidature_status: "REJECTED",
          candidature_date: "2025-06-21T11:15:00Z",
          candidature_message: "He trabajado QA en e-commerce para Alemania.",
          post: {
            id: 103,
            title: "QA para E-commerce",
            remote_project: false,
            project_city: "Berlin",
            project_county: "Berlin",
            project_country: "Alemania",
            post_description: "Pruebas E2E para plataformas de e-commerce mobile. Se espera experiencia previa.",
            estimated_budged: "$20 – $40",
            post_open: false,
            post_active: false,
            post_completed: false,
            post_date: "2025-06-23",
            category: { name: "QA" }
          }
        },
        
      ]);
    };
    fetchApplications();
  }, []);

  const activeApps = applications.filter(a => a.post.post_active);
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
              <span className="category-badge">{post.category?.name}</span>
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

  return (
    <div className="dashboard-container">
      <section className="posts-section">
        <h3>My Active Applications</h3>
        {renderPagination(activePage, totalActivePages, setActivePage)}
        <div className="row findwork__row customCard">
          {slicePage(activeApps, activePage).map(app => renderCard(app, false))}
        </div>
      </section>

      <section className="posts-section archived">
        <h3>My Past Applications</h3>
        {renderPagination(pastPage, totalPastPages, setPastPage)}
        <div className="row findwork__row customCard">
          {slicePage(pastApps, pastPage).map(app => renderCard(app, true))}
        </div>
      </section>
    </div>
  );
};