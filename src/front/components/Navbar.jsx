import { Link } from "react-router-dom";
import navbarCSS from  "../../front/navbar.css"
export const Navbar = () => {

	return (
	



<nav class="navbar navbarCustom navbar-expand-lg navbar-dark text-white " >
  <div class="container-fluid  d-flex justify-content-between">
    <img src="../assets/img/LogoStarGig.png" alt="" />




<button class="navbar-toggler my-2 border-white border-2" type="button" data-bs-toggle="collapse" 
  data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="true" aria-label="Toggle navigation">
  <span class="fa-solid fa-bars text-white "></span>
</button>


    <div class="collapse navbar-collapse justify-content-end  navbarDivCustom" id="navbarNav">
      <ul class="navbar-nav navbarIconCustom">
        <li class="nav-item  mx-2">
          <a class="nav-link text-light  px-2"  href="/about">About</a> 
        </li>
        <li class="nav-item  mx-2">
          <a class="nav-link text-light m-2px px-2" href="#">Find Talent</a>
        </li>
        <li class="nav-item  mx-2">
          <a class="nav-link text-light m-2px px-2" href="#">Find Work</a>
        </li>
        <li class="nav-item  mx-2">
          <a class="nav-link text-light m-2px px-2" href="#">Pricing</a>
        </li>
        <li class="nav-item  mx-2">
          <a class="nav-link text-light m-2px px-2" href="#">Log in</a>
        </li>
        <li class="nav-item  mx-2">
          <a class="nav-link text-light m-2px px-2" href="/signup">Sign up</a>
        </li>
      </ul>
    </div>
  </div>
</nav>

	);
};

