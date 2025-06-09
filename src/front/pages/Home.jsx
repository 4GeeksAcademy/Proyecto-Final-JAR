import React, { useEffect } from "react"

import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

import { Search, ClipboardList, Monitor } from "lucide-react"

import "../../front/home.css"


export const Home = () => {

	const { store, dispatch } = useGlobalReducer()

	const loadMessage = async () => {
		try {
			const backendUrl = import.meta.env.VITE_BACKEND_URL

			if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file")

			const response = await fetch(backendUrl + "/api/hello")
			const data = await response.json()

			if (response.ok) dispatch({ type: "set_hello", payload: data.message })

			return data

		} catch (error) {
			if (error.message) throw new Error(
				`Could not fetch the message from the backend.
				Please check if the backend is running and the backend port is public.`
			);
		}

	}

	useEffect(() => {
		loadMessage()
	}, [])


	const scrollServices = (direction) => {
		const container = document.getElementById("service-scroll");
		container.scrollBy({ left: direction === "left" ? -250 : 250, behavior: "smooth" });
	};


	return (
		<div className="container-fluid container-all">
			<div className="image-wrapper">
				<img src="https://www.sim-prom.com/assets/img-temp/900x600/img1.jpg" alt="Random Image" />
				<h1 className="title">Get more dates with Freelancers</h1>
				<input type="text" className="search-input" placeholder="Search Any Services" />
			</div>


			<div class="features-content">
				<div class="content-wrapper features-section">
					<div class="feature-box">
						<span className="fa-solid fa-lightbulb fa-10x"></span>
						<h3>You don’t need to do it all yourself</h3>
						<p>Spend more time on what you do best & start getting more done</p>
					</div>

					<div class="feature-box">
						<span class="fa-regular fa-id-card fa-10x"></span>
						<h3>Don’t regret a bad hire</h3>
						<p>Read reviews from real people and know you’re getting the best</p>
					</div>
				</div>
			</div>





			<div className="scroll-wrapper">
				<button className="scroll-btn left" onClick={() => scrollServices("left")}>‹</button>

				<div className="service-grid-container " id="service-scroll">
					<div className="service-card">
						<h3>Reformas</h3>
						<div className="card-actions">


						</div>
						<img src="https://cdn.pixabay.com/photo/2023/12/22/09/26/worker-8463424_1280.jpg" alt="Reformas" />

					</div>

					<div className="service-card">
						<img src="https://images.unsplash.com/photo-1643730530591-ea80de0a79e4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
						<h3>Jardinería</h3>
						<div className="card-actions">


						</div>
					</div>

					<div className="service-card">
						<img className="service-img " src="https://images.unsplash.com/photo-1580894908361-967195033215?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
						<h3>Desarrollador</h3>
						<div className="card-actions">


						</div>
					</div>

					<div className="service-card">
						<img src="" alt="" />
						<h3>Carpintería</h3>
						<div className="card-actions">
							<button className="learn-btn">Learn more</button>

						</div>
					</div>
				</div>

				<button className="scroll-btn right" onClick={() => scrollServices("right")}>›</button>
			</div>


			<div className="published-projects ">

				<h2>Latest published projects</h2>
				<div className="">

					<nav >
						<ul class="pagination">
							<li class="page-item">
								<a class="page-link" href="#" aria-label="Previous">
									<span aria-hidden="true">&laquo;</span>
								</a>
							</li>
							<li class="page-item active"><a class="page-link" href="#">1</a></li>
							<li class="page-item "><a class="page-link" href="#">2</a></li>
							<li class="page-item"><a class="page-link" href="#">3</a></li>
							<li class="page-item"><a class="page-link" href="#">4</a></li>
							<li class="page-item"><a class="page-link" href="#">5</a></li>
							<li class="page-item">
								<a class="page-link" href="#" aria-label="Next">
									<span aria-hidden="true">&raquo;</span>
								</a>
							</li>
						</ul>
					</nav>

				</div>

				<div className="published_cards">
					<div className="card published_card mb-3" >
						<div class="card-body">
							<h5 class="card-tittle">Build bbq</h5>
							<p class="custom-text">Building</p>
							<p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non .</p>

						</div>
					</div>


					<div className="card  published_card mb-3" >
						<div class="card-body">
							<h5 class="card-tittle">Build bbq</h5>
							<p class="custom-text">Building</p>
							<p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non .</p>

						</div>
					</div>

					<div className="card published_card mb-3" >
						<div class="card-body">
							<h5 class="card-tittle">Build bbq</h5>
							<p class="custom-text">Building</p>
							<p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non .</p>

						</div>
					</div>

					<div className="card  published_card mb-3" >
						<div class="card-body">
							<h5 class="card-title">Build bbq</h5>
							<p class="custom-text">Building</p>
							<p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non .</p>

						</div>
					</div>




				</div>

			</div>

			<div className="row mb-4 ">


				<div className="col-md-12 col-sm-12 col-lg-4 d-flex justify-content-center py-4">
					<div className="card card_how_works border-2 border-primary-subtle">
						<div className="card-body y text-center">
							<Search className="w-16 h-16 text-gray-600 mb-3 custom-icon " />
							<h5 className="card-title">Discover What’s Out There</h5>
							<p className="card-text">Search Star Gig’s universe of talent & opportunities</p>
						</div>
					</div>
				</div>

				<div className="col-md-12 col-sm-12 col-lg-4 d-flex justify-content-center py-4">
					<div className="card card_how_works border-2 border-primary-subtle">
						<div className="card-body text-center">
							<ClipboardList className="w-16 h-16 text-gray-600 mb-3 custom-icon" />
							<h5 className="card-tittle">Find Your Orbit</h5>
							<p className="card-text">Narrow results by skills, languages, or reviews</p>
						</div>
					</div>
				</div>

				<div className="col-md-12 col-sm-12 col-lg-4 d-flex justify-content-center py-4">
					<div className="card card_how_works border-2 border-primary-subtle">
						<div className="card-body text-center">
							<Monitor className="w-16 h-16 text-gray-600 mb-3 custom-icon" />
							<h5 className="card-tittle">Orbit with Peace of Mind</h5>
							<p className="card-text">Safe payments, clear communication, and stellar results</p>
						</div>
					</div>
				</div>
			</div>



		</div>
	);
}; 