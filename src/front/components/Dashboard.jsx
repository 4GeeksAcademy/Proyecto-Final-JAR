import React, { useState } from "react";
import "../../front/dashboard.css";

const mockPosts = [
  { id: 1, title: "App and Website Development", country: "España", city: "Madrid", date: "2025-06-10", category: "Tecnología", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", status: "published" },
  { id: 2, title: "UX/UI Design", country: "México", city: "CDMX", date: "2025-06-12", category: "Diseño", description: "Diseño de interfaces para ecommerce mobile-first.", status: "published" },
  { id: 3, title: "Marketing Strategy", country: "Argentina", city: "Buenos Aires", date: "2025-06-15", category: "Marketing", description: "Optimización de embudos de conversión.", status: "published" },
  { id: 4, title: "Project Coordination", country: "Colombia", city: "Bogotá", date: "2025-06-18", category: "Administración", description: "Gestión de proyectos internacionales.", status: "archived" },
  { id: 5, title: "Financial Planning", country: "Chile", city: "Santiago", date: "2025-06-20", category: "Finanzas", description: "Inversiones en startups tech.", status: "archived" },
  { id: 6, title: "AI Automation Software", country: "Francia", city: "París", date: "2025-06-21", category: "Tecnología", description: "Soluciones IA para automatización.", status: "published" },
  { id: 7, title: "E-commerce Branding", country: "Italia", city: "Roma", date: "2025-06-22", category: "Diseño", description: "Identidad visual para marca online.", status: "published" }
];

export const Dashboard = () => {
  const publishedPosts = mockPosts.filter(p => p.status === "published");
  const archivedPosts = mockPosts.filter(p => p.status === "archived");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const totalPages = Math.ceil(publishedPosts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPosts = publishedPosts.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="dashboard-container">
      {/* Formulario de creación */}
      <div className="create-request-container">
        <h2 className="text-center text-white mb-4">Create a new Request</h2>
        <form className="create-request-form">
          <div className="form-top-row">
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Title" />
            </div>
            <div className="form-group">
              <select className="form-select">
                <option>Category</option>
                <option>Technology</option>
                <option>Design</option>
                <option>Marketing</option>
              </select>
            </div>
            <div className="form-group">
              <select className="form-select">
                <option>Country</option>
                <option>Spain</option>
                <option>Argentina</option>
                <option>Mexico</option>
              </select>
            </div>
            <div className="form-group">
              <select className="form-select">
                <option>City</option>
                <option>Madrid</option>
                <option>Buenos Aires</option>
                <option>CDMX</option>
              </select>
            </div>
          </div>

          <div className="form-description">
            <textarea className="form-control" placeholder="Description" rows="6"></textarea>
          </div>

          <div className="form-submit">
            <button type="submit" className="submit-button">Create</button>
          </div>
        </form>
      </div>

      {/* Posts publicados */}
      <section className="posts-section">
        <h3>My Published Posts</h3>
        <div className="row findwork__row customCard">
          <nav>
            <ul className="pagination">
              <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>&laquo;</button>
              </li>
              {Array.from({ length: totalPages }, (_, index) => (
                <li key={index + 1} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                  <button className="page-link" onClick={() => setCurrentPage(index + 1)}>{index + 1}</button>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}>&raquo;</button>
              </li>
            </ul>
          </nav>

          {paginatedPosts.map(post => (
            <div key={post.id} className="col-12 customCard">
              <div className="card findwork__card p-3 shadow-sm">
                <div className="row findwork__row w-100 align-items-center">
                  <div className="col-lg-4 col-md-4 col-sm-6 d-flex justify-content-between">
                    <p className="customTittle">{post.title}</p>
                    <p>{post.city}, {post.country}</p>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-6 d-flex justify-content-between">
                    <p>📅 {post.date}</p>
                    <p>$20 - $50 | 5 bids</p>
                  </div>
                </div>
                <div className="row findwork__row">
                  <p className="col-12 customDescription">{post.description}</p>
                </div>
                <div className="row findwork__row">
                  <div className="col-12 text-end">
                    <button className="btn btn-primary btn-sm me-2">View more</button>
                    <button className="btn btn-secondary btn-sm me-2">Edit</button>
                    <button className="btn btn-danger btn-sm">Delete</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Posts archivados */}
      <section className="posts-section archived">
        <h3>Archived Posts</h3>
        <div className="row findwork__row customCard">
          {archivedPosts.map(post => (
            <div key={post.id} className="col-12 customCard">
              <div className="card findwork__card p-3 shadow-sm">
                <div className="row findwork__row w-100 align-items-center">
                  <div className="col-lg-4 col-md-4 col-sm-6 d-flex justify-content-between">
                    <p className="customTittle">{post.title}</p>
                    <p>{post.city}, {post.country}</p>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-6 d-flex justify-content-between">
                    <p>📅 {post.date}</p>
                    <div className="text-success">✔️ Archived</div>
                  </div>
                </div>
                <div className="row findwork__row">
                  <p className="col-12 customDescription">{post.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};