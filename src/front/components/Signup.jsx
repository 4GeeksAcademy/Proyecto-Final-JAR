import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';


import { createUser } from "../services/UserServices.jsx";
import "../../front/signup.css";



export const Signup = () => {

    const navigate = useNavigate()


    const [formData, setFormData] = useState({
        email: "",
        password: "",
        is_professional: false,
    });

    const [termsAccepted, setTermsAccepted] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name === "is_professional") {
            setFormData({ ...formData, [name]: value === "true" });
        } else if (name === "termsAccepted") {
            setTermsAccepted(checked);
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password.length < 8) {
            alert("Password must be at least 8 characters long.");
            return;
        }

        if (!termsAccepted) {
            alert("You must accept the Terms and Privacy Policy to continue.");
            return;
        }

        console.log("Datos enviados:", formData);

        try {
            await createUser(formData);
            alert("User created successfully!");
            navigate("/login")
        } catch (error) {
            console.error("Error submitting user:", error);
        }
    };

    return (
        <div className="signup-container-wrapper">
            <div className="signup-main-container">
                <div className="signup-image-section">
                    <p className="signup-step">Step 1: Basic Info</p>
                    <img src="https://picsum.photos/200/300" alt="photo-work" className="signup-image" />
                </div>

                <div className="signup-form-section">
                    <h4 className="signup-title">Let's Get Started</h4>
                    <p className="signup-title2">Join our community</p>

                    <form onSubmit={handleSubmit}>
                        <div className="form-field-group">
                            <label htmlFor="email" className="form-label">Email:</label>
                            <input
                                className="form-input form-control"
                                id="email"
                                onChange={handleChange}
                                value={formData.email}
                                name="email"
                                type="email"
                            />
                        </div>

                        <div className="form-field-group">
                            <label htmlFor="password" className="form-label">Password: <span className="password-hint">(min. 8 characters)</span></label>
                            <input
                                className="form-input form-control"
                                id="password"
                                onChange={handleChange}
                                value={formData.password}
                                name="password"
                                type="password"
                            />
                        </div>

                        <div className="role-selection">
                            <div className="role-option">
                                <input
                                    className="role-radio"
                                    type="radio"
                                    name="is_professional"
                                    id="pro"
                                    value="true"
                                    checked={formData.is_professional}
                                    onChange={handleChange}
                                />
                                <label className="role-label" htmlFor="pro">
                                    I'm a professional
                                </label>
                            </div>

                            <div className="role-option">
                                <input
                                    className="role-radio"
                                    type="radio"
                                    name="is_professional"
                                    id="need"
                                    value="false"
                                    checked={!formData.is_professional}
                                    onChange={handleChange}
                                />
                                <label className="role-label" htmlFor="need">
                                    I need a professional
                                </label>
                            </div>
                        </div>

                        <div className="terms-checkbox">
                            <input
                                type="checkbox"
                                className="terms-input"
                                id="terms"
                                name="termsAccepted"
                                checked={termsAccepted}
                                onChange={handleChange}
                            />
                            <label className="terms-label" htmlFor="terms">
                                I agree to Star Gig's{" "}
                                <a href="#" className="terms-link">Terms</a>
                                and <a href="#" className="terms-link">Privacy Policy</a>
                            </label>
                        </div>

                        <div className="submit-button-container">
                            <button type="submit" className="submit-button">Continue</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};