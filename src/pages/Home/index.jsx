import { Suspense, lazy, useState } from "react";
import Loader from "../../components/Loader";
import "./Home.css";
import { blogs, introBlogs } from "../../StaticData";
const BlogCard = lazy(() => import("../../components/BlogCard"));

function Home() {
  const [activeBlog, setActiveBlog] = useState(null);

  return (
    <div className="home-container">
      <h1 className="home-title">Home</h1>

      {/* Quick Links */}
      <div className="blog-grid intro-grid">
        {introBlogs.map((blog) => (
          <Suspense fallback={<Loader />} key={blog.id}>
            <BlogCard {...blog} variant="intro" />
          </Suspense>
        ))}
      </div>

      {/* Latest Posts */}
      <h2 className="section-title latest-title">Latest Posts</h2>
      <div className="blog-grid latest-grid">
        {blogs.map((blog) => (
          <Suspense fallback={<Loader />} key={blog.id}>
            <BlogCard
              {...blog}
              variant="latest"
              onReadMore={() => setActiveBlog(blog)}
            />
          </Suspense>
        ))}
      </div>

      {/* Modal */}
      {activeBlog && (
        <div className="modal-overlay" onClick={() => setActiveBlog(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {activeBlog.date && (
              <p className="blog-card-date">{activeBlog.date}</p>
            )}
            {activeBlog.author && (
              <p className="blog-card-author">
                <strong>Author:</strong> {activeBlog.author}
              </p>
            )}
            {activeBlog.category && (
              <p className="blog-card-category">
                <strong>Category:</strong> {activeBlog.category}
              </p>
            )}
            {activeBlog.tags && activeBlog.tags.length > 0 && (
              <p className="blog-card-tags">
                <strong>Tags:</strong> {activeBlog.tags.join(", ")}
              </p>
            )}

            <h2>{activeBlog.title}</h2>
            <p>{activeBlog.fullText}</p>
            <button className="close-btn" onClick={() => setActiveBlog(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
