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

            <div className=" form-container ">
                <h2 className="form-tittle">Contact Form </h2>
                <form className=" row text-start " onSubmit={handleSubmit}>
                    <div class=" col-sm-12 col-md-12 col-lg-6 my-3 ">
                        <label for="exampleInputEmail1" className="form-label ">Email </label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                    </div>
                    <div className=" col-sm-12 col-md-12 col-lg-6 my-3">
                        <label for="exampleInputPassword1" className="form-label">Name</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" />
                    </div>


                    <div class="mb-3 col-sm-12  col-md-12 col-lg-12 my-3 message-form">
                        <label for="exampleFormControlTextarea1" className="form-label">Message</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>
                    <div className=" col-sm-6 col-md-6 col-lg-2">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>



        </div>
    );
};