import React from "react";
import "../styles/landing.css";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
function Landing() {
  const navigate = useNavigate();
  return (
    <div className="landing">
      <Navbar />
      <div className="landing-header">
        <div className="center">
          <h1>
            <span>Track Your Progress. Smash Your Goals. </span>
            <span>Track Your Progress. Smash Your Goals.</span>
            <span>Track Your Progress. Smash Your Goals.</span>
          </h1>
        </div>
      </div>
      <div className="main-content">
        <button onClick={() => navigate("/register")}>
          Track Your Workouts Now
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  );
}

export default Landing;
