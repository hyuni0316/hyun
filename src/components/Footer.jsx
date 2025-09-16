import React from 'react';

const Footer = () => {

  return (
    <footer className="footer">
      <div className="footer-container">
        <p>© {new Date().getFullYear()} Hyun Lee. All rights reserved.</p>
        <p>Last updated: 2025.05.12</p>
      </div>
    </footer>
  );
};

export default Footer; 