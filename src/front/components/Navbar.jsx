import { Link } from "react-router-dom";
import "../../front/navbar.css"
export const Navbar = () => {

  return (




    <nav className="navbar navbarCustom navbar-expand-lg navbar-dark text-white " >
      <div className="container-fluid  d-flex justify-content-between">
        <a href="/">
          <img className="LogoStarGig" src="src/front/assets/img/LogoStarGig.png" alt="Logo StarGig" />
        </a>





        <button className="navbar-toggler my-2 border-white border-2" type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="true" aria-label="Toggle navigation">
          <span className="fa-solid fa-bars text-white "></span>
        </button>


        <div className="collapse navbar-collapse justify-content-end  navbarDivCustom" id="navbarNav">
          <ul className="navbar-nav navbarIconCustom">
            <li className="nav-item  mx-2">
              <a className="nav-link text-light  px-2" href="/about">About</a>
            </li>
            <li className="nav-item  mx-2">
              <a className="nav-link text-light m-2px px-2" href="#">Find Talent</a>
            </li>
            <li className="nav-item  mx-2">
              <a className="nav-link text-light m-2px px-2" href="/findWork">Find Work</a>
            </li>
            <li className="nav-item  mx-2">
              <a className="nav-link text-light m-2px px-2" href="/pricing">Pricing</a>
            </li>
            <li className="nav-item  mx-2">
              <a className="nav-link text-light m-2px px-2" href="/login">Log in</a>
            </li>
            <li className="nav-item  mx-2">
              <a className="nav-link text-light m-2px px-2" href="/signup">Sign up</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

  );
};

