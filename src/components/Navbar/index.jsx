import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">Hyun Lee</Link>
        </div>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">About Me</Link>
          </li>
          <li className="nav-item">
            <Link to="/publications" className="nav-link">Publications</Link>
          </li>
          <li className="nav-item">
            <Link to="/projects" className="nav-link">Projects</Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-link">Contact</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar; 