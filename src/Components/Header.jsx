import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css"; 
import logo from "../images/logo.png"
import Signup from "./Signup";
import Login from "./Login";

const Header = () => {
 

  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="Jewelry Logo" />
      </div>

      <nav className="nav-links">
        <Link to="/">Signup</Link>
        <Link to="/">Login</Link>
      </nav>

      
    </header>
  );
};

export default Header;


