import React, { useState } from "react";
import "../styles/navbar.css";
import Logo from "../assets/etrsitelogo.png";
import { Dropdown, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { RiCloseLine } from "react-icons/ri";
function Navbar() {
  const items = [
    {
      key: "1",
      label: <Link to={"/home"}>Track</Link>,
    },
    {
      key: "2",
      label: <Link to={"/exercises"}>Exercises</Link>,
    },
    {
      key: "3",
      label: (
        <span
          onClick={() => {
            localStorage.removeItem("workout-tracker-user");
            navigate("/login");
          }}
        >
          Logout
        </span>
      ),
    },
  ];
  const handleToggle = () => {
    setToggle(!toggle);
  };
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("workout-tracker-user"));
  if (localStorage.getItem("workout-tracker-user")) {
    return (
      <div className="account-bar navbar  ">
        <div className="logo">
          <a href="/">
            {" "}
            <img src={Logo} alt="" />
          </a>
        </div>
        <div className="content">
          <li>
            <Dropdown
              className="dropdown"
              menu={{
                items,
              }}
              placement="bottomLeft"
            >
              <Button className="user-btn">{user.name}</Button>
            </Dropdown>
          </li>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className={toggle ? "nav-color navbar expanded" : "nav-color navbar"}
      >
        <div className="logo">
          <a href="/">
            <img src={Logo} alt="" />
          </a>
        </div>
        <div className="toggle" onClick={handleToggle}>
          {toggle ? (
            <RiCloseLine className="icon" />
          ) : (
            <FaBars className="icon" />
          )}
        </div>
        <div className="content">
          <a href="/exercises">
            {" "}
            <li className="exercise-link">Find Exersises</li>
          </a>

          <li>
            <button onClick={() => navigate("/login")}>Start Tracking</button>
          </li>
        </div>
      </div>
    );
  }
}

export default Navbar;
