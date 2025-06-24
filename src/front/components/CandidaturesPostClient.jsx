import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPosts } from "../services/PostServices.jsx";
import { getCategories } from "../services/CategoryServices.jsx";
import { createCandidature } from "../services/CandidatureServices.jsx";
import "../../front/FindWork.css";
export const CandidaturesPostClient = () => {
 const { id } = useParams();
  const [post, setPost] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [candidatureMessage, setCandidatureMessage] = useState("");

  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState(""); // "error" or "success"

  useEffect(() => {
    const fetchData = async () => {
      const [allPosts, allCategories] = await Promise.all([getPosts(), getCategories()]);
      const foundPost = allPosts.find((p) => p.id === parseInt(id));
      setPost(foundPost);

      if (foundPost) {
        const foundCategory = allCategories.find((cat) => cat.id === foundPost.category_id);
        setCategoryName(foundCategory?.name || "Sin categoría");
      }
    };
    fetchData();
  }, [id]);

  if (!post) return <div className="container text-center my-5">Loading publication...</div>;

  const showTimedAlert = (message, type = "error") => {
    setAlertMessage(message);
    setAlertType(type);
    setTimeout(() => {
      setAlertMessage("");
      setAlertType("");
    }, 4000);
  };

  const handleClickPostularse = () => {
    if (!user || !user.is_professional) {
      showTimedAlert("Only professional users can apply to this offer.", "error");
      return;
    }
    setShowForm(true);
    setError(null);
    setSuccess(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!candidatureMessage.trim()) {
      showTimedAlert("Application message is required.", "error");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const formData = {
        candidature_message: candidatureMessage,
        post_id: post.id,
      };

      await createCandidature(formData);
      setSuccess("Application sent successfully!");
      showTimedAlert("Application sent successfully!", "success");
      setCandidatureMessage("");
      setShowForm(false);
    } catch (err) {
      showTimedAlert("Error sending application: " + (err.message || "Unknown error"), "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <div className="post-view-card">
        <h3 className="post-header-card">📋 Project Details</h3>

        <div className="details-grid-card">
          <div className="detail-item-card">
            <strong>Category:</strong>
            <p>{categoryName}</p>
          </div>
          <div className="detail-item-card">
            <strong>Country:</strong>
            <p>{post.project_country}</p>
          </div>
          <div className="detail-item-card">
            <strong>City:</strong>
            <p>{post.project_city}</p>
          </div>
          <div className="detail-item-card">
            <strong>County:</strong>
            <p>{post.project_county}</p>
          </div>
        </div>

        <div className="post-date-card">
          <strong>Post date:</strong> {post.post_date?.split("T")[0].split("-").reverse().join("-")}
        </div>

        <div className="description-container-card">
          <h5 className="description-title">📝 Project Description</h5>
          <p className="description-content">{post.post_description}</p>
        </div>

        {/* ALERTA DEBAJO DE LA DESCRIPCIÓN */}
        {alertMessage && (
          <div className={`alert text-center alert-${alertType === "success" ? "success" : "danger"} mt-3`}>
            {alertMessage}
          </div>
        )}

        <div className="actions-container-card mt-4">
          <button
            className="action-btn btn-back"
            onClick={() => window.history.back()}
          >
            ← Go back
          </button>
          {!showForm && (
            <button
              className="action-btn btn-apply"
              onClick={handleClickPostularse}
            >
              Apply
            </button>
          )}
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="form-container mt-4">
            <div className="mb-3">
              <label htmlFor="candidatureMessage" className="form-label">
                <strong>Application Message:</strong>
              </label>
              <textarea
                id="candidatureMessage"
                rows={6}
                className="form-control"
                placeholder="Explain why you're the ideal candidate for this project..."
                value={candidatureMessage}
                onChange={(e) => setCandidatureMessage(e.target.value)}
                required
              />
            </div>
            <div className="d-flex justify-content-end gap-2">
              <button
                type="button"
                className="action-btn btn-back"
                onClick={() => setShowForm(false)}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                className="action-btn btn-apply"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Sending...
                  </>
                ) : (
                  "Submit Application"
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
