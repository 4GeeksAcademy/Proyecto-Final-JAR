import { Link } from "react-router-dom";
import  "../../front/navbar.css"
import { CircleUserRound } from "lucide-react"

import useGlobalReducer from "../hooks/useGlobalReducer"

export const Navbar = () => {
  const {store, dispatch } = useGlobalReducer()
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
          <Link className="nav-link text-light  px-2"  to="/about">About</Link> 
        </li>
        <li className="nav-item  mx-2">
          <Link className="nav-link text-light m-2px px-2" to="#">Find Talent</Link>
        </li>
        <li className="nav-item  mx-2">
          <Link className="nav-link text-light m-2px px-2" to="/findWork">Find Work</Link>
        </li>
        <li className="nav-item  mx-2">
          <Link className="nav-link text-light m-2px px-2" to="/pricing">Pricing</Link>
        </li>
        {localStorage.getItem("token") || store.token ?
        (<>
                    <li class="nav-item  mx-2">
          <Link class="nav-link text-light m-2px px-2" to="/dashboard">Dashboard</Link>
        </li>
       
         <li class="nav-item  mx-2">
          <Link class="nav-link text-light m-2px px-2" to="/profile"><CircleUserRound /></Link>
        </li>
        </>
        )
        :
        
        (
        <>
          <li className="nav-item  mx-2">
          <Link className="nav-link text-light m-2px px-2" to="/login">Log in</Link>
        </li>
        <li className="nav-item  mx-2">
          <Link className="nav-link text-light m-2px px-2" to="/signup">Sign up</Link>
        </li>
        </>
        )
        }
      </ul>
    </div>
  </div>
</nav>

  );
};

