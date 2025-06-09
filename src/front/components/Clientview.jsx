import React, { useState } from "react";
import "../../front/clientview.css";

export const ClientView = () => {
  const [formData, setFormData] = useState({
    category: "",
    country: "",
    city: "",
    date: "",
    description: ""
  });

  const [isSending, setIsSending] = useState(false);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setIsSending(true);

    setTimeout(() => {
      console.log("Solicitud enviada:", formData);
      setIsSending(false);
      alert("¡Tu solicitud fue enviada con éxito!");
    }, 1500);
  };

  return (
    <div className="profile-wrapper">
      <div className="profile-container">
        <div className="profile-image client-image"></div>

        <div className="profile-form">
          <p className="profile-step">Step 2: Request Details</p>
          <h2 className="form-title">Tell us what you need</h2>
          <p className="form-subtitle">We'll help you find the right professional</p>

          <form onSubmit={handleSubmit} className="profile-form-inner">
            <label className="form-label">Category</label>
            <select name="category" value={formData.category} onChange={handleChange} className="form-input">
              <option value="">Select a category</option>
              <option value="Carpentry">Carpentry</option>
              <option value="Software">Software Development</option>
              <option value="Marketing">Marketing</option>
              <option value="Other">...</option>
            </select>

            <label className="form-label">Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Your country"
              className="form-input"
            />

            <label className="form-label">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Your city"
              className="form-input"
            />

            <label className="form-label">Expected Start Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="form-input"
            />

            <label className="form-label">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the project, deadlines, expectations..."
              className="form-input textarea"
            />

            <div className="submit-button-container">
              <button
                type="submit"
                className="submit-button"
                disabled={isSending}
              >
                {isSending ? "Sending..." : "Submit Request"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};