import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

// Import your page components (they will now be content-only, no header/footer)
import WelcomePage from './WelcomePage'; // This will be your updated WelcomePage
import ContactPage from './ContactPage'; // This will be your updated ContactPage

// Main App component (formerly your index.jsx content)
const MainAppContent = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [currentAuthView, setCurrentAuthView] = useState('home'); // Manages views within the root path
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  // Dynamic styling for nav links on hover
  const [hoveredNav, setHoveredNav] = useState(null);

  const getNavLinkStyle = (linkName) => ({
    ...styles.navLink,
    ...(hoveredNav === linkName ? styles.navLinkHover : {}),
  });

  // Base URL for your Flask backend API
  const API_BASE_URL = 'http://127.0.0.1:5000'; // Ensure this matches your Flask server

  // Effect to clear messages after a few seconds for better UX
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 5000); // Message clears after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Function to handle Sign Up form submission
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear previous messages

    try {
      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setUsername('');
        setEmail('');
        setPassword('');
        setCurrentAuthView('signin'); // Automatically switch to sign-in view after successful signup
      } else {
        setMessage(data.error || 'Sign up failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during sign up:', error);
      setMessage('Network error or server is not running.');
    }
  };

  // Function to handle Sign In form submission
  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear previous messages

    try {
      const response = await fetch(`${API_BASE_URL}/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setUsername('');
        setPassword('');
        navigate('/welcome'); // <--- CRITICAL CHANGE: Navigate to the dedicated WelcomePage
      } else {
        setMessage(data.error || 'Sign in failed. Invalid credentials.');
      }
    } catch (error) {
      console.error('Error during sign in:', error);
      setMessage('Network error or server is not running.');
    }
  };

  // Render content for the root path (Home, Sign Up, Sign In forms)
  const renderRootPathContent = () => {
    switch (currentAuthView) {
      case 'home':
        return (
          <div style={{ ...styles.welcomeContainer, animation: 'fadeInUp 0.8s ease-out' }}>
            <h2 style={styles.welcomeHeading}>Welcome to RecipeHub</h2>
            <marquee behavior="scroll" direction="left" style={styles.marquee}>Discover Delicious Recipes, Cook with Passion!</marquee>

            <div style={styles.foodInfo}>
              <p>🍲 Our platform offers hundreds of chef-curated recipes, designed for beginners and experts alike.</p>
              <p>🥗 Each recipe includes step-by-step instructions, prep time, cook time, and dietary information.</p>
              <p>🍜 You’ll find dishes from various cuisines—Indian, Italian, Thai, Chinese, and more!</p>
              <p>🍕 Our AI-powered recommendation system suggests meals based on your preferences and ingredients.</p>
              <p>🍣 Get real-time feedback from users who’ve tried the recipes and tweak them to your taste.</p>
              <p>🍰 Explore vegan, gluten-free, and low-calorie dishes without compromising on flavor!</p>
            </div>

            {/* Feedback Section */}
            <div style={styles.feedbackSection}>
              <div style={styles.feedbackMarquee}>
                {/* Duplicate cards for continuous marquee effect */}
                {[...Array(2)].map((_, i) => (
                  <React.Fragment key={i}>
                    <div
                      style={styles.feedbackCard}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      <div style={styles.feedbackTitle}>Samantha 🍝</div>
                      <div style={styles.feedbackContent}>The pasta recipe was amazing! My family loved it. The instructions were crystal clear.</div>
                    </div>
                    <div
                      style={styles.feedbackCard}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      <div style={styles.feedbackTitle}>Ravi 🍛</div>
                      <div style={styles.feedbackContent}>Loved the South Indian Sambar recipe. Tasted just like my grandmother's!</div>
                    </div>
                    <div
                      style={styles.feedbackCard}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      <div style={styles.feedbackTitle}>Linda 🍰</div>
                      <div style={styles.feedbackContent}>The chocolate cake turned out fluffy and moist. I'm impressed!</div>
                    </div>
                    <div
                      style={styles.feedbackCard}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      <div style={styles.feedbackTitle}>Mohit 🥘</div>
                      <div style={styles.feedbackContent}>Thanks for the detailed paneer butter masala recipe. Easy and delicious!</div>
                    </div>
                    <div
                      style={styles.feedbackCard}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      <div style={styles.feedbackTitle}>Ayesha 🥗</div>
                      <div style={styles.feedbackContent}>Perfect salad recipe with homemade dressing. Light and refreshing!</div>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        );
      case 'signup':
        return (
          <div style={{ ...styles.formContainer, animation: 'fadeInUp 0.8s ease-out' }}>
            <h2 style={styles.formHeading}>Create Your Account</h2>
            <form onSubmit={handleSignUpSubmit} style={styles.form}>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={styles.input}
                onFocus={(e) => e.target.style.borderColor = styles.inputFocus.borderColor}
                onBlur={(e) => e.target.style.borderColor = styles.input.borderColor}
                required
              />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
                onFocus={(e) => e.target.style.borderColor = styles.inputFocus.borderColor}
                onBlur={(e) => e.target.style.borderColor = styles.input.borderColor}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
                onFocus={(e) => e.target.style.borderColor = styles.inputFocus.borderColor}
                onBlur={(e) => e.target.style.borderColor = styles.input.borderColor}
                required
              />
              <button
                type="submit"
                style={styles.button}
                onMouseEnter={(e) => { e.currentTarget.style.transform = styles.buttonHover.transform; e.currentTarget.style.boxShadow = styles.buttonHover.boxShadow; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                Sign Up
              </button>
            </form>
            {message && <p style={styles.message}>{message}</p>}
            <p style={styles.formSwitchText}>
              Already have an account? <span style={styles.formSwitchLink} onClick={() => setCurrentAuthView('signin')}>Sign In</span>
            </p>
          </div>
        );
      case 'signin':
        return (
          <div style={{ ...styles.formContainer, animation: 'fadeInUp 0.8s ease-out' }}>
            <h2 style={styles.formHeading}>Welcome Back!</h2>
            <form onSubmit={handleSignInSubmit} style={styles.form}>
              <input
                type="text"
                placeholder="Username or Email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={styles.input}
                onFocus={(e) => e.target.style.borderColor = styles.inputFocus.borderColor}
                onBlur={(e) => e.target.style.borderColor = styles.input.borderColor}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
                onFocus={(e) => e.target.style.borderColor = styles.inputFocus.borderColor}
                onBlur={(e) => e.target.style.borderColor = styles.input.borderColor}
                required
              />
              <button
                type="submit"
                style={styles.button}
                onMouseEnter={(e) => { e.currentTarget.style.transform = styles.buttonHover.transform; e.currentTarget.style.boxShadow = styles.buttonHover.boxShadow; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                Sign In
              </button>
            </form>
            {message && <p style={styles.message}>{message}</p>}
            <p style={styles.formSwitchText}>
              Don't have an account? <span style={styles.formSwitchLink} onClick={() => setCurrentAuthView('signup')}>Sign Up</span>
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={styles.wrapper}>
      {/* Global CSS embedded */}
      <style>
        {`
        body, html, #root {
          margin: 0;
          padding: 0;
          height: 100%;
          width: 100%;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #8e2de2, #4a00e0, #00c6ff);
          color: #f0f0f0;
          overflow-x: hidden;
          overflow-y: auto; /* Allow scrolling for content */
        }

        /* Keyframes for slide-left marquee animation */
        @keyframes slide-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* Keyframes for fade-in-up animation */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        `}
      </style>

      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.logo}>👨‍🍳 RecipeHub</h1>
        <div style={styles.navLinks}>
          <span
            style={getNavLinkStyle('home')}
            onMouseEnter={() => setHoveredNav('home')}
            onMouseLeave={() => setHoveredNav(null)}
            onClick={() => { setCurrentAuthView('home'); navigate('/'); }} // Navigate to root and set AuthPage view to home
          >
            Home
          </span>
          <span
            style={getNavLinkStyle('signup')}
            onMouseEnter={() => setHoveredNav('signup')}
            onMouseLeave={() => setHoveredNav(null)}
            onClick={() => { setCurrentAuthView('signup'); navigate('/'); }} // Navigate to root and set AuthPage view to signup
          >
            Sign Up
          </span>
          <span
            style={getNavLinkStyle('signin')}
            onMouseEnter={() => setHoveredNav('signin')}
            onMouseLeave={() => setHoveredNav(null)}
            onClick={() => { setCurrentAuthView('signin'); navigate('/'); }} // Navigate to root and set AuthPage view to signin
          >
            Sign In
          </span>
          <span
            style={getNavLinkStyle('contact')}
            onMouseEnter={() => setHoveredNav('contact')}
            onMouseLeave={() => setHoveredNav(null)}
            onClick={() => navigate('/contact')} // Navigate directly to contact page
          >
            Contact
          </span>
          <span
            style={getNavLinkStyle('welcome')}
            onMouseEnter={() => setHoveredNav('welcome')}
            onMouseLeave={() => setHoveredNav(null)}
            onClick={() => navigate('/welcome')} // Navigate directly to welcome page
          >
            Welcome
          </span>
        </div>
      </div>

      {/* Main Content Area with Routing */}
      <div style={styles.mainContentArea}>
        <Routes>
          {/* Default route renders the home/signup/signin content */}
          <Route path="/" element={renderRootPathContent()} />

          {/* Route for the Welcome Page */}
          <Route path="/welcome" element={<WelcomePage />} />

          {/* Route for the Contact Page */}
          <Route path="/contact" element={<ContactPage />} />

          {/* Add a catch-all route for 404 Not Found (optional) */}
          <Route path="*" element={
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              minHeight: 'calc(100vh - 10rem)', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '15px',
              padding: '2rem', boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(8px)',
              margin: 'auto', color: '#fff'
            }}>
              <h2 style={{fontSize: '3rem', marginBottom: '1rem'}}>404</h2>
              <p style={{fontSize: '1.5rem'}}>Page Not Found</p>
              <button
                onClick={() => navigate('/')} // Navigate to home
                style={{
                  padding: '0.8rem 1.5rem', borderRadius: '12px', border: 'none',
                  backgroundColor: '#00c6ff', backgroundImage: 'linear-gradient(45deg, #00c6ff, #92fe9d)',
                  color: '#2c3e50', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease', marginTop: '2rem'
                }}
              >
                Go to Home
              </button>
            </div>
          } />
        </Routes>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <strong>© 2025 RecipeHub</strong><br />
        All Rights Reserved.<br />
        Contact us at <a href="mailto:support@recipehub.com" style={styles.footerLink}>support@recipehub.com</a>
      </footer>
    </div>
  );
};

// Styles object, adapted from previous versions for consistency
const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    margin: 0,
    padding: 0,
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    background: 'linear-gradient(135deg, #8e2de2, #4a00e0, #00c6ff)',
    color: '#f0f0f0',
    overflowX: 'hidden',
    overflowY: 'auto',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: 'rgba(44, 62, 80, 0.8)',
    backdropFilter: 'blur(10px)',
    borderBottom: '3px solid #34495e',
    color: '#fff',
    boxShadow: '0 3px 15px rgba(0, 0, 0, 0.4)',
    position: 'sticky',
    top: 0,
    zIndex: 999,
  },
  logo: {
    fontSize: '2rem',
    color: '#00c6ff',
    textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
  },
  navLinks: {
    display: 'flex',
    gap: '1.5rem',
  },
  navLink: {
    cursor: 'pointer',
    fontWeight: 600,
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    transition: 'background-color 0.3s ease, color 0.3s ease, transform 0.2s ease',
    color: '#fff',
    textDecoration: 'none',
  },
  navLinkHover: {
    background: 'linear-gradient(45deg, #00c6ff, #92fe9d)',
    color: '#2c3e50',
    transform: 'scale(1.05)',
  },
  mainContentArea: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start', // Align content to top, allowing individual pages to manage their vertical centering if needed
    padding: '2rem',
    width: '100%',
    boxSizing: 'border-box',
    minHeight: 'calc(100vh - 10rem)', // Ensure content area takes up remaining space, accounting for header/footer height
  },
  welcomeContainer: { // Styles for the home/welcome content within index.jsx
    textAlign: 'center',
    padding: '2.5rem',
    maxWidth: '900px',
    width: '100%',
    background: 'rgba(255, 255, 255, 0.08)',
    borderRadius: '15px',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(8px)',
    boxSizing: 'border-box',
    transform: 'translateY(0)',
    opacity: 1,
  },
  welcomeHeading: {
    fontSize: '2.8rem',
    marginBottom: '1.5rem',
    color: '#00c6ff',
    textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
  },
  marquee: {
    color: '#ffea00',
    fontSize: '1.4rem',
    margin: '1.5rem 0',
    fontWeight: 'bold',
  },
  foodInfo: {
    textAlign: 'center',
    margin: '2.5rem auto',
    fontSize: '1.15rem',
    color: '#ffffff',
    lineHeight: '1.8',
    maxWidth: '700px',
  },
  feedbackSection: {
    marginTop: '3rem',
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
  },
  feedbackMarquee: {
    display: 'flex',
    gap: '2.5rem',
    animation: 'slide-left 30s linear infinite',
    width: 'max-content',
  },
  feedbackCard: {
    background: 'rgba(255, 255, 255, 0.1)',
    border: '2px solid #00c6ff',
    padding: '1.8rem',
    minWidth: '320px',
    maxWidth: '350px',
    borderRadius: '18px',
    boxShadow: '0 0 20px rgba(0,0,0,0.4)',
    flexShrink: 0,
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease',
  },
  feedbackTitle: {
    fontWeight: 'bold',
    color: '#00c6ff',
    marginBottom: '0.8rem',
    fontSize: '1.3rem',
  },
  feedbackContent: {
    fontSize: '1.05rem',
    color: '#e0e0e0',
  },
  formContainer: { // Styles for signup/signin forms within index.jsx
    background: 'rgba(255, 255, 255, 0.08)',
    borderRadius: '15px',
    padding: '2.5rem',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(8px)',
    width: '100%',
    maxWidth: '480px',
    textAlign: 'center',
    boxSizing: 'border-box',
    margin: 'auto',
    transform: 'translateY(0)',
    opacity: 1,
  },
  formHeading: {
    fontSize: '2.4rem',
    marginBottom: '1.8rem',
    color: '#00c6ff',
    textShadow: '1px 1px 3px rgba(0,0,0,0.4)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  input: {
    padding: '1rem 1.2rem',
    borderRadius: '10px',
    border: '1px solid rgba(255,255,255,0.3)',
    backgroundColor: 'rgba(255,255,255,0.15)',
    color: '#fff',
    fontSize: '1.05rem',
    outline: 'none',
    width: 'calc(100% - 2.4rem)',
    boxSizing: 'border-box',
    transition: 'border-color 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease',
  },
  inputFocus: {
    borderColor: '#00c6ff',
    backgroundColor: 'rgba(255,255,255,0.25)',
    boxShadow: '0 0 10px rgba(0, 198, 255, 0.4)',
  },
  button: {
    padding: '1rem 1.8rem',
    borderRadius: '15px',
    border: 'none',
    backgroundColor: '#00c6ff',
    backgroundImage: 'linear-gradient(45deg, #00c6ff, #92fe9d)',
    color: '#2c3e50',
    fontWeight: 'bold',
    fontSize: '1.2rem',
    cursor: 'pointer',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    marginTop: '1.5rem',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
  },
  buttonHover: {
    transform: 'scale(1.03)',
    boxShadow: '0 0 25px rgba(0, 198, 255, 0.6)',
  },
  message: {
    marginTop: '1.5rem',
    fontSize: '1.1rem',
    color: '#ffea00',
    fontWeight: 'bold',
    transition: 'opacity 0.5s ease-out',
  },
  formSwitchText: {
    marginTop: '1.8rem',
    fontSize: '1rem',
    color: '#ccc',
  },
  formSwitchLink: {
    color: '#00c6ff',
    cursor: 'pointer',
    textDecoration: 'underline',
    fontWeight: 'bold',
    transition: 'color 0.3s ease',
  },
  footer: {
    background: '#2c3e50',
    textAlign: 'center',
    padding: '1.8rem 1rem',
    marginTop: '2rem',
    borderTop: '2px solid #34495e',
    color: '#ccc',
    fontSize: '1rem',
    lineHeight: '1.7',
    boxShadow: '0 -2px 15px rgba(0, 0, 0, 0.3)',
  },
  footerLink: {
    color: '#00c6ff',
    textDecoration: 'none',
  }
};

// The root component that will be rendered by ReactDOM
const RootApp = () => (
  <Router>
    <MainAppContent />
  </Router>
);

export default RootApp;