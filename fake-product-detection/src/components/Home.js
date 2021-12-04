import React from "react";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <div className="name">
        <h1>DetectOP</h1>
      </div>
      <div className="search">
        <div className="productSearch">
          <input
            type="text"
            name="productId"
            id="productId"
            placeholder="Enter the product Id"
          />
        </div>
        <p>OR</p>
        <div className="scanCode">
          <input type="file" id="imag" accept="image/*" />
        </div>
      </div>
    </div>
  );
}

export default Home;
