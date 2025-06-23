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
          src="https://picsum.photos/500/250"
          alt="Freelancer platform hero"
        />
        <h1 className="title">Find professionals for your projects</h1>

      </div>

      {/* Features section */}
      <div className="features-content container">
        <div className="content-wrapper features-section">
          <div className="feature-box">
            <span className="fa-solid fa-lightbulb fa-10x"></span>
            <h3>You don’t need to do it all yourself</h3>
            <p>Focus on what you do best & get more done with our professionals</p>
          </div>

          <div className="feature-box">
            <span className="fa-regular fa-id-card fa-10x"></span>
            <h3>Don’t regret a bad hire</h3>
            <p></p>
            <p>Read reviews from real people and know you’re getting the best professionals</p>
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
            { title: "Education and Training", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgsG4PyXxrJw6LM0zOkoXXy4ciwrcHUb7JMg&s" },
            { title: "Design and Creativity", img: "https://skye-studio.com/wp-content/uploads/2023/04/5-Steps-to-Design-Your-Career-Using-Design-Thinking-1024x585.jpg" },
            { title: "Technology and Development", img: "https://images.unsplash.com/photo-1580894908361-967195033215?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
            { title: "Health and Wellness", img: "https://img.freepik.com/foto-gratis/doctor-estetoscopio-cerca_23-2149191355.jpg?semt=ais_hybrid&w=740" },
            { title: "Marketing and Sales", img: "https://demandscience.com/wp-content/uploads/2024/05/feature-image_sales-and-marketing-dont-always-meet-eye-to-eye.jpg" },
            { title: "Administration and Office", img: "https://img.freepik.com/foto-gratis/especialista-incorporacion-al-centro-llamadas-tutoria-interno-sobre-como-usar-sistema-csm_482257-117972.jpg?semt=ais_hybrid&w=740" },
            { title: "Legal and Financial Services", img: "https://www.rug.nl/rechten/images/shutterstock-financial-law.jpg" },
            { title: "Logistics and Transportation", img: "https://www.monedaunica.net/wp-content/uploads/2023/07/el-sector-de-la-logistica-y-transporte-motor-de-la-economia-espanola.jpg" },
            { title: "Hospitality and Event", img:"https://media.istockphoto.com/id/1468499951/es/foto/manos-juntas-de-m%C3%A9dicos-y-enfermeras-en-el-trabajo-en-equipo-de-atenci%C3%B3n-m%C3%A9dica-solidaridad-y.jpg?s=612x612&w=0&k=20&c=0hptFwiJ6douSjkTV4jzH69fAZz751m2AzrZ8hF11ag=" },

            
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
        <h2 className="text-center m-5">Latest published projects</h2>

        <div className="container">
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