import React, { useEffect } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import styles from "../../front/landing.css"

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
		<div className="container-one">
			<div className="image-wrapper">
				<img src="https://www.sim-prom.com/assets/img-temp/900x600/img1.jpg" alt="Random Image" />
				<h1 className="title">Get more dates with Freelancers</h1>
				<input type="text" className="search-input" placeholder="Search Any Services" />
			</div>


			<div class="features-section">
				<div class="feature-box">
					<span className="fa-solid fa-lightbulb fa-10x  " />
					<h3>You don’t need to do it all yourself</h3>
					<p>Spend more time on what you do best & start getting more done</p>
				</div>

				<div class="feature-box">
					<span class="fa-regular fa-id-card fa-10x" />
					<h3>Don’t regret a bad hire</h3>
					<p>Read reviews from real people and know you’re getting the best</p>
				</div>
			</div>






			<div className="scroll-wrapper">
				<button className="scroll-btn left" onClick={() => scrollServices("left")}>‹</button>

				<div className="service-grid-container " id="service-scroll">
					<div className="service-card">
						<h3>Reformas</h3>
						<div className="card-actions">
							<button className="learn-btn">Learn more</button>
							<button className="star-btn">⭐</button>
						</div>
						<img src="https://cdn.pixabay.com/photo/2023/12/22/09/26/worker-8463424_1280.jpg" alt="Reformas" />
						
					</div>

					<div className="service-card">
						<img src="https://images.unsplash.com/photo-1643730530591-ea80de0a79e4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
						<h3>Jardinería</h3>
						<div className="card-actions">
							<button className="learn-btn">Learn more</button>
							<button className="star-btn">⭐</button>
						</div>
					</div>

					<div className="service-card">
						<img  className="service-img "src="https://images.unsplash.com/photo-1580894908361-967195033215?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
						<h3>Desarrollador</h3>
						<div className="card-actions">
							<button className="learn-btn">Learn more</button>
							<button className="star-btn">⭐</button>
						</div>
					</div>

					<div className="service-card">
						<img src="" alt="" />
						<h3>Carpintería</h3>
						<div className="card-actions">
							<button className="learn-btn">Learn more</button>
							<button className="star-btn">⭐</button>
						</div>
					</div>
				</div>

				<button className="scroll-btn right" onClick={() => scrollServices("right")}>›</button>
			</div>
		</div>
	);
}; 