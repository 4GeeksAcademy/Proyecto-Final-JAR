import { Navbar } from "./Navbar"

export const Signup = () => {
  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="d-flex shadow rounded overflow-hidden signup-container">
        
       
        <div className="signup-image d-none d-md-block text-muted">
            <p className="fw-bold position-absolute"> Step 1: Basic Info </p>
          <img src="https://picsum.photos/200/300" alt="photo-work" className="img-fluid w-100 h-100 object-fit-cover opacity-50"/>
        </div>

        
        <div className="signup-form bg-primary text-dark p-4">
          <h4 className="fw-bold">Let’s Get Started</h4>
          <p className="mb-4">Join our community</p>

          <form>
            <div className="mb-5 d-flex align-items-center">
              <label htmlFor="email" className="form-label fw-bold ">Email:</label>
              <input type="email" className="form-control rounded-pill "  id="email" />
            </div>

            <div className="mb-5  d-flex align-items-center">
              <label htmlFor="password" className="form-label fw-bold">
                Password: <small>(min. 8 characters)</small>
              </label>
              <input type="password" className="form-control rounded-pill" id="password" />
            </div>

            <div className="mb-5 d-flex justify-content-between">
              <div className="form-check">
                <input className="form-check-input mb-4" type="radio" name="role" id="pro" />
                <label className="form-check-label" htmlFor="pro">I'm a professional</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="role" id="need" />
                <label className="form-check-label" htmlFor="need">I need a professional</label>
              </div>
            </div>

            <div className="mb-3 form-check">
              <input type="checkbox" className="form-check-input" id="terms" />
              <label className="form-check-label" htmlFor="terms">
                I agree to Star Gig’s <a href="#" className="text-warning text-decoration-underline">Terms</a> and <a href="#" className="text-warning text-decoration-underline">Privacy Policy</a>
              </label>
            </div>

            <button type="submit" className="btn btn-light w-100 rounded-pill fw-bold">Continue</button>
          </form>
        </div>
      </div>
    </div>
  );
};
