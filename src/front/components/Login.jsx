import { Navbar } from "./Navbar"
import "../login.css"

export const Login = () => {

    
    const handleSubmit = e => {
        e.preventDefault()
    }

    return (
        <div className="login-container-wrapper"> 
            <div className="login-main-container">
                <div className="login-image-section">
                    <p className="login-step">Step 1: Basic Info</p>
                    <img src="https://picsum.photos/200/300" alt="photo-work" className="login-image" />
                </div>

                <div className="login-form-section">
                    <h4 className="login-title">Let's Get Started</h4>
                    <p className="login-title2">Join our community</p>

                    <form onSubmit={handleSubmit}>
                        <div className="form-field-group">
                            <label htmlFor="email" className="form-label">Email:</label>
                            <input type="email" className="form-input" id="email" />
                        </div>

                        <div className="form-field-group">
                            <label htmlFor="password" className="form-label">Password: <span className="password-hint">(min. 8 characters)</span></label>
                            <input type="password" className="form-input" id="password"/>
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