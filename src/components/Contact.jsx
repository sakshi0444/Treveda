// components/ContactForm.jsx

import React, { useState, useEffect } from 'react';
import { FaWhatsapp, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

// Helper component to inject styles for input :focus
const FormInteractionStyles = () => (
  <style>{`
    .form-input:focus {
      border-bottom-color: #34D399; /* The vibrant green accent */
      transform: translateY(-2px);
    }
  `}</style>
);

const ContactForm = () => {
  // State for responsive design
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 800);
  // State to manage the form input fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  // State to manage the submission status (e.g., 'submitting', 'success', 'error')
  const [submissionStatus, setSubmissionStatus] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth <= 800);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handles changes in the input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handles the form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default page reload
    setSubmissionStatus('submitting');

    try {
      const response = await fetch('https://formsubmit.co/dosayasakshi35@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          _captcha: 'false', // We can still pass these settings
        }),
      });

      if (response.ok) {
        setSubmissionStatus('success');
        setFormData({ name: '', email: '', message: '' }); // Clear the form
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error(error);
      setSubmissionStatus('error');
    }
  };
  
  const buttonStyle = {
    ...styles.button,
    ...(submissionStatus === 'submitting' && { opacity: 0.7, cursor: 'wait' }),
  };

  return (
    <>
      <FormInteractionStyles />
      <section style={styles.sectionContainer} id="contact">
        <div style={{...styles.mainWrapper, flexDirection: isMobileView ? 'column' : 'row'}}>

          <div style={styles.infoPanel}>
            <h2 style={styles.heading}>Get In Touch</h2>
            <p style={styles.subheading}>
              Have a question or a special request? We'd love to hear from you. Reach out to us directly or fill out the form, and we'll get back to you shortly.
            </p>
            <div style={styles.contactDetails}>
               <a href="https://wa.me/91XXXXXXXXXX" style={styles.contactItem}>
                <FaWhatsapp style={styles.icon} />
                <span>+91 XXXXXXXXXX</span>
              </a>
              <a href="mailto:dosayasakshi35@gmail.com" style={styles.contactItem}>
                <FaEnvelope style={styles.icon} />
                <span>dosayasakshi35@gmail.com</span>
              </a>
            </div>
          </div>

          <div style={styles.formPanel}>
            <form onSubmit={handleSubmit} style={styles.form}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                style={styles.input}
                className="form-input"
                value={formData.name}
                onChange={handleInputChange}
                disabled={submissionStatus === 'submitting'}
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                style={styles.input}
                className="form-input"
                value={formData.email}
                onChange={handleInputChange}
                disabled={submissionStatus === 'submitting'}
              />
              <textarea
                name="message"
                placeholder="Your Message"
                rows="5"
                required
                style={{...styles.input, ...styles.textarea}}
                className="form-input"
                value={formData.message}
                onChange={handleInputChange}
                disabled={submissionStatus === 'submitting'}
              ></textarea>

              <button 
                type="submit" 
                style={buttonStyle}
                disabled={submissionStatus === 'submitting'}
              >
                {submissionStatus === 'submitting' ? 'Sending...' : 'Send Message'}
              </button>

              {/* Submission Status Messages */}
              {submissionStatus === 'success' && (
                <p style={styles.successMessage}>Thank you for your message! We'll get back to you soon.</p>
              )}
              {submissionStatus === 'error' && (
                <p style={styles.errorMessage}>Something went wrong. Please try again later.</p>
              )}
            </form>
          </div>

        </div>
      </section>
    </>
  );
};


// --- STYLES OBJECT with new "Deep Emerald & Cream" color palette ---
const styles = {
  sectionContainer: {
    padding: '100px 40px',
    backgroundColor: '#11201D',
    color: '#EFEAE2',
    fontFamily: "'Montserrat', sans-serif",
  },
  mainWrapper: {
    display: 'flex',
    gap: '60px',
    maxWidth: '1100px',
    margin: '0 auto',
    alignItems: 'flex-start',
  },
  infoPanel: { flex: 1 },
  heading: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '3rem',
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: '15px',
  },
  subheading: {
    fontSize: '1rem',
    lineHeight: 1.7,
    color: '#a3a39b',
    marginBottom: '40px',
  },
  contactDetails: { display: 'flex', flexDirection: 'column', gap: '20px' },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    color: '#EFEAE2',
    textDecoration: 'none',
    fontSize: '1rem',
  },
  icon: { fontSize: '1.5rem', color: '#34D399' },
  formPanel: { flex: 1.2 },
  form: { display: 'flex', flexDirection: 'column', gap: '25px' },
  input: {
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: '1px solid #4a5754',
    padding: '15px 5px',
    fontSize: '1rem',
    color: '#ffffff',
    outline: 'none',
    transition: 'border-color 0.3s ease, transform 0.3s ease',
  },
  textarea: { resize: 'vertical', minHeight: '100px' },
  button: {
    backgroundColor: '#34D399',
    color: '#11201D',
    padding: '16px',
    fontSize: '1rem',
    borderRadius: '50px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '700',
    marginTop: '10px',
    transition: 'all 0.3s ease-out',
  },
  // Status message styles
  successMessage: {
    color: '#34D399',
    marginTop: '15px',
    fontWeight: '600',
    textAlign: 'center',
  },
  errorMessage: {
    color: '#FF6B6B',
    marginTop: '15px',
    fontWeight: '600',
    textAlign: 'center',
  }
};

export default ContactForm;