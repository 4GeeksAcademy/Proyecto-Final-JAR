import { Navbar } from "./Navbar"
import "../login.css";
import { useState } from "react";
import { login } from "../services/UserServices";
import  useGlobalReducer  from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const {store, dispatch} = useGlobalReducer();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData, [name]: value
        });
    };

    const handleSubmit =  (e) => {
        e.preventDefault();
        console.log("Datos enviados:", formData);

            login(formData).then(data=> {
                if (data.error) {
                    console.error("Error logging in:", data.error);
                    return;
                }
                dispatch({type: "LOGIN", payload: data});
                console.log("User logged in successfully:", data);
                navigate("/profile");
            }).catch(error => {
            });
    };


    return (
        <div className="login-container-wrapper">
            <div className="login-main-container">
                <div className="login-image-section ">
                    <img src="https://picsum.photos/200/300" alt="photo-work" className="signup-image" />
                </div>

                <div className="login-form-section">
                    <h4 className="login-title">Great to see you again!</h4>
                    <p className="login-title2">Let's get back to work</p>

                    <form onSubmit={handleSubmit}>
                        <div className="form-field-group">
                            <label htmlFor="email" className="form-label">Email:</label>
                            <input type="email" name='email' className="form-input" id="email" onChange={handleChange} />
                        </div>

                        <div className="form-field-group">
                            <label htmlFor="password" className="form-label">Password:</label>
                            <input type="password" name='password' className="form-input" id="password" onChange={handleChange} />
                        </div>


                        <div className="submit-button-container">
                            <button type="submit" className="submit-button">Continue</button>
                        </div>

                        <div className="form-options">
                            <div className="remember-me">
                                <input type="checkbox" id="remember" />
                                <label htmlFor="remember"> Remember me</label>
                            </div>
                            <div className="forgot-password">
                                <a href="#">Forgot password?</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};