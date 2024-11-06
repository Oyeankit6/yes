import React from "react";
import { assets } from "../../../public/assets/assets";
import "./hader.css";

const Header = () => {
  return (
    <>
      <div className="header-top">
        <div className="logo-container">
          <img src={assets.logo} alt="Logo" className="logo-image" />
        </div>
        <div className="header-title">Open with an App</div>
        <div className="download-icon">&#x1F4E5;</div>{" "}
        {/* Download icon Unicode */}
      </div>

      <div className="header-bottom">
        <p className="header-para">Welcome Back</p>
        <p>Quality Guarantee</p>
      </div>
    </>
  );
};

export default Header;
