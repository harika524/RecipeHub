import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Outlet, Navigate } from 'react-router-dom';

// Import your content-only components
import AuthContent from './components/AuthContent';
import WelcomePage from './components/WelcomePage';
import ContactPage from './components/ContactPage';
import RecipeListPage from './components/RecipeListPage';
import RecipeDetailPage from './components/RecipeDetailPage';

// A simple ProtectedRoute component to guard routes
const ProtectedRoute = ({ isAuthenticated, redirectPath = '/' }) => {
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />; // Renders the child routes if authenticated
};

// Main App component that handles global layout and routing
const App = () => {
  // State for AuthContent's internal view and messages
  const [currentAuthView, setCurrentAuthView] = useState('home');
  const [authMessage, setAuthMessage] = useState('');
  // New state to track authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  // Dynamic styling for nav links on hover
  const [hoveredNav, setHoveredNav] = useState(null);

  const getNavLinkStyle = (linkName) => ({
    ...styles.navLink,
    ...(hoveredNav === linkName ? styles.navLinkHover : {}),
  });

  // Base URL for your Flask backend API
  const API_BASE_URL = 'http://127.0.0.1:5000';

  // Function to handle successful login/signup, setting isAuthenticated to true
  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setAuthMessage('Login successful! Welcome to RecipeHub.');
    // IMPORTANT CHANGE: Use { replace: true } to prevent going back to login via browser history
    navigate('/welcome', { replace: true });
  };

  // Function to handle logout from the global navbar
  const handleSignOut = () => {
    // In a real application, you would clear user session/token here
    // e.g., localStorage.removeItem('authToken');
    setIsAuthenticated(false); // Set authenticated to false
    setCurrentAuthView('home'); // Reset AuthContent to home view
    navigate('/', { replace: true }); // Redirect to the main page and replace history
  };

  // Optional: A simple check on component mount if user was previously authenticated
  // In a real app, this would involve checking a token in localStorage
  useEffect(() => {
    // For this example, we'll assume not authenticated on initial load unless explicitly logged in.
    // If you had persistent login (e.g., JWT in localStorage), you'd check it here.
    // const token = localStorage.getItem('authToken');
    // if (token) {
    //   setIsAuthenticated(true);
    // }
  }, []);

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
          {/* Show Sign Up/Sign In only if not authenticated */}
          {!isAuthenticated && (
            <>
              <span
                style={getNavLinkStyle('signup')}
                onMouseEnter={() => setHoveredNav('signup')}
                onMouseLeave={() => setHoveredNav(null)}
                onClick={() => { setCurrentAuthView('signup'); navigate('/'); }}
              >
                Sign Up
              </span>
              <span
                style={getNavLinkStyle('signin')}
                onMouseEnter={() => setHoveredNav('signin')}
                onMouseLeave={() => setHoveredNav(null)}
                onClick={() => { setCurrentAuthView('signin'); navigate('/'); }}
              >
                Sign In
              </span>
            </>
          )}

          {/* Show Contact, Welcome, Sign Out only if authenticated */}
          {isAuthenticated && (
            <>
              <span
                style={getNavLinkStyle('contact')}
                onMouseEnter={() => setHoveredNav('contact')}
                onMouseLeave={() => setHoveredNav(null)}
                onClick={() => navigate('/contact')}
              >
                Contact
              </span>
              <span
                style={getNavLinkStyle('welcome')}
                onMouseEnter={() => setHoveredNav('welcome')}
                onMouseLeave={() => setHoveredNav(null)}
                onClick={() => navigate('/welcome')}
              >
                Welcome
              </span>
              <span
                style={getNavLinkStyle('signout')}
                onMouseEnter={() => setHoveredNav('signout')}
                onMouseLeave={() => setHoveredNav(null)}
                onClick={handleSignOut}
              >
                Sign Out
              </span>
            </>
          )}
        </div>
      </div>

      {/* Main Content Area with Routing */}
      <div style={styles.mainContentArea}>
        <Routes>
          {/* Default route for AuthContent (Login/Signup) */}
          <Route
            path="/"
            element={
              <AuthContent
                currentView={currentAuthView}
                setCurrentView={setCurrentAuthView}
                message={authMessage}
                setMessage={setAuthMessage}
                API_BASE_URL={API_BASE_URL}
                onAuthSuccess={handleAuthSuccess} // Pass the new success handler
              />
            }
          />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/welcome" element={<WelcomePage />} />
            <Route path="/recipes/:type" element={<RecipeListPage />} />
            <Route path="/recipe/:id" element={<RecipeDetailPage />} />
            <Route path="/contact" element={<ContactPage />} /> {/* Contact page also protected */}
          </Route>

          {/* Catch-all route for 404 Not Found */}
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
                onClick={() => navigate('/')}
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

// Styles object for the global App component
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
    alignItems: 'flex-start',
    padding: '2rem',
    width: '100%',
    boxSizing: 'border-box',
    minHeight: 'calc(100vh - 10rem)',
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

export default App;