import { useState, useEffect } from "react";
import { getPosts } from "../services/PostServices.jsx";
import { getCategories } from "../services/CategoryServices.jsx";

export const LatestPosts = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
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
    fetchAllData();
  }, []);

  // Map category IDs to names
  const categoryMap = categories.reduce((acc, cat) => {
    acc[cat.id] = cat.name;
    return acc;
  }, {});

  // Calculate pagination
  const totalPages = Math.ceil(posts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedPosts = posts.slice(startIndex, endIndex);

  if (loading) return <div className="container text-center my-5">Loading...</div>;
  if (error) return <div className="container text-center my-5">Error: {error}</div>;

  return (
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
      {/* Simple pagination */}
      <div className="row mt-4">
        <div className="col-12 d-flex justify-content-center">
          <nav>
            <ul className="pagination">
              <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  &laquo; Prev
                </button>
              </li>
              <li className="page-item">
                <span className="page-link">
                  Page {currentPage} of {totalPages}
                </span>
              </li>
              <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next &raquo;
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};