import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPosts } from "../services/PostServices.jsx";
import { getCategories } from "../services/CategoryServices.jsx";
import { createCandidature } from "../services/CandidatureServices.jsx";
import "../../front/FindWork.css";

export const PostView = () => {
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

  if (!post) return <div className="container text-center my-5">Cargando publicación...</div>;

  const handleClickPostularse = () => {
    if (!user || !user.is_professional) {
      alert("Solo los usuarios profesionales pueden postularse a esta oferta.");
      return;
    }
    setShowForm(true);
    setError(null);
    setSuccess(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!candidatureMessage.trim()) {
      setError("El mensaje de postulación es obligatorio.");
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
      setSuccess("¡Postulación enviada con éxito!");
      setCandidatureMessage("");
      setShowForm(false);
    } catch (err) {
      setError("Error al enviar la postulación: " + (err.message || "Error desconocido"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <div className="findwork__card">
        <div className="card-body w-100 text-start">
          <h3 className="text-center mb-4">📋 Detalles del proyecto</h3>

          <div className="row mb-3">
            <div className="col-md-3 col-sm-6 mb-2">
              <p><strong>Categoría:</strong><br /> {categoryName}</p>
            </div>
            <div className="col-md-3 col-sm-6 mb-2">
              <p><strong> País:</strong><br /> {post.project_country}</p>
            </div>
            <div className="col-md-3 col-sm-6 mb-2">
              <p><strong> Ciudad:</strong><br /> {post.project_city}</p>
            </div>
            <div className="col-md-3 col-sm-6 mb-2">
              <p><strong> Provincia:</strong><br /> {post.project_county}</p>
            </div>
          </div>

          <div className="mb-4">
            <p><strong>Fecha de publicación:</strong> {post.post_date?.split("T")[0].split("-").reverse().join("-")}</p>
          </div>

          <div className="description-section mb-4">
            <h5 className="customTittle">📝 Descripción del proyecto</h5>
            <p className="customDescription">{post.post_description}</p>
          </div>

          <div className="d-flex justify-content-center gap-3 mt-4">
            <button className="btn btn-secondary" onClick={() => window.history.back()}>🔙 Volver</button>

            {!showForm && (
              <button
                className="btn btn-primary"
                onClick={handleClickPostularse}
              >
                Postularse
              </button>
            )}
          </div>

          {showForm && (
            <form onSubmit={handleSubmit} className="mt-3">
              <textarea
                rows={4}
                className="form-control"
                placeholder="Escribe tu mensaje para la postulación"
                value={candidatureMessage}
                onChange={(e) => setCandidatureMessage(e.target.value)}
                required
              />
              <button className="btn btn-success mt-2" type="submit" disabled={loading}>
                {loading ? "Enviando..." : "Enviar"}
              </button>
            </form>
          )}

          {error && <p className="text-danger mt-3">{error}</p>}
          {success && <p className="text-success mt-3">{success}</p>}
        </div>
      </div>
    </div>
  );
};
