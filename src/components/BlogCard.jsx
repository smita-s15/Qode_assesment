import React from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

function BlogCard({ date, title, description, variant, onReadMore }) {
  return (
    <div className="blog-card">
      {date && <p className="blog-card-date">{date}</p>}
      <div className="blog-card-title">
        <h3 className="blog-card-title">{title}</h3>{" "}
        {variant === "intro" && (
          <a href="#" className="blog-card-link">
            <Link
              to="#"
              target="_blank"
              rel="noopener noreferrer"
              className="blog-card-link"
            >
              <FaExternalLinkAlt />
            </Link>
          </a>
        )}
      </div>
      <p className="blog-card-desc">{description}</p>

      {variant === "latest" && (
        <div className="blog-card-footer">
          <div onClick={onReadMore} className="read-more">
            Read Full Post
          </div>
        </div>
      )}
    </div>
  );
}

export default BlogCard;
