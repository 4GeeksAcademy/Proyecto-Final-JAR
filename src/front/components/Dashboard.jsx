import React, { useState } from "react";
import "../../front/dashboard.css";
import { createPost } from "../services/PostServices.jsx";

const pruebaPosts = [
  { id: 1, title: "App and Website Development", remote_project: false, project_city: "Madrid", project_county: "Madrid", project_country: "España", post_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", estimated_budged: "$20 - $50", post_open: true, post_active: true, post_completed: false, post_date: "2025-06-10" },
  { id: 2, title: "UX/UI Design", remote_project: true, project_city: "CDMX", project_county: "Ciudad de México", project_country: "México", post_description: "Diseño de interfaces para ecommerce mobile-first.", estimated_budged: "$30 - $60", post_open: true, post_active: true, post_completed: false, post_date: "2025-06-12" },
  { id: 3, title: "Marketing Strategy", remote_project: false, project_city: "Buenos Aires", project_county: "Buenos Aires", project_country: "Argentina", post_description: "Optimización de embudos de conversión.", estimated_budged: "$25 - $55", post_open: true, post_active: true, post_completed: false, post_date: "2025-06-15" },
  { id: 4, title: "Project Coordination", remote_project: false, project_city: "Bogotá", project_county: "Cundinamarca", project_country: "Colombia", post_description: "Gestión de proyectos internacionales.", estimated_budged: "$40 - $80", post_open: false, post_active: false, post_completed: false, post_date: "2025-06-18" },
  { id: 5, title: "Financial Planning", remote_project: true, project_city: "Santiago", project_county: "Santiago", project_country: "Chile", post_description: "Inversiones en startups tech.", estimated_budged: "$50 - $100", post_open: false, post_active: false, post_completed: true, post_date: "2025-06-20" },
  { id: 6, title: "AI Automation Software", remote_project: false, project_city: "París", project_county: "Île-de-France", project_country: "Francia", post_description: "Soluciones IA para automatización.", estimated_budged: "$60 - $120", post_open: true, post_active: true, post_completed: false, post_date: "2025-06-21" },
  { id: 7, title: "E-commerce Branding", remote_project: false, project_city: "Roma", project_county: "Lazio", project_country: "Italia", post_description: "Identidad visual para marca online.", estimated_budged: "$35 - $70", post_open: true, post_active: true, post_completed: false, post_date: "2025-06-22" }
];

export const Dashboard = () => {
  const [posts, setPosts] = useState(pruebaPosts);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Filtra posts activos y archivados
  const publishedPosts = posts.filter(p => p.post_active);
  const archivedPosts = posts.filter(p => !p.post_active);

  // Para paginación
  const totalPages = Math.ceil(publishedPosts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPosts = publishedPosts.slice(startIndex, startIndex + itemsPerPage);

  // Maneja la creación del post
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const postData = {
  title: form.title.value.trim(), // si no existe en modelo, bórralo
  remote_project: form.remote_project.checked,
  project_city: form.project_city.value.trim(),
  project_county: form.project_county.value.trim(),
  project_country: form.project_country.value,
  post_description: form.post_description.value.trim(),
  estimated_budged: form.estimated_budged.value.trim(),
  post_open: true,
  post_active: true,
  post_completed: false,
  post_date: new Date().toISOString(), // opcional si lo pones por defecto en DB
  category_id: parseInt(form.category_id.value),
};



    if (!postData.title || !postData.project_city || !postData.project_country || !postData.category_id) {
      alert("Please complete Title, City, Country, and Category fields.");
      return;
    }

    try {
      // Espera la creación del post
      const newPost = await createPost(postData);

      // Agrega el nuevo post a la lista
      setPosts(prev => [...prev, newPost]);

      alert("¡Publicación creada exitosamente!");
      form.reset();
    } catch (err) {
      console.error("Failed to create post", err);
      if (err.message === "Unauthorized") {
        alert("Tu sesión ha expirado o no estás autorizado. Por favor, inicia sesión nuevamente.");
        // Aquí puedes limpiar token y redirigir a login si usas react-router
      } else {
        alert("Hubo un error al crear la publicación");
      }
    }
  };

  const handleToggle = (id, field) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, [field]: !p[field] } : p));
  };

  const handleActiveToggle = id => {
    const post = posts.find(p => p.id === id);
    if (!post) return;

    const action = post.post_active ? "disable" : "enable";
    const confirmMsg = `Are you sure you want to ${action} the post? It will be moved to ${post.post_active ? 'Archived' : 'Published'} Posts.`;

    if (window.confirm(confirmMsg)) {
      setPosts(prev => prev.map(p => p.id === id ? { ...p, post_active: !p.post_active } : p));
    }
  };

  const renderPostCard = (post, isArchived = false) => (
    <div key={post.id} className="col-12 customCard">
      <div className="card findwork__card p-3 shadow-sm">
        <div className="row findwork__row w-100 align-items-center">
          <div className="col-lg-4 col-md-4 col-sm-6 d-flex justify-content-between">
            <p className="customTittle">{post.title}</p>
            <p>{post.remote_project ? "Remote" : `${post.project_city}, ${post.project_county}, ${post.project_country}`}</p>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-6 d-flex justify-content-between">
            <p>📅 {post.post_date}</p>
            <p>{isArchived ? <span className="text-success">✔️ Archived</span> : `💰 ${post.estimated_budged}`}</p>
          </div>
        </div>
        <div className="row findwork__row">
          <p className="col-12 customDescription">{post.post_description}</p>
        </div>
        <div className="row findwork__row">
          <div className="col-12 d-flex align-items-center gap-3">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" checked={post.post_active} onChange={() => handleActiveToggle(post.id)} id={`active-${post.id}`} />
              <label className="form-check-label" htmlFor={`active-${post.id}`}>Active</label>
            </div>
            {!isArchived && (
              <div className="form-check">
                <input className="form-check-input" type="checkbox" checked={post.post_open} disabled={!post.post_active} onChange={() => handleToggle(post.id, 'post_open')} id={`open-${post.id}`} />
                <label className="form-check-label" htmlFor={`open-${post.id}`}>Open</label>
              </div>
            )}
            <div className="form-check">
              <input className="form-check-input" type="checkbox" checked={post.post_completed} onChange={() => handleToggle(post.id, 'post_completed')} id={`completed-${post.id}`} />
              <label className="form-check-label" htmlFor={`completed-${post.id}`}>Completed</label>
            </div>
          </div>
        </div>
        {!isArchived && (
          <div className="row findwork__row">
            <div className="col-12 text-end">
              <button className="btn btn-primary btn-sm me-2">View more</button>
              <button className="btn btn-secondary btn-sm me-2">Edit</button>
              <button className="btn btn-danger btn-sm">Delete</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="dashboard-container">
      <div className="create-request-container">
        <h2 className="text-center text-white mb-4">Create a new Request</h2>
        <form className="create-request-form" onSubmit={handleSubmit}>
          <div className="form-top-row">
            <div className="form-group">
              <input type="text" className="form-control" name="title" placeholder="Title" />
            </div>
            <div className="form-group">
              <select className="form-select" name="category_id">
                <option value="">Category</option>
                <option value="1">Technology</option>
                <option value="2">Design</option>
                <option value="3">Marketing</option>
              </select>
            </div>
            <div className="form-group">
              <select className="form-select" name="project_country">
                <option value="">Country</option>
                <option value="España">Spain</option>
                <option value="Argentina">Argentina</option>
                <option value="México">Mexico</option>
              </select>
            </div>
            <div className="form-group">
              <select className="form-select" name="project_city">
                <option value="">City</option>
                <option value="Madrid">Madrid</option>
                <option value="Buenos Aires">Buenos Aires</option>
                <option value="CDMX">CDMX</option>
              </select>
            </div>
            <div className="form-group">
              <input type="text" className="form-control" name="project_county" placeholder="County" />
            </div>
            <div className="form-group form-check">
              <input type="checkbox" className="form-check-input" name="remote_project" id="remoteProject" />
              <label className="form-check-label" htmlFor="remoteProject">Remote Project</label>
            </div>
          </div>
          <div className="form-group">
            <input type="text" className="form-control" name="estimated_budged" placeholder="Estimated Budget" />
          </div>
          <div className="form-description">
            <textarea className="form-control" name="post_description" placeholder="Description" rows="6"></textarea>
          </div>
          <div className="form-submit">
            <button type="submit" className="submit-button">Create</button>
          </div>
        </form>
      </div>

      <section className="posts-section">
        <h3>My Published Posts</h3>
        <nav>
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>&laquo;</button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => (
              <li key={i + 1} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                <button className="page-link" onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}>&raquo;</button>
            </li>
          </ul>
        </nav>
        <div className="row findwork__row customCard">
          {paginatedPosts.map(post => renderPostCard(post))}
        </div>
      </section>

      <section className="posts-section archived">
        <h3>Archived Posts</h3>
        <div className="row findwork__row customCard">
          {archivedPosts.map(post => renderPostCard(post, true))}
        </div>
      </section>
    </div>
  );
};
