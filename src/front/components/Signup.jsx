import { Navbar } from "./Navbar"

export const Signup = () => {
    return (
        <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
            <div className="d-flex shadow rounded overflow-hidden signup-container">


                <div className="signup-image d-none d-md-block text-muted">
                    <p className="fw-bold position-absolute"> Step 1: Basic Info </p>
                    <img src="https://picsum.photos/200/300" alt="photo-work" className="img-fluid w-100 h-100 object-fit-cover opacity-50" />
                </div>


                <div className="signup-form  text-dark p-4">
                    <h4 className="fw-bold">Let’s Get Started</h4>
                    <p className="mb-4 fw-bold">Join our community</p>

                    <form>
                        <div className="mb-4 row align-items-center">
                            <label htmlFor="email" className="col-4 col-form-label fw-bold text-start"> Email: </label>
                            <div className="col-8">
                                <input type="email" className="form-control rounded-pill" id="email" />
                            </div>
                        </div>

                        <div className="mb-5 row align-items-center">
                            <label htmlFor="password" className="col-4 col-form-label fw-bold text-start"> Password: <small className="d-block">(min. 8 characters)</small> </label>
                            <div className="col-8">
                                <input type="password" className="form-control rounded-pill" id="password"/>
                            </div>
                        </div>

                        <div className="mb-5 d-flex justify-content-center  gap-4">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="role" id="pro" />
                                <label className="form-check-label fw-bold" htmlFor="pro">
                                    I'm a professional
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="role" id="need" />
                                <label className="form-check-label fw-bold" htmlFor="need">
                                    I need a professional
                                </label>
                            </div>
                        </div>
                       <div className="mb-4 d-flex justify-content-center">
                            <div className="form-check">
                                <input type="checkbox" className="form-check-input" id="terms" />
                                <label className="form-check-label" htmlFor="terms"> I agree to Star Gig’s{" "} <a href="#" className="text-warning text-decoration-underline">Terms </a>
                                    and <a href="#" className="text-warning text-decoration-underline">Privacy Policy</a>
                                </label>
                            </div>
                        </div>

                         <div className="d-flex justify-content-center">
                            <button 
                                type="submit" className="btn btn-light rounded-pill fw-bold px-4" >Continue </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
