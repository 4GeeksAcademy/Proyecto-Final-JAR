import { Navbar } from "./Navbar"


export const Signup = () => {
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

                    <form>
                        <div className="form-field-group">
                            <label htmlFor="email" className="form-label">Email:</label>
                            <input type="email" className="form-input" id="email" />
                        </div>

                        <div className="form-field-group">
                            <label htmlFor="password" className="form-label">Password: <span className="password-hint">(min. 8 characters)</span></label>
                            <input type="password" className="form-input" id="password"/>
                        </div>

                        <div className="role-selection">
                            <div className="role-option">
                                <input className="role-radio" type="radio" name="role" id="pro" />
                                <label className="role-label" htmlFor="pro">
                                    I'm a professional
                                </label>
                            </div>
                            <div className="role-option">
                                <input className="role-radio" type="radio" name="role" id="need" />
                                <label className="role-label" htmlFor="need">
                                    I need a professional
                                </label>
                            </div>
                        </div>
                       
                        <div className="terms-checkbox">
                            <input type="checkbox" className="terms-input" id="terms" />
                            <label className="terms-label" htmlFor="terms"> 
                                I agree to Star Gig's{" "}
                                <a href="#" className="terms-link"> Terms </a>
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