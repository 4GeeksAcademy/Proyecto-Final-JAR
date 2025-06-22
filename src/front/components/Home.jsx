import { useState, useEffect, useRef } from "react";
import { getPosts } from "../services/PostServices.jsx";
import { getCategories } from "../services/CategoryServices.jsx";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import "../../front/home.css";

export const ComponentHome = () => {
  // State management
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { dispatch } = useGlobalReducer();
  const containerRef = useRef(null);
  const itemsPerPage = 4;

  // Data fetching functions
  const loadMessage = async () => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file");


      const response = await fetch(`${backendUrl}/api/hello`);
      const data = await response.json();


      if (response.ok) {
        dispatch({ type: "set_hello", payload: data.message });
      }
    } catch (error) {
      console.error("Message load error:", error);
    }
  };

  const fetchAllData = async () => {
    try {
      const [postData, categoryData] = await Promise.all([
        getPosts(),
        getCategories()
      ]);
      setPosts(postData);
      setCategories(categoryData);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Effects
  useEffect(() => {
    loadMessage();
    fetchAllData();
  }, []);

  // DOM interaction handlers
  const scrollServices = (direction) => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: direction === "left" ? -250 : 250,
        behavior: "smooth"
      });
    }
  };

  // Data processing
  const categoryMap = categories.reduce((acc, cat) => {
    acc[cat.id] = cat.name;
    return acc;
  }, {});

  // Pagination calculations
  const totalPages = Math.ceil(posts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPosts = posts.slice(startIndex, startIndex + itemsPerPage);

  // Loading/error states
  if (loading) return <div className="container text-center my-5">Loading...</div>;
  if (error) return <div className="container text-center my-5">Error: {error}</div>;

  return (
    <div className="container-fluid container-all">
      {/* Hero section */}
      <div className="image-wrapper">
        <img
          src="https://picsum.photos/900/600"
          alt="Freelancer platform hero"
        />
        <h1 className="title">Get more dates with Freelancers</h1>
        <input 
          type="text" 
          className="search-input" 
          placeholder="Search Any Services" 
        />
      </div>

      {/* Features section */}
      <div className="features-content">
        <div className="content-wrapper features-section">
          <div className="feature-box">
            <span className="fa-solid fa-lightbulb fa-10x"></span>
            <h3>You don’t need to do it all yourself</h3>
            <p>Spend more time on what you do best & start getting more done</p>
          </div>

          <div className="feature-box">
            <span className="fa-regular fa-id-card fa-10x"></span>
            <h3>Don’t regret a bad hire</h3>
            <p>Read reviews from real people and know you’re getting the best</p>
          </div>
        </div>
      </div>

      {/* Services scroll */}
      <div className="scroll-wrapper">
        <button
          className="scroll-btn left"
          onClick={() => scrollServices("left")}
          aria-label="Scroll services left"
        >
          ‹
        </button>

        <div
          className="service-grid-container"
          id="service-scroll"
          ref={containerRef}
        >
          {[
            { title: "Education and Training", img: "https://cdn.pixabay.com/photo/2023/12/22/09/26/worker-8463424_1280.jpg" },
            { title: "Design and Creativity", img: "https://images.unsplash.com/photo-1643730530591-ea80de0a79e4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
            { title: "Technology and Development", img: "https://images.unsplash.com/photo-1580894908361-967195033215?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
            { title: "Health and Wellness", img: "https://www.prevengoprevencion.com/imgblog/387887704100c25896552d7adcd05f2c.png" },
            { title: "Marketing and Sales", img: "https://www.prevengoprevencion.com/imgblog/387887704100c25896552d7adcd05f2c.png" },
            { title: "Administration and Office", img: "https://www.prevengoprevencion.com/imgblog/387887704100c25896552d7adcd05f2c.png" },
            { title: "Legal and Financial Services", img: "https://www.prevengoprevencion.com/imgblog/387887704100c25896552d7adcd05f2c.png" },
            { title: "Logistics and Transportation", img: "https://www.prevengoprevencion.com/imgblog/387887704100c25896552d7adcd05f2c.png" },
             { title: "Hospitality and Event", img:"https://www.prevengoprevencion.com/imgblog/387887704100c25896552d7adcd05f2c.png" },


            
          ].map((service, index) => (
            <div key={index} className="service-card">
              <img
                src={service.img}
                alt={service.title}
                className="service-img"
              />
              <h3>{service.title}</h3>
              <div className="card-actions"></div>
            </div>
          ))}
        </div>

        <button
          className="scroll-btn right"
          onClick={() => scrollServices("right")}
          aria-label="Scroll services right"
        >
          ›
        </button>
      </div>

      <div className="published-projects">
        <h2>Latest published projects</h2>

        <div className="container">
          <div className="row findwork__row customCard">
            {paginatedPosts.map(post => (
              <div key={post.id} className="col-12 customCard">
                <div className="card findwork__card p-3 shadow-sm">
                  <div className="row findwork__row w-100 align-items-center">
                    <div className="col-lg-4 col-md-4 col-sm-6 d-flex justify-content-between">
                      <p className="customTittle">
                        {categoryMap[post.category_id] || "Unknown Category"}
                      </p>
                      <p>{post.project_city}, {post.project_country}</p>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-6 d-flex justify-content-between">
                      <p>📅 {post.post_date}</p>
                    </div>
                  </div>
                  <div className="row findwork__row">
                    <p className="col-12 customDescription">{post.post_description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <nav className="projects-pagination">
            <ul className="pagination-list">
              <li className={`pagination-item ${currentPage === 1 ? "disabled" : ""}`}>
                <button
                  className="pagination-button"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  &laquo;
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, i) => (
                <li key={i + 1} className={`pagination-item ${currentPage === i + 1 ? "active" : ""}`}>
                  <button
                    className="pagination-button"
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
              <li className={`pagination-item ${currentPage === totalPages ? "disabled" : ""}`}>
                <button
                  className="pagination-button"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  &raquo;
                </button>
              </li>
            </ul>
          </nav>

          {/* Projects Grid */}
          <div className="projects-grid">
            {paginatedPosts.map(post => (
              <div key={post.id} className="project-card">
                <div className="card-header">
                  <h3 className="card-title">{categoryMap[post.category_id] || "Unknown Category"}</h3>
                  <div className="card-meta">
                    <span>{post.project_city}, {post.project_country}</span>
                    <span className="meta-separator">|</span>
                    <span>📅 {post.post_date.split('T')[0] .split('-').reverse().join('-')}</span>
                  </div>
                </div>

                <div className="card-body">
                  <p className="card-description">{post.post_description}</p>
                </div>

                <div className="card-footer">
                  <button className="primary-button">View more</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};