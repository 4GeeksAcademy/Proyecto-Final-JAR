import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProfessionalById } from "../services/ProfessionalServices.jsx";
import { CircleUserRound } from "lucide-react";
import "../../front/ProfessionalCard.css";


export const ProfessionalDetail = () => {
  const { id } = useParams(); // ✅ Corrección aquí
  const navigate = useNavigate();

  const [professional, setProfessional] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProfessional = async () => {
      try {
        const data = await fetchProfessionalById(id); // ✅ Usar `id`
        setProfessional(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getProfessional();
  }, [id]);

  if (loading) return <div className="container text-center my-5">Cargando...</div>;
  if (error) return <div className="container text-center my-5 text-danger">Error: {error}</div>;
  if (!professional) return <div className="container text-center my-5">Profesional no encontrado</div>;

  return (
    <div className="container profileCustom align-content-center my-5">
      <h2 className="text-center text-white">Professional Profile</h2>

      <div className="container my-5">
        <div className="row justify-content-center align-items-center">
          <div className="userIcon col-4">
            <CircleUserRound size={200} />
          </div>
          <div className="col-3">
            <p className="userName">{professional.firstname || "Nombre no disponible"}</p>
          </div>
        </div>

        <div className="row justify-content-center my-5">
          <div className="col-8 text-white">
            <h5>🧠 Professional Experience:</h5>
            <p>
              {professional.prof_experience
                ? professional.prof_experience
                : "Este profesional aún no ha agregado una descripción."}
            </p>
          </div>
        </div>

        {professional.prof_url && (
          <div className="row justify-content-center my-4">
            <div className="col-4 text-center">
              <a
                href={professional.prof_url}
                className="pricingButtonPlus"
                target="_blank"
                rel="noreferrer"
              >
                View Portfolio / External Profile
              </a>
            </div>
          </div>
        )}

        <div className="row justify-content-center my-5">
          <button className="col-3 pricingButtonPlus" onClick={() => navigate(-1)}>
            ← Go back
          </button>
        </div>
      </div>
    </div>
  );
};
