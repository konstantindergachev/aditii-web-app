import React from 'react';
import './Footer.css';

const Footer = () => {
  return <footer className="footer">Copyright © {new Date().toISOString().split('-')[0]}</footer>;
};

export default Footer;
