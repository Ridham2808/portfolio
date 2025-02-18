import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>Passionate about crafting innovative web experiences.</p>
        </div>
        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: ridham.patel.cg@gmail.com</p>
          <p>Phone: (+91) 8128281326</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Ridham Patel. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;