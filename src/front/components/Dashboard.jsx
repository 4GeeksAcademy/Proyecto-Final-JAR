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
      alert("Please, select a category");
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
      alert("Post created successfully!");
      form.reset();
    } catch (err) {
      console.error("Failed to create post", err);
      if (err.message === "Unauthorized") {
        alert("Your session has expired. Please, log in");
      } else if (err.message === "Error creating post") {
        alert("There was a problem creating your request. Please, review your inputs and try again.");
      } else {
        alert("Unexpected error creating your request.");
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
    <div key={post.id} className="col-12 customCard">
      <div className="card findwork__card p-3 shadow-sm">
        <div className="row findwork__row w-100 align-items-center">
          <div className="col-lg-4 col-md-4 col-sm-6 d-flex flex-column gap-1">
            <p><strong>Category:</strong> {getCategoryName(post.category_id)}</p>
            <p><strong>Location:</strong> {post.project_country},{post.project_county},{post.project_city}</p>
            <p><strong>Remote Project:</strong> {post.remote_project ? "Sí" : "No"}</p>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-6 d-flex flex-column gap-1">
            <p><strong>Estimated Budget:</strong> {post.estimated_budged} - €</p>
            <p><strong>Date:</strong> {new Date(post.post_date).toLocaleDateString("es-ES")}</p>
            {isArchived && <p className="text-success">Archived</p>}
          </div>
        </div>
        <div className="row findwork__row mt-3">
          <p className="col-12 customDescription">{post.post_description}</p>
        </div>
        <div className="row findwork__row">
          <div className="col-12 d-flex align-items-center gap-3">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" checked={post.post_active}
                onChange={() => handleActiveToggle(post.id)} id={`active-${post.id}`} />
              <label className="form-check-label" htmlFor={`active-${post.id}`}>Active</label>
            </div>
            {!isArchived && (
              <div className="form-check">
                <input className="form-check-input" type="checkbox" checked={post.post_open}
                  disabled={!post.post_active} onChange={() => handleToggle(post.id, "post_open")}
                  id={`open-${post.id}`} />
                <label className="form-check-label" htmlFor={`open-${post.id}`}>Open</label>
              </div>
            )}
            <div className="form-check">
              <input className="form-check-input" type="checkbox" checked={post.post_completed}
                onChange={() => handleToggle(post.id, "post_completed")} id={`completed-${post.id}`} />
              <label className="form-check-label" htmlFor={`completed-${post.id}`}>Completed</label>
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
