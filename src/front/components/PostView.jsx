import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPosts } from "../services/PostServices.jsx";
import { getCategories } from "../services/CategoryServices.jsx";
import "../../front/FindWork.css";

export const PostView = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const [allPosts, allCategories] = await Promise.all([
        getPosts(),
        getCategories(),
      ]);
      const foundPost = allPosts.find((p) => p.id === parseInt(id));
      setPost(foundPost);

      if (foundPost) {
        const foundCategory = allCategories.find(
          (cat) => cat.id === foundPost.category_id
        );
        setCategoryName(foundCategory?.name || "Sin categoría");
      }
    };
    fetchData();
  }, [id]);

  if (!post) return <div className="container text-center my-5">Cargando publicación...</div>;

  return (
    <div className="container my-5">
      <div className="findwork__card">
        <div className="card-body w-100 text-start">
          <h3 className="text-center mb-4">📋 Detalles del proyecto</h3>

          {/* Fila de datos básicos */}
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

          {/* Fecha de publicación */}
          <div className="mb-4">
            <p><strong>Fecha de publicación:</strong> {post.post_date?.split('T')[0].split('-').reverse().join('-')}</p>
          </div>

          {/* Descripción */}
          <div className="description-section mb-4">
            <h5 className="customTittle">📝 Descripción del proyecto</h5>
            <p className="customDescription">{post.post_description}</p>
          </div>

          {/* Botones */}
          <div className="d-flex justify-content-center gap-3 mt-4">
            <button className="btn btn-secondary" onClick={() => window.history.back()}>🔙 Volver</button>
            <button className="btn btn-primary">✏️ Editar</button>
            <button className="btn btn-danger">🗂️ Archivar</button>
          </div>
        </div>
      </div>
    </div>
  );
};
