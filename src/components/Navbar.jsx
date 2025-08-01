// components/Navbar.jsx

import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from '../assets/logo.svg'; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 960);
  const [activeLink, setActiveLink] = useState('home');
  const [hoverStates, setHoverStates] = useState({});

  const handleMouseEnter = (item) => setHoverStates(prev => ({ ...prev, [item]: true }));
  const handleMouseLeave = (item) => setHoverStates(prev => ({ ...prev, [item]: false }));
  
  const handleLinkClick = (link) => {
    setActiveLink(link);
    setIsOpen(false);
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth <= 960);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const linkStyle = (linkName) => ({
    ...styles.navLink,
    ...(hoverStates[linkName] && styles.navLinkHover),
    ...(activeLink === linkName && styles.navLinkActive),
  });
  
  const navMenuStyle = { ...styles.navMenu, ...(isMobileView && styles.navMenuMobile), ...(isMobileView && isOpen && styles.navMenuMobileActive) };
  const logoStyle = { ...styles.logoImg, ...(hoverStates.logo && styles.logoImgHover) };
  const buyBtnStyle = { ...styles.navBtnLink, ...(hoverStates.buyBtn && styles.navBtnLinkHover) };

  return (
    <nav style={styles.navbar}>
      <div style={styles.navbarContainer}>
        <a href="#home" style={styles.logoContainer} onClick={() => handleLinkClick('home')} onMouseEnter={() => handleMouseEnter('logo')} onMouseLeave={() => handleMouseLeave('logo')}>
          <img src={logo} alt="Treveda Logo" style={logoStyle} />
        </a>
        {isMobileView && ( <div style={styles.menuIcon} onClick={toggleMenu}> {isOpen ? <FaTimes /> : <FaBars />} </div> )}
        <ul style={navMenuStyle}>
          <li style={isMobileView ? styles.navItemMobile : styles.navItem}> <a href="#about" style={linkStyle('about')} onClick={() => handleLinkClick('about')} onMouseEnter={() => handleMouseEnter('about')} onMouseLeave={() => handleMouseLeave('about')}>About</a> </li>
          <li style={isMobileView ? styles.navItemMobile : styles.navItem}> <a href="#products" style={linkStyle('products')} onClick={() => handleLinkClick('products')} onMouseEnter={() => handleMouseEnter('products')} onMouseLeave={() => handleMouseLeave('products')}>Products</a> </li>
          <li style={isMobileView ? styles.navItemMobile : styles.navItem}> <a href="#contact" style={linkStyle('contact')} onClick={() => handleLinkClick('contact')} onMouseEnter={() => handleMouseEnter('contact')} onMouseLeave={() => handleMouseLeave('contact')}>Contact</a> </li>
          <li style={isMobileView ? styles.navItemMobile : styles.navItem}> <a href="https://wa.me/91XXXXXXXXXX" style={buyBtnStyle} target="_blank" rel="noopener noreferrer" onMouseEnter={() => handleMouseEnter('buyBtn')} onMouseLeave={() => handleMouseLeave('buyBtn')}>Buy Now</a> </li>
        </ul>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    background: 'linear-gradient(to right, #d2dcceff, #417e56ff)',

    height: '85px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1.1rem',
    // --- THE FIX IS HERE ---
    position: 'fixed', // Changed from 'sticky' to 'fixed' for robust positioning
    // -----------------------
    top: 0,
    left: 0, // Ensure it spans the full width
    width: '100%', // Ensure it spans the full width
    zIndex: 1000,
    fontFamily: "'Montserrat', sans-serif",
    borderBottom: '1px solid rgba(0, 0, 0, 0.07)',
    boxShadow: '0 8px 27px rgba(0, 121, 107, 0.1)',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
  },
  // ... all other styles remain the same
  navbarContainer: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%', width: '100%', maxWidth: '1300px', padding: '0 30px' },
  logoContainer: { display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: '10px 0' },
  logoImg: { height: '98px', width: 'auto', mixBlendMode: 'multiply', transition: 'transform 0.3s ease' },
  logoImgHover: { transform: 'scale(1.08)' },
  menuIcon: { display: 'block', position: 'absolute', top: '0', right: '0', transform: 'translate(-100%, 70%)', fontSize: '1.8rem', cursor: 'pointer', color: '#080a0bff' },
  navMenu: { display: 'flex', alignItems: 'center', listStyle: 'none', textAlign: 'center', gap: '2rem', margin: 0, padding: 0 },
  navItem: { height: '85px', display: 'flex', alignItems: 'center' },
  navLink: { color: '#111314ff', textDecoration: 'none', padding: '0.5rem 1rem', fontWeight: 500, transition: 'all 0.3s ease-out', borderBottom: '2px solid transparent' },
  navLinkHover: { color: '#000000', transform: 'translateY(-2px)' },
  navLinkActive: { color: '#000000', fontWeight: '700' },
  navBtnLink: { padding: '12px 24px', borderRadius: '50px', background: 'linear-gradient(45deg, #004d40, #00796b)', color: '#fff', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease-out', textDecoration: 'none', fontWeight: 600 },
  navBtnLinkHover: { background: '#009688', transform: 'translateY(-3px) scale(1.05)', boxShadow: '0 8px 20px rgba(0, 150, 136, 0.4)' },
  navMenuMobile: { flexDirection: 'column', width: '100%', height: 'calc(100vh - 85px)', position: 'fixed', top: '85px', left: '-100%', opacity: 0, transition: 'all 0.5s ease', background: '#ffffff', gap: '1.5rem', paddingTop: '2rem' },
  navMenuMobileActive: { left: 0, opacity: 1 },
  navItemMobile: { width: '100%' },
};

export default Navbar;