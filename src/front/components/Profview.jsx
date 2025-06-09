import React, { useState } from "react";
import "../../front/profview.css";

export const ProfessionalView = () => {
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    about: "",
    education: "",
    certifications: "",
    skills: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    setTimeout(() => {
      console.log("Datos guardados:", formData);
      setIsSaving(false);
      alert("¡Completed");
    }, 1500);
  };

  return (
    <div className="professional-wrapper">
      <div className="professional-container">
        <div className="image-section">
          <div className="image-overlay">
            <div className="welcome-message">
              <h2>Tu talento merece</h2>
              <h1>ESTRELLAS</h1>
              <div className="glow-effect"></div>
            </div>
          </div>
        </div>

        <div className="form-section">
          <div className="form-header">
            <h1 className="form-title">
              Welcome to <span className="highlight">Star Gigs</span>
            </h1>
            <p className="form-subtitle">
              Show your <span className="underline">best self</span> to potential clients
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <div className="input-label">
                <FiUser className="input-icon" />
                <label>About me</label>
              </div>
              <textarea
                name="about"
                value={formData.about}
                onChange={handleChange}
                className="form-textarea"
                placeholder="Tell us about yourself (min. 50 chars)..."
                rows={4}
              />
            </div>

            <div className="double-fields">
              <div className="input-group">
                <div className="input-label">
                  <FiBook className="input-icon" />
                  <label>Education</label>
                </div>
                <textarea
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  className="form-textarea"
                  placeholder="Degrees, courses, institutions..."
                  rows={4}
                />
              </div>

              <div className="input-group">
                <div className="input-label">
                  <FiAward className="input-icon" />
                  <label>Certifications</label>
                </div>
                <textarea
                  name="certifications"
                  value={formData.certifications}
                  onChange={handleChange}
                  className="form-textarea"
                  placeholder="Certifications with dates..."
                  rows={4}
                />
              </div>
            </div>

            <div className="input-group">
              <div className="input-label">
                <FiCode className="input-icon" />
                <label>Skills and experience</label>
              </div>
              <textarea
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                className="form-textarea"
                placeholder="Your top skills (separate by commas)..."
                rows={4}
              />
            </div>

            <button type="submit" className="submit-btn" disabled={isSaving}>
              {isSaving ? (
                <div className="spinner"></div>
              ) : (
                <>
                  <FiSave className="btn-icon" />
                  Save Profile
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};