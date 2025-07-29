import React, { useState } from 'react';

const ContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState(''); // For success/error messages

  // Base URL for your Flask backend API - ensure this matches your App.js
  const API_BASE_URL = 'http://127.0.0.1:5000';

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setFeedbackMessage('Sending feedback...'); // Show loading message

    try {
      const response = await fetch(`${API_BASE_URL}/send_feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();

      if (response.ok) {
        setFeedbackMessage(data.message || 'Feedback sent successfully!');
        // Clear form fields on success
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setFeedbackMessage(data.error || 'Failed to send feedback. Please try again.');
      }
    } catch (error) {
      setFeedbackMessage('Network error. Could not connect to the server.');
      console.error('Error sending feedback:', error);
    }
  };

  return (
    // The container now focuses solely on the contact form content
    // as the global header/footer are handled by App.js
    <div style={styles.container}>
      <div style={styles.content}>
        <h2 style={styles.heading}>Contact Us</h2>
        <p style={styles.subheading}>We'd love to hear from you!</p>
        {/* Added email address here */}
        <p style={styles.emailDisplay}>
          You can also reach us directly at:{' '}
          <a href="mailto:224g1a0524@srit.ac.in" style={styles.emailLink}>
            224g1a0524@srit.ac.in
          </a>
        </p>

        <form style={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
            required
            onFocus={(e) => e.target.style.borderColor = styles.inputFocus.borderColor}
            onBlur={(e) => e.target.style.borderColor = styles.input.borderColor}
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
            onFocus={(e) => e.target.style.borderColor = styles.inputFocus.borderColor}
            onBlur={(e) => e.target.style.borderColor = styles.input.borderColor}
          />
          <textarea
            placeholder="Your Message"
            rows="5"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={styles.textarea}
            required
            onFocus={(e) => e.target.style.borderColor = styles.inputFocus.borderColor}
            onBlur={(e) => e.target.style.borderColor = styles.textarea.borderColor}
          ></textarea>
          <button type="submit" style={styles.button}>Send Message</button>
        </form>

        {feedbackMessage && (
          <p style={{
            ...styles.feedbackMessage,
            color: feedbackMessage.includes('successfully') ? '#92fe9d' : '#e74c3c' // Green for success, red for error
          }}>
            {feedbackMessage}
          </p>
        )}
      </div>
    </div>
  );
};

// Styles object for the component
const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    width: '100%',
    boxSizing: 'border-box',
    minHeight: 'calc(100vh - 10rem)', // Adjust to fill space not taken by global header/footer
  },
  content: {
    maxWidth: '600px',
    width: '100%',
    background: 'rgba(255, 255, 255, 0.08)',
    borderRadius: '20px',
    padding: '40px',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(8px)',
    textAlign: 'center',
    animation: 'fadeInUp 0.8s ease-out forwards',
  },
  heading: {
    fontSize: '2.5rem',
    textAlign: 'center',
    marginBottom: '10px',
    color: '#00c6ff',
    textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
  },
  subheading: {
    fontSize: '1.1rem',
    textAlign: 'center',
    marginBottom: '15px', // Adjusted margin
    color: '#e0e0e0',
  },
  emailDisplay: { // New style for the email text
    fontSize: '1.05rem',
    color: '#f0f0f0',
    marginBottom: '30px', // Adjusted margin to separate from form
  },
  emailLink: { // New style for the email link
    color: '#92fe9d', // A contrasting color for the link
    textDecoration: 'underline',
    fontWeight: 'bold',
    transition: 'color 0.3s ease',
    '&:hover': {
      color: '#00c6ff', // Hover effect for the email link
    },
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  input: {
    padding: '1rem 1.2rem',
    borderRadius: '10px',
    border: '1px solid rgba(255,255,255,0.3)',
    backgroundColor: 'rgba(255,255,255,0.15)',
    color: '#fff',
    fontSize: '1rem',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
    transition: 'border-color 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease',
  },
  inputFocus: {
    borderColor: '#00c6ff',
    backgroundColor: 'rgba(255,255,255,0.25)',
    boxShadow: '0 0 10px rgba(0, 198, 255, 0.4)',
  },
  textarea: {
    padding: '1rem 1.2rem',
    borderRadius: '10px',
    border: '1px solid rgba(255,255,255,0.3)',
    backgroundColor: 'rgba(255,255,255,0.15)',
    color: '#fff',
    fontSize: '1rem',
    outline: 'none',
    resize: 'vertical', // Allow vertical resizing
    minHeight: '100px', // Minimum height for textarea
    width: '100%',
    boxSizing: 'border-box',
    transition: 'border-color 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease',
  },
  button: {
    padding: '1rem 1.5rem',
    borderRadius: '12px',
    border: 'none',
    backgroundColor: '#00c6ff',
    backgroundImage: 'linear-gradient(45deg, #00c6ff, #92fe9d)',
    color: '#2c3e50',
    fontWeight: 'bold',
    fontSize: '1.1rem',
    cursor: 'pointer',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    marginTop: '1rem',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
  },
  feedbackMessage: {
    marginTop: '1.5rem',
    fontSize: '1rem',
    fontWeight: 'bold',
    transition: 'color 0.3s ease',
  },
};

export default ContactPage;