import React, { useEffect, useState } from "react";
import "../../front/dashboard.css"; // asumimos que lo compartís

export const DashboardProfessional = ({ professionalId }) => {
  const [candidatures, setCandidatures] = useState([]);

  useEffect(() => {
    fetch(`${process.env.BACKEND_URL}/api/professional/${professionalId}/candidatures`)
      .then((res) => res.json())
      .then((data) => setCandidatures(data))
      .catch((err) => console.error("Error loading candidatures:", err));
  }, [professionalId]);

  const activeCandidatures = candidatures.filter(c => c.candidature_status === 1); // IN_PROCESS

  return (
    <div className="dashboard-container">
      <section className="posts-section">
        <h3>My Active Applications</h3>
        {activeCandidatures.length === 0 ? (
          <p>No active applications found.</p>
        ) : (
          activeCandidatures.map(c => (
            <div key={c.id} className="findwork__card">
              <div className="card-header">
                <p className="customTittle">Post ID: {c.post_id}</p>
                <p>📅 {new Date(c.candidature_date).toLocaleDateString()}</p>
              </div>
              <div className="card-body">
                <p className="customDescription">{c.candidature_message}</p>
              </div>
              <div className="card-footer">
                <span className="btn btn-primary btn-sm">In Process</span>
                <button className="btn btn-secondary btn-sm">View Post</button>
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
};