import { Navbar } from "./Navbar"
import "../login.css";


export const Login = () => {


    const handleSubmit = e => {
        e.preventDefault()
    }

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
                            <input type="email" className="form-input" id="email" />
                        </div>

                        <div className="form-field-group">
                            <label htmlFor="password" className="form-label">Password:</label>
                            <input type="password" className="form-input" id="password" />
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