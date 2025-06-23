import React, { useState, useEffect } from "react";
import "../../front/dashboard.css";
import { createPost, fetchPostsByClient } from "../services/PostServices.jsx";
import { getCategories } from "../services/CategoryServices.jsx";

export const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const user = JSON.parse(localStorage.getItem("user"));
  const client_id = user?.client_id;



  // Fetch posts by client
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

  // Fetch categories from backend
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getCategories();
        setCategoriesList(data);
      } catch (error) {
        console.error("Error loading categories:", error);
      }
    };
    loadCategories();
  }, []);

  const publishedPosts = posts.filter((p) => p.post_active);
  const archivedPosts = posts.filter((p) => !p.post_active);
  const totalPages = Math.ceil(publishedPosts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPosts = publishedPosts.slice(startIndex, startIndex + itemsPerPage);

  // Cambiado category_name por name
  const getCategoryName = (id) => {
    const cat = categoriesList.find((c) => c.id === id);
    return cat ? cat.name : "No category";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const categoryId = parseInt(form.category_id.value);

    if (!categoryId) {
      return;
    }

    const location = form.project_location.value;
    if (!location) {
      return;
    }
    const [project_country, project_city] = location.split("|");

    const postData = {
      remote_project: form.remote_project.checked,
      project_city,
      project_county: form.project_county.value.trim(),
      project_country,
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

      return;
    }

    try {
      const newPost = await createPost(postData);
      setPosts((prev) => [...prev, newPost]);

      form.reset();
    } catch (err) {
      console.error("Failed to create post", err);
      if (err.message === "Unauthorized") {

      } else if (err.message === "Error creating post") {

      } else {

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
    const confirmMsg = `Are you sure you want to ${action} the post? It will be moved to ${post.post_active ? "Archived" : "Published"} Posts.`;

    if (window.confirm(confirmMsg)) {
      setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, post_active: !p.post_active } : p)));
    }
  };

const renderPostCard = (post, isArchived = false) => (
  <div key={post.id} className="project-card">
    <div className="project-card__header">
      <h3 className="project-card__title">{getCategoryName(post.category_id)}</h3>
      <div className="project-card__meta">
        <span className="project-card__meta-item">
          {post.project_country}, {post.project_city}
        </span>
        <span className="project-card__meta-sep">·</span>
        <span className="project-card__meta-item">
          📅 {new Date(post.post_date).toLocaleDateString('es-ES')}
        </span>
        <span className="project-card__meta-sep">·</span>
        <span className="project-card__meta-item">
          <strong>Remote:</strong> {post.remote_project ? 'Sí' : 'No'}
        </span>
        <span className="project-card__meta-sep">·</span>
        <span className="project-card__meta-item">
          <strong>Budget:</strong> {post.estimated_budged} €
        </span>
      </div>
    </div>
    <div className="project-card__body">
      <p className="project-card__description">
        {post.post_description}
      </p>
    </div>
    <div className="project-card__footer">
      <div className="project-card__status-filter">
        <label className="project-card__status-item">
          <input
            type="checkbox"
            checked={post.post_active}
            onChange={() => handleActiveToggle(post.id)}
          /> Active
        </label>
        {!isArchived && (
          <label className="project-card__status-item">
            <input
              type="checkbox"
              checked={post.post_open}
              disabled={!post.post_active}
              onChange={() => handleToggle(post.id, 'post_open')}
            /> Open
          </label>
        )}
        <label className="project-card__status-item">
          <input
            type="checkbox"
            checked={post.post_completed}
            onChange={() => handleToggle(post.id, 'post_completed')}
          /> Completed
        </label>
      </div>
      <div className="project-card__actions">
        <button
          className="project-card__btn project-card__btn--view"
          onClick={() => handleView(post.id)}
        >
          View more
        </button>
        {!isArchived && (
          <button
            className="project-card__btn project-card__btn--edit"
            onClick={() => handleEdit(post.id)}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  </div>
);

  const locationOptions = [
    { country: "France", city: "Paris" },
    { country: "France", city: "Marseille" },
    { country: "Germany", city: "Berlin" },
    { country: "Germany", city: "Hamburg" },
    { country: "Spain", city: "Madrid" },
    { country: "Spain", city: "Barcelona" }
  ];

  return (
    <div className="dashboard-container">
      <div className="create-request-container">
        <h2 className="text-center text-white mb-4">Create a new Request</h2>
        <form className="create-request-form" onSubmit={handleSubmit}>
          <div className="form-top-row">
            <div className="form-group">
              <select className="form-select" name="category_id" defaultValue="">
                <option value="">Category</option>
                {categoriesList.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <select className="form-select" name="project_location" required>
                <option value="">Location</option>
                {locationOptions.map((opt, idx) => (
                  <option key={idx} value={`${opt.country}|${opt.city}`}>
                    {opt.country}: {opt.city}
                  </option>
                ))}
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
        <h3>My Published Requests</h3>
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
        <h3>Archived Requests</h3>
        <div className="row findwork__row customCard">{archivedPosts.map((post) => renderPostCard(post, true))}</div>
      </section>
    </div>
  );
};
