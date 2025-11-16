import React from "react";
import bowlingLogo from "../assets/bowlinglogo.png";

const LoadingScreen: React.FC = () => {
  return (
    <div className="screen loading-screen">
      <div className="logo-center">
        <img
          src={bowlingLogo}
          alt="Strajk Bowling logo"
          className="logo-image"
        />
        <h1 className="brand-text">STRAJK</h1>
        <p className="brand-subtitle">BOWLING</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
