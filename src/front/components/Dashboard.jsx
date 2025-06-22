import React, { useState, useEffect } from "react";
import "../../front/dashboard.css";
import { createPost,fetchPostsByClient } from "../services/PostServices.jsx";

const categories = {
  1: "Technology",
  2: "Design",
  3: "Marketing",
};

export const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Obtener el client_id desde localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const client_id = user?.client_id;

  // Fetch posts del cliente al cargar componente
  useEffect(() => {
    if (!client_id) return;
    const loadPosts = async () => {
      try {
        const data = await fetchPostsByClient(client_id);
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts by client:", error);
      }
    };
    loadPosts();
  }, [client_id]);

  // Filtra posts activos y archivados
  const publishedPosts = posts.filter((p) => p.post_active);
  const archivedPosts = posts.filter((p) => !p.post_active);

  // Para paginación
  const totalPages = Math.ceil(publishedPosts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPosts = publishedPosts.slice(startIndex, startIndex + itemsPerPage);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const categoryId = parseInt(form.category_id.value);

    if (!categoryId) {
      alert("Por favor selecciona una categoría.");
      return;
    }

    const postData = {
      remote_project: form.remote_project.checked,
      project_city: form.project_city.value.trim(),
      project_county: form.project_county.value.trim(),
      project_country: form.project_country.value,
      post_description: form.post_description.value.trim(),
      estimated_budged: form.estimated_budged.value.trim(),
      post_open: true,
      post_active: true,
      post_completed: false,
      category_id: categoryId,
      client_id: client_id,
    };

    if (
      !postData.project_city ||
      !postData.project_country ||
      !postData.post_description ||
      !postData.estimated_budged ||
      !postData.category_id
    ) {
      alert("Please complete City, Country, Description, Estimated Budget, and Category fields.");
      return;
    }

    try {
      const newPost = await createPost(postData);
      setPosts((prev) => [...prev, newPost]);
      alert("¡Publicación creada exitosamente!");
      form.reset();
    } catch (err) {
      console.error("Failed to create post", err);
      if (err.message === "Unauthorized") {
        alert("Tu sesión ha expirado o no estás autorizado. Por favor, inicia sesión nuevamente.");
      } else if (err.message === "Error creating post") {
        alert("Hubo un problema al crear la publicación. Revisa los datos e intenta de nuevo.");
      } else {
        alert("Ocurrió un error inesperado al crear la publicación.");
      }
    }
  };

  const handleToggle = (id, field) => {
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: !p[field] } : p)));
  };

  const handleActiveToggle = (id) => {
    const post = posts.find((p) => p.id === id);
    if (!post) return;

    const action = post.post_active ? "disable" : "enable";
    const confirmMsg = `Are you sure you want to ${action} the post? It will be moved to ${post.post_active ? "Archived" : "Published"
      } Posts.`;

    if (window.confirm(confirmMsg)) {
      setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, post_active: !p.post_active } : p)));
    }
  };




  const renderPostCard = (post, isArchived = false) => (
    <div key={post.id} className="col-12 customCard">
      <div className="card findwork__card p-3 shadow-sm">
        <div className="row findwork__row w-100 align-items-center">
          <div className="col-lg-4 col-md-4 col-sm-6 d-flex flex-column gap-1">
            <p>
              <strong>Categoría:</strong> {categories[post.category_id] || "Sin categoría"}
            </p>
            <p>
              <strong>Ubicación:</strong> {post.project_country},{post.project_county},{post.project_city}
            </p>
            <p>
              <strong>Remote Project:</strong> {post.remote_project ? "Sí" : "No"}
            </p>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-6 d-flex flex-column gap-1">
            <p>
              <strong>Presupuesto Estimado:</strong> {post.estimated_budged} - €
            </p>
            <p>
              <strong>Fecha:</strong> {new Date(post.post_date).toLocaleDateString("es-ES")}
            </p>

            {isArchived && <p className="text-success">Archivado</p>}
          </div>
        </div>
        <div className="row findwork__row mt-3">
          <p className="col-12 customDescription">{post.post_description}</p>
        </div>
        <div className="row findwork__row">
          <div className="col-12 d-flex align-items-center gap-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                checked={post.post_active}
                onChange={() => handleActiveToggle(post.id)}
                id={`active-${post.id}`}
              />
              <label className="form-check-label" htmlFor={`active-${post.id}`}>
                Active
              </label>
            </div>
            {!isArchived && (
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={post.post_open}
                  disabled={!post.post_active}
                  onChange={() => handleToggle(post.id, "post_open")}
                  id={`open-${post.id}`}
                />
                <label className="form-check-label" htmlFor={`open-${post.id}`}>
                  Open
                </label>
              </div>
            )}
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                checked={post.post_completed}
                onChange={() => handleToggle(post.id, "post_completed")}
                id={`completed-${post.id}`}
              />
              <label className="form-check-label" htmlFor={`completed-${post.id}`}>
                Completed
              </label>
            </div>
          </div>
        </div>
        {!isArchived && (
          <div className="row findwork__row">
            <div className="col-12 text-end">
              <button className="btn btn-primary btn-sm me-2">View more</button>
              <button className="btn btn-secondary btn-sm me-2">Edit</button>
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
              <label className="form-check-label" htmlFor="remoteProject">
                Remote Project
              </label>
            </div>
          </div>
          <div className="form-group">
            <input type="text" className="form-control" name="estimated_budged" placeholder="Estimated Budget" />
          </div>
          <div className="form-description">
            <textarea className="form-control" name="post_description" placeholder="Description" rows="6"></textarea>
          </div>
          <div className="form-submit">
            <button type="submit" className="submit-button">
              Create
            </button>
          </div>
        </form>
      </div>

      <section className="posts-section">
        <h3>My Published Posts</h3>
        <nav>
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
                &laquo;
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => (
              <li key={i + 1} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                  {i + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}>
                &raquo;
              </button>
            </li>
          </ul>
        </nav>
        <div className="row findwork__row customCard">{paginatedPosts.map((post) => renderPostCard(post))}</div>
      </section>

      <section className="posts-section archived">
        <h3>Archived Posts</h3>
        <div className="row findwork__row customCard">{archivedPosts.map((post) => renderPostCard(post, true))}</div>
      </section>
    </div>
  );
};




/*


código anterior import React, { useState } from "react"; 
import "../../front/dashboard.css";
import { createPost } from "../services/PostServices.jsx";

const pruebaPosts = [
  { id: 1, remote_project: false, project_city: "Madrid", project_county: "Madrid", project_country: "España", post_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", estimated_budged: "$20 - $50", post_open: true, post_active: true, post_completed: false, post_date: "2025-06-10" },
  { id: 2, remote_project: true, project_city: "CDMX", project_county: "Ciudad de México", project_country: "México", post_description: "Diseño de interfaces para ecommerce mobile-first.", estimated_budged: "$30 - $60", post_open: true, post_active: true, post_completed: false, post_date: "2025-06-12" },
  { id: 3, remote_project: false, project_city: "Buenos Aires", project_county: "Buenos Aires", project_country: "Argentina", post_description: "Optimización de embudos de conversión.", estimated_budged: "$25 - $55", post_open: true, post_active: true, post_completed: false, post_date: "2025-06-15" },
  { id: 4, remote_project: false, project_city: "Bogotá", project_county: "Cundinamarca", project_country: "Colombia", post_description: "Gestión de proyectos internacionales.", estimated_budged: "$40 - $80", post_open: false, post_active: false, post_completed: false, post_date: "2025-06-18" },
  { id: 5, remote_project: true, project_city: "Santiago", project_county: "Santiago", project_country: "Chile", post_description: "Inversiones en startups tech.", estimated_budged: "$50 - $100", post_open: false, post_active: false, post_completed: true, post_date: "2025-06-20" },
  { id: 6, remote_project: false, project_city: "París", project_county: "Île-de-France", project_country: "Francia", post_description: "Soluciones IA para automatización.", estimated_budged: "$60 - $120", post_open: true, post_active: true, post_completed: false, post_date: "2025-06-21" },
  { id: 7, remote_project: false, project_city: "Roma", project_county: "Lazio", project_country: "Italia", post_description: "Identidad visual para marca online.", estimated_budged: "$35 - $70", post_open: true, post_active: true, post_completed: false, post_date: "2025-06-22" }
];

export const Dashboard = () => {
  const [posts, setPosts] = useState(pruebaPosts);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Obtener client_id del usuario guardado en localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const client_id = user?.client_id;

  // Separar posts activos y archivados
  const publishedPosts = posts.filter(p => p.post_active);
  const archivedPosts = posts.filter(p => !p.post_active);

  // Paginación de posts publicados
  const totalPages = Math.ceil(publishedPosts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPosts = publishedPosts.slice(startIndex, startIndex + itemsPerPage);

  // Crear nuevo post con validación y llamada a API
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const categoryId = parseInt(form.category_id.value);

    if (!categoryId) {
      alert("Por favor selecciona una categoría.");
      return;
    }

    const postData = {
      remote_project: form.remote_project.checked,
      project_city: form.project_city.value.trim(),
      project_county: form.project_county.value.trim(),
      project_country: form.project_country.value,
      post_description: form.post_description.value.trim(),
      estimated_budged: form.estimated_budged.value.trim(),
      post_open: true,
      post_active: true,
      post_completed: false,
      category_id: categoryId,
      client_id: client_id,
    };

    if (
      !postData.project_city ||
      !postData.project_country ||
      !postData.post_description ||
      !postData.estimated_budged ||
      !postData.category_id
    ) {
      alert("Por favor completa Ciudad, País, Descripción, Presupuesto estimado y Categoría.");
      return;
    }

    try {
      const newPost = await createPost(postData);
      setPosts(prev => [...prev, newPost]);
      alert("¡Publicación creada exitosamente!");
      form.reset();
    } catch (err) {
      console.error("Error al crear la publicación", err);
      if (err.message === "Unauthorized") {
        alert("Tu sesión ha expirado o no estás autorizado. Por favor, inicia sesión nuevamente.");
      } else if (err.message === "Error creating post") {
        alert("Hubo un problema al crear la publicación. Revisa los datos e intenta de nuevo.");
      } else {
        alert("Ocurrió un error inesperado al crear la publicación.");
      }
    }
  };

  // Toggle para cambiar estados de open/completed
  const handleToggle = (id, field) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, [field]: !p[field] } : p));
  };

  // Toggle para activar/desactivar post (mover entre publicado y archivado)
  const handleActiveToggle = id => {
    const post = posts.find(p => p.id === id);
    if (!post) return;

    const action = post.post_active ? "desactivar" : "activar";
    const confirmMsg = `¿Seguro que quieres ${action} la publicación? Se moverá a ${post.post_active ? 'Archivados' : 'Publicados'}.`;

    if (window.confirm(confirmMsg)) {
      setPosts(prev => prev.map(p => p.id === id ? { ...p, post_active: !p.post_active } : p));
    }
  };

  // Renderizar tarjeta de post
  const renderPostCard = (post, isArchived = false) => (
    <div key={post.id} className="col-12 customCard">
      <div className="card findwork__card p-3 shadow-sm">
        <div className="row findwork__row w-100 align-items-center">
          <div className="col-lg-4 col-md-4 col-sm-6 d-flex justify-content-between">
            <p>{post.remote_project ? "Remote" : `${post.project_city}, ${post.project_county}, ${post.project_country}`}</p>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-6 d-flex justify-content-between">
            <p>📅 {post.post_date}</p>
            <p>{isArchived ? <span className="text-success">✔️ Archivado</span> : `💰 ${post.estimated_budged}`}</p>
          </div>
        </div>
        <div className="row findwork__row">
          <p className="col-12 customDescription">{post.post_description}</p>
        </div>
        <div className="row findwork__row">
          <div className="col-12 d-flex align-items-center gap-3">
            <div className="form-check">
              <input 
                className="form-check-input" 
                type="checkbox" 
                checked={post.post_active} 
                onChange={() => handleActiveToggle(post.id)} 
                id={`active-${post.id}`} 
              />
              <label className="form-check-label" htmlFor={`active-${post.id}`}>Activo</label>
            </div>
            {!isArchived && (
              <div className="form-check">
                <input 
                  className="form-check-input" 
                  type="checkbox" 
                  checked={post.post_open} 
                  disabled={!post.post_active} 
                  onChange={() => handleToggle(post.id, 'post_open')} 
                  id={`open-${post.id}`} 
                />
                <label className="form-check-label" htmlFor={`open-${post.id}`}>Abierto</label>
              </div>
            )}
            <div className="form-check">
              <input 
                className="form-check-input" 
                type="checkbox" 
                checked={post.post_completed} 
                onChange={() => handleToggle(post.id, 'post_completed')} 
                id={`completed-${post.id}`} 
              />
              <label className="form-check-label" htmlFor={`completed-${post.id}`}>Completado</label>
            </div>
          </div>
        </div>
        {!isArchived && (
          <div className="row findwork__row">
            <div className="col-12 text-end">
              <button className="btn btn-primary btn-sm me-2">Ver más</button>
              <button className="btn btn-secondary btn-sm me-2">Editar</button>
              <button className="btn btn-danger btn-sm">Eliminar</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="dashboard-container">
      <div className="create-request-container">
        <h2 className="text-center text-white mb-4">Crear una nueva solicitud</h2>
        <form className="create-request-form" onSubmit={handleSubmit}>
          <div className="form-top-row">
            <div className="form-group">
              <select className="form-select" name="category_id" defaultValue="">
                <option value="" disabled>Categoría</option>
                <option value="1">Tecnología</option>
                <option value="2">Diseño</option>
                <option value="3">Marketing</option>
              </select>
            </div>
            <div className="form-group">
              <select className="form-select" name="project_country" defaultValue="">
                <option value="" disabled>País</option>
                <option value="España">España</option>
                <option value="Argentina">Argentina</option>
                <option value="México">México</option>
              </select>
            </div>
            <div className="form-group">
              <select className="form-select" name="project_city" defaultValue="">
                <option value="" disabled>Ciudad</option>
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
              <label className="form-check-label" htmlFor="remoteProject">Proyecto Remoto</label>
            </div>
          </div>
          <div className="form-group">
            <input type="text" className="form-control" name="estimated_budged" placeholder="Presupuesto Estimado" />
          </div>
          <div className="form-description">
            <textarea className="form-control" name="post_description" placeholder="Descripción" rows="6"></textarea>
          </div>
          <div className="form-submit">
            <button type="submit" className="submit-button">Crear</button>
          </div>
        </form>
      </div>

      <section className="posts-section">
        <h3>Mis publicaciones activas</h3>
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
        <h3>Publicaciones archivadas</h3>
        <div className="row findwork__row customCard">
          {archivedPosts.map(post => renderPostCard(post, true))}
        </div>
      </section>
    </div>
  );
};

*/