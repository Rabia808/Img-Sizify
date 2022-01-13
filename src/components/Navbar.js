import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <>
      <div className="navbar">
        <div className="title">
          <h1 className="title-first-letter title">I</h1>
          <h3 className="title-name title">mg Sizify</h3>
        </div>

        <button className="home-btn">
          <img
            className="home-img title"
            src="https://img.icons8.com/ios-filled/50/000000/home.png"
            alt="Home"
          />
        </button>
      </div>
    </>
  );
};

export default Navbar;
