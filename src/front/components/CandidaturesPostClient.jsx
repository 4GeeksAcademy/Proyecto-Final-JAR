import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPosts } from "../services/PostServices.jsx";
import { getCategories } from "../services/CategoryServices.jsx";
import { getCandidaturesByPostId } from "../services/CandidatureServices.jsx";
import { createCandidature } from "../services/CandidatureServices.jsx";
import { Link } from "react-router-dom";
import "../../front/FindWork.css";

export const CandidaturesPostClient = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [candidatures, setCandidatures] = useState([]);
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [candidatureMessage, setCandidatureMessage] = useState("");

  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [allPosts, allCategories, candidaturesData] = await Promise.all([
          getPosts(),
          getCategories(),
          getCandidaturesByPostId(id),
        ]);
        
        const foundPost = allPosts.find(p => p.id === parseInt(id));
        setPost(foundPost);
        setCandidatures(candidaturesData);

        if (foundPost) {
          const foundCategory = allCategories.find(
            cat => cat.id === foundPost.category_id
          );
          setCategoryName(foundCategory?.name || "Sin categoría");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        showTimedAlert("Failed to load data. Please try again later.", "error");
      }
    };
    fetchData();
  }, [id]);

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
      showTimedAlert("Application sent successfully!", "success");
      setCandidatureMessage("");
      setShowForm(false);
      
      // Refresh candidatures after submission
      const updatedCandidatures = await getCandidaturesByPostId(id);
      setCandidatures(updatedCandidatures);
    } catch (err) {
      showTimedAlert("Error sending application: " + (err.message || "Unknown error"), "error");
    } finally {
      setLoading(false);
    }
  };

  if (!post) return <div className="container text-center my-5">Loading publication...</div>;

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
          <strong>Post date:</strong>{" "}
          {post.post_date?.split("T")[0].split("-").reverse().join("-")}
        </div>

        <div className="description-container-card">
          <h5 className="description-title">📝 Project Description</h5>
          <p className="description-content">{post.post_description}</p>
        </div>

        {alertMessage && (
          <div
            className={`alert text-center alert-${alertType === "success" ? "success" : "danger"} mt-3`}
          >
            {alertMessage}
          </div>
        )}

        <div className="candidatures-list mt-4">
          <h5 className="description-title">👥 Candidatures</h5>
          {candidatures.length > 0 ? (
            <ul className="list-unstyled">
              {candidatures.map((candidature) => (
                <li key={candidature.id} className="mb-3 p-3 border rounded">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <span className="text-muted">Sent by: </span>
                      <Link
                        to={`/profesional/${candidature.professional?.id || ''}`}
                        className="text-primary fw-bold text-decoration-none"
                      >
                        {/* Access firstname through professional object */}
                        {candidature.professional?.firstname || "Unknown"}
                      </Link>
                      <div className="text-muted small mt-1">
                        <i className="bi bi-clock me-1"></i>
                        {new Date(candidature.candidature_date).toLocaleDateString()}
                      </div>
                    </div>
                    <span className={`badge ${candidature.candidature_status === 'ACCEPTED' ? 'bg-success' : candidature.candidature_status === 'REJECTED' ? 'bg-danger' : 'bg-info'}`}>
                      {candidature.candidature_status}
                    </span>
                  </div>
                  <div className="mt-2 bg-light p-2 rounded">
                    {candidature.candidature_message}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted">No candidatures yet</p>
          )}
        </div>

        <div className="actions-container-card mt-4">
          <button
            className="action-btn btn-back"
            onClick={() => window.history.back()}
          >
            ← Go back
          </button>
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
