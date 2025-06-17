import { Link } from "react-router-dom";
import  "../../front/navbar.css"
import { CircleUserRound } from "lucide-react"

export const NavbarPrivate = () => {

	return (
	
<nav class="navbar navbarCustom navbar-expand-lg navbar-dark text-white " >
  <div class="container-fluid  d-flex justify-content-between">
  <a href="/">
    <img className="LogoStarGig" src="src/front/assets/img/LogoStarGig.png" alt="Logo StarGig" />
</a>





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
          <a class="nav-link text-light m-2px px-2" href="/">Home</a>
        </li>
        
          <li class="nav-item  mx-2">
          <a class="nav-link text-light m-2px px-2" href="#">Dashboard</a>
        </li>
       
         <li class="nav-item  mx-2">
          <a class="nav-link text-light m-2px px-2" href="/profile"><CircleUserRound /></a>
        </li>
      </ul>
    </div>
  </div>
</nav>
	);
};

