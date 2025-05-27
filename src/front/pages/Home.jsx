import React, { useEffect } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

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

	return (
		<div className="container1">
			<div className="image-wrapper">
				<img src="https://www.sim-prom.com/assets/img-temp/900x600/img1.jpg" alt="Random Image" />
				<h1 className="title">Get more dates with Freelancers</h1>
				<input type="text" className="search-input" placeholder="Search Any Services" />
			</div>


			<div class="features-section">
				<div class="feature-box">
					<span  className="fa-solid fa-lightbulb fa-10x  "/>
						<h3>You don’t need to do it all yourself</h3>
						<p>Spend more time on what you do best & start getting more done</p>
				</div>

				<div class="feature-box">
					<span class="fa-regular fa-id-card fa-10x"/>
						<h3>Don’t regret a bad hire</h3>
						<p>Read reviews from real people and know you’re getting the best</p>
				</div>
			</div>
			

		</div>
	);
}; 