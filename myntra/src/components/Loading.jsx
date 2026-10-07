import React from "react";

const Loading = () => {
  return (
    <div className="skeleton-grid">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <div key={i} className="skeleton-card">
          <div className="skeleton-img shimmer"></div>
          <div className="skeleton-text-container">
            <div className="skeleton-line shimmer" style={{ width: "40%", height: "14px" }}></div>
            <div className="skeleton-line shimmer" style={{ width: "80%", height: "18px" }}></div>
            <div className="skeleton-line shimmer" style={{ width: "60%", height: "14px" }}></div>
            <div className="skeleton-btn shimmer"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Loading;
