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
      alert("Updated!");
    }, 1500);
  };

  return (
    <div className="profile-wrapper">
      <div className="profile-container">
        <div className="profile-image"></div>

        <div className="profile-form">
          <p className="profile-step">Step 2: Professional Info</p>
          <h2 className="form-title">Complete Your Profile</h2>
          <p className="form-subtitle">Let clients know your background</p>

          <form onSubmit={handleSubmit} className="profile-form-inner">
            <label className="form-label">About Me</label>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              placeholder="Tell us about yourself..."
              className="form-input textarea"
            />

            <label className="form-label">Education</label>
            <textarea
              name="education"
              value={formData.education}
              onChange={handleChange}
              placeholder="Degrees, institutions..."
              className="form-input textarea"
            />

            <label className="form-label">Certifications</label>
            <textarea
              name="certifications"
              value={formData.certifications}
              onChange={handleChange}
              placeholder="Certifications, dates..."
              className="form-input textarea"
            />

            <label className="form-label">Skills & Experience</label>
            <textarea
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="Your main skills..."
              className="form-input textarea"
            />

            <div className="submit-button-container">
              <button
                type="submit"
                className="submit-button"
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save Profile"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};