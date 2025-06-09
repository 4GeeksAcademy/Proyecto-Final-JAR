import { Navbar } from "./Navbar"

import "../about.css";
import imagenLogo from "../assets/img/LogoStarGig.png"

export const About = () => {


    const handleSubmit = e => {
        e.preventDefault()
    }
    return (
        <div className="container about-container">

            <img className="" src={imagenLogo} alt="" />


            <div className="about-text">

                <p className="about-text">Star Gigs: The perfect bridge between clients and businesses</p>

                <p className="about-text">
                    In a world where connection and efficiency are key, Star Gigs stands as the ideal link between clients and businesses, ensuring smooth communication, real opportunities, and effective results.
                </p>

                <p className="about-text">
                    Our platform makes it easier for professionals from various industries to connect with clients seeking reliable solutions, providing a space where experience and innovation come together to drive successful projects.
                </p>

                <p className="about-text">
                    Whether it's finding the perfect talent or accessing strategic business opportunities, Star Gigs transforms the way businesses and clients collaborate, creating strong and efficient relationships in a modern and dynamic environment.
                </p>

            </div>

            <div className="container-fluid d-flex justify-content-center">
                <div className="form-container m-5">
                    <h2 className="form-tittle">Contact Form</h2>
                    <form className="contenedorForm"onSubmit={handleSubmit}>
                        <div className="row justify-content-center">
                            <div className="col-lg-4 col-md-12 col-sm-12 py-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                                <input type="email" className="form-control form-input" id="exampleInputEmail1" />
                            </div>
                            <div className="col-lg-4 col-md-12 col-sm-12 py-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Name</label>
                                <input type="text" className="form-control form-input" id="exampleInputPassword1" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 py-3">
                                <label htmlFor="exampleFormControlTextarea1" className="form-label">Message</label>
                                <textarea className="form-control form-textarea" id="exampleFormControlTextarea1" rows="4"></textarea>
                            </div>
                            <div className="col-lg-2 col-md-4 col-sm-5 text-center pt-4 justify-content-center">
                                <button type="submit" className="btn btn-primary form-button">Submit</button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>



        </div>
    );
};