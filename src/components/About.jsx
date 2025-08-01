// components/About.jsx

import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { FaLeaf, FaShieldAlt, FaGlobeEurope } from 'react-icons/fa';

// === Update path to your video and leaf image ===
import adVideo from '../assets/viedo.mp4';
import leafImage from '../assets/leave.webp';

const About = () => {
  // NEW: State to track if the view is mobile
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 960);

  // NEW: Effect to listen for window resize
  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth <= 960);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1, // Trigger animation sooner on mobile
  });

  // --- Dynamic styles for animations and responsiveness ---
  const mainWrapperStyle = {
    ...styles.mainWrapper,
    ...(isMobileView && styles.mainWrapperMobile), // Apply mobile styles
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(50px)',
  };

  const headingStyle = {
    ...styles.heading,
    ...(isMobileView && styles.headingMobile), // Apply mobile heading styles
  };

  const leaf1Style = { ...styles.leaf, ...styles.leaf1, ...(isMobileView && styles.leaf1Mobile) };
  const leaf2Style = { ...styles.leaf, ...styles.leaf2, ...(isMobileView && styles.leaf2Mobile) };


  return (
    <section ref={ref} style={{...styles.sectionContainer, ...(isMobileView && styles.sectionContainerMobile)}} id="about">
      <div style={mainWrapperStyle}>
        
        <div style={styles.textContainer}>
          <h2 style={headingStyle}>Rooted in Purity, Crafted with Care.</h2>
          <p style={styles.paragraph}>
            At Treveda, we believe beauty is not made, but cultivated. We journey to the purest sources, selecting potent herbs and botanicals that have nourished for centuries. Our craft is in the gentle alchemy of blending this timeless wisdom with modern efficacy to create rituals that reveal your most radiant self.
          </p>
          <div style={styles.valuesContainer}>
            <div style={styles.valueItem}>
              <FaLeaf style={styles.icon} />
              <div>
                <h4 style={styles.valueTitle}>100% Natural</h4>
                <p style={styles.valueText}>Pure, potent ingredients, with no harsh chemicals.</p>
              </div>
            </div>
            <div style={styles.valueItem}>
              <FaShieldAlt style={styles.icon} />
              <div>
                <h4 style={styles.valueTitle}>Cruelty-Free</h4>
                <p style={styles.valueText}>Ethical practices that respect all living beings.</p>
              </div>
            </div>
            <div style={styles.valueItem}>
              <FaGlobeEurope style={styles.icon} />
              <div>
                <h4 style={styles.valueTitle}>Sustainably Sourced</h4>
                <p style={styles.valueText}>Nourishing you, while respecting our planet.</p>
              </div>
            </div>
          </div>
        </div>

        <div style={styles.videoContainer}>
          <img src={leafImage} alt="Decorative Leaf" style={leaf1Style} />
          <div style={styles.videoWrapper}>
            <video 
              style={styles.video}
              src={adVideo} 
              autoPlay 
              loop 
              muted 
              playsInline
            />
          </div>
          <img src={leafImage} alt="Decorative Leaf" style={leaf2Style} />
        </div>

      </div>
    </section>
  );
};

// --- STYLES OBJECT ---
const styles = {
  sectionContainer: {
    padding: '100px 40px',
    backgroundColor: '#F7F9F5',
    fontFamily: "'Montserrat', sans-serif",
    position: 'relative',
    zIndex: 1,
    overflow: 'hidden',
  },
  sectionContainerMobile: { // NEW
    padding: '60px 20px',
  },
  mainWrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: '60px',
    maxWidth: '1200px',
    margin: '0 auto',
    alignItems: 'center',
    transition: 'opacity 1s ease-out, transform 1s ease-out',
  },
  mainWrapperMobile: { // NEW
    flexDirection: 'column', // Stacks columns vertically on mobile
    gap: '40px',
  },
  // --- Left Column Styles ---
  textContainer: {
    flex: 1,
    textAlign: 'left',
  },
  heading: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '3.2rem',
    fontWeight: '700',
    color: '#344e41',
    marginBottom: '25px',
    lineHeight: 1.3,
  },
  headingMobile: { // NEW
    fontSize: '2.5rem',
    textAlign: 'center',
  },
  paragraph: {
    fontSize: '1.1rem',
    lineHeight: 1.8,
    color: '#588157',
    marginBottom: '40px',
  },
  valuesContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '25px',
  },
  valueItem: { display: 'flex', alignItems: 'flex-start', gap: '20px' },
  icon: { fontSize: '2rem', color: '#344e41', marginTop: '5px' },
  valueTitle: { fontWeight: '700', fontSize: '1.1rem', color: '#344e41', marginBottom: '5px' },
  valueText: { fontSize: '0.95rem', lineHeight: 1.6, color: '#588157' },
  // --- Right Column Styles ---
  videoContainer: {
    flex: 1,
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoWrapper: {
    width: '100%',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.2)',
    position: 'relative',
    zIndex: 2,
  },
  video: { width: '100%', height: 'auto', display: 'block' },
  // Decorative leaves
  leaf: {
    position: 'absolute',
    zIndex: 3,
    filter: 'blur(1px)',
    opacity: 0.8,
  },
  leaf1: {
    width: '150px',
    top: '-50px',
    left: '-60px',
    transform: 'rotate(-20deg)',
  },
  leaf2: {
    width: '180px',
    bottom: '-70px',
    right: '-80px',
    transform: 'rotate(160deg)',
  },
  // NEW: Repositioned leaves for mobile
  leaf1Mobile: { 
    width: '100px',
    top: '-30px',
    right: '-30px',
    left: 'auto', // override desktop style
  },
  leaf2Mobile: {
    width: '120px',
    bottom: '-40px',
    left: '-50px',
    right: 'auto', // override desktop style
  },
};

export default About;