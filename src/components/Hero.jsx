// components/Hero.jsx

import React, { useState, useEffect } from 'react';

// Using your leaf image, which will be duplicated for the animation
import leafImage from '../assets/leave.webp';
// NEW: Importing the background texture image
import bgImage from '../assets/image.jpg';

// Helper component to inject our complex animations
const KeyframeStyles = () => (
  <style>
    {`
      /* --- The "Herbal Ballet" Animations --- */
      @keyframes twirlAndSettleLeaf1 {
        0% { opacity: 0; transform: translate(-20vw, 15vh) scale(0.5) rotate(-180deg); }
        60% { opacity: 1; transform: translate(18vw, -12vh) scale(1) rotate(20deg); }
        100% { opacity: 1; transform: translate(18vw, -12vh) scale(1) rotate(20deg); }
      }
      @keyframes twirlAndSettleLeaf2 {
        0% { opacity: 0; transform: translate(25vw, -20vh) scale(0.6) rotate(90deg); }
        60% { opacity: 1; transform: translate(-22vw, 15vh) scale(0.9) rotate(-30deg); }
        100% { opacity: 1; transform: translate(-22vw, 15vh) scale(0.9) rotate(-30deg); }
      }
      @keyframes twirlAndSettleLeaf3 {
        0% { opacity: 0; transform: translate(5vw, 30vh) scale(0.7) rotate(0deg); }
        60% { opacity: 1; transform: translate(5vw, 20vh) scale(0.8) rotate(70deg); }
        100% { opacity: 1; transform: translate(5vw, 20vh) scale(0.8) rotate(70deg); }
      }
      @keyframes twirlAndSettleLeaf4 {
        0% { opacity: 0; transform: translate(-25vw, -20vh) scale(0.6) rotate(-90deg); }
        60% { opacity: 1; transform: translate(-15vw, -15vh) scale(1) rotate(180deg); }
        100% { opacity: 1; transform: translate(-15vw, -15vh) scale(1) rotate(180deg); }
      }
      @keyframes twirlAndSettleLeaf5 {
        0% { opacity: 0; transform: translate(20vw, 20vh) scale(0.5) rotate(180deg); }
        60% { opacity: 1; transform: translate(22vw, 10vh) scale(0.9) rotate(-20deg); }
        100% { opacity: 1; transform: translate(22vw, 10vh) scale(0.9) rotate(-20deg); }
      }
      /* --- Simpler animations for mobile --- */
      @keyframes fadeInLeafMobile {
        0% { opacity: 0; transform: scale(0.8); }
        60% { opacity: 1; transform: scale(1); }
        100% { opacity: 1; transform: scale(1); }
      }
    `}
  </style>
);

const Hero = () => {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 800);

  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth <= 800);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const title = "TREVEDA";
  
  const headlineStyle = {
    ...styles.headline,
    ...(isMobileView && styles.headlineMobile),
  };

  return (
    <>
      <KeyframeStyles />
      <section style={styles.heroSection}>
        <div style={styles.animationContainer}>
          <img src={leafImage} alt="Floating Leaf" style={{...styles.leaf, ...styles.leaf1, animationName: isMobileView ? 'fadeInLeafMobile' : 'twirlAndSettleLeaf1'}} />
          <img src={leafImage} alt="Floating Leaf" style={{...styles.leaf, ...styles.leaf2, animationName: isMobileView ? 'fadeInLeafMobile' : 'twirlAndSettleLeaf2'}} />
          <img src={leafImage} alt="Floating Leaf" style={{...styles.leaf, ...styles.leaf3, animationName: isMobileView ? 'fadeInLeafMobile' : 'twirlAndSettleLeaf3'}} />
          <img src={leafImage} alt="Floating Leaf" style={{...styles.leaf, ...styles.leaf4, animationName: isMobileView ? 'fadeInLeafMobile' : 'twirlAndSettleLeaf4'}} />
          <img src={leafImage} alt="Floating Leaf" style={{...styles.leaf, ...styles.leaf5, animationName: isMobileView ? 'fadeInLeafMobile' : 'twirlAndSettleLeaf5'}} />
        </div>
        <div style={styles.heroContent}>
          <h1 style={headlineStyle}>
            {title}
          </h1>
          <p style={styles.tagline}>
            Harnessing the potent alchemy of ancient herbs and botanicals, we bring you meticulously crafted rituals for a radiance that is purely, powerfully yours.
          </p>
        </div>
      </section>
    </>
  );
};

// --- STYLES OBJECT ---
const styles = {
  heroSection: {
    height: '100vh',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    zIndex: 1,
    overflow: 'hidden',
    fontFamily: "'Montserrat', sans-serif",
    // --- UPDATED BACKGROUND ---
    // This layers your semi-transparent gradient OVER the new texture image.
    backgroundImage: `linear-gradient(to bottom, rgba(233, 245, 225, 0.0), rgba(127, 191, 133, 0.2), rgba(146, 255, 184, 0.3)), url(${bgImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    // -------------------------
  },
  animationContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '1px',
    height: '1px',
  },
  leaf: {
    position: 'absolute',
    opacity: 0,
    animationDuration: '10s',
    animationFillMode: 'forwards',
    animationTimingFunction: 'cubic-bezier(0.3, 0, 0.3, 1)',
    animationIterationCount: 'infinite',
  },
  leaf1: { width: '150px', animationDelay: '0s' },
  leaf2: { width: '100px', animationDelay: '0.5s' },
  leaf3: { width: '120px', animationDelay: '1s' },
  leaf4: { width: '90px', animationDelay: '1.5s' },
  leaf5: { width: '130px', animationDelay: '2s' },
  heroContent: {
    position: 'relative',
    zIndex: 10,
    textAlign: 'center',
    maxWidth: '800px',
    padding: '20px',
  },
  headline: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '7rem',
    fontWeight: '700',
    color: '#010101ff',
    textTransform: 'uppercase',
    letterSpacing: '1rem',
    lineHeight: 1,
    margin: '0 0 30px 0',
    transition: 'font-size 0.3s ease, letter-spacing 0.3s ease',
  },
  headlineMobile: {
    fontSize: '3rem',
    letterSpacing: '0.5rem',
  },
  tagline: {
    fontSize: '1.1rem',
    color: '#211e1eff',
    lineHeight: 1.8,
    maxWidth: '600px',
    margin: '0 auto',
  },
};

export default Hero;