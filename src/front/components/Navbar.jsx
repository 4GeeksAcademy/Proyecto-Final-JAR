import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar custom-navbar">
			<div className="container">
				<img src="" alt="StarGig Logo" />  {/* Buscar como añadir la iamgen del logo desde cludinary  */}

				<div className="ml-auto">
					<Link to="/demo">
						<button className="text-white btn ">About</button>
					</Link>
					<Link to="/demo">
						<button className="text-white btn">Find Talent</button>
					</Link>
					<Link to="/demo">
						<button className="text-white btn">Find Work</button>
					</Link>
					<Link to="/demo">
						<button className="text-white btn">Pricing</button>
					</Link>
					<Link to="/demo">
						<button className="text-white btn">Log in</button>
					</Link>
					<Link to="/signup">
						<button className="text-white btn">Sign Up</button>
					</Link>
				</div>
			</div>
		</nav>

	);
};