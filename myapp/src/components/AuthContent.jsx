import React, { useState } from 'react';

const AuthContent = ({ currentView, setCurrentView, message, setMessage, API_BASE_URL, onAuthSuccess }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState(''); // Added email state for signup
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    setMessage(''); // Clear previous messages
    if (!username || !email || !password) { // Ensure all fields are filled
      setMessage('Please fill in all fields (username, email, password).');
      return;
    }

    // Password constraints:
    // - Minimum 8 characters
    // - At least one uppercase letter
    // - At least one lowercase letter
    // - At least one number
    // - At least one special character (e.g., !@#$%^&*)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]|\\:;"'<>,.?/~`]).{8,}$/;

    if (password.length < 8) {
      setMessage('Password must be at least 8 characters long.');
      return;
    }
    if (!passwordRegex.test(password)) {
      setMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }), // Send email for signup
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        // Optionally, clear fields after successful signup
        setUsername('');
        setEmail('');
        setPassword('');
        onAuthSuccess(); // Call onAuthSuccess upon successful signup
      } else {
        setMessage(data.error || 'Signup failed. Please try again.');
        console.error('Signup error from backend:', data.error);
      }
    } catch (error) {
      setMessage('Network error during signup. Please check your server connection.');
      console.error('Frontend signup fetch error:', error);
    }
  };

  const handleSignIn = async () => {
    setMessage(''); // Clear previous messages
    if (!username || !password) {
      setMessage('Please enter your username/email and password.');
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        // Optionally, clear fields after successful signin
        setUsername('');
        setPassword('');
        onAuthSuccess(); // Call onAuthSuccess upon successful signin
      } else {
        setMessage(data.error || 'Sign In failed. Please check your credentials.');
        console.error('Sign In error from backend:', data.error);
      }
    } catch (error) {
      setMessage('Network error during signin. Please check your server connection.');
      console.error('Frontend signin fetch error:', error);
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return (
          <div style={styles.authBox}>
            <h2 style={styles.authHeading}>Welcome to RecipeHub!</h2>
            <p style={styles.authSubheading}>Your ultimate guide to delicious recipes.</p>
            <div style={styles.buttonGroup}>
              <button onClick={() => setCurrentView('signup')} style={styles.authButton}>Sign Up</button>
              <button onClick={() => setCurrentView('signin')} style={styles.authButton}>Sign In</button>
            </div>
            {message && <p style={styles.message}>{message}</p>}
          </div>
        );
      case 'signup':
        return (
          <div style={styles.authBox}>
            <h2 style={styles.authHeading}>Sign Up</h2>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
              required // HTML5 validation
              onFocus={(e) => e.target.style.borderColor = styles.inputFocus.borderColor}
              onBlur={(e) => e.target.style.borderColor = styles.input.borderColor}
            />
            <input
              type="email" // Changed to type="email" for email input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required // HTML5 validation
              onFocus={(e) => e.target.style.borderColor = styles.inputFocus.borderColor}
              onBlur={(e) => e.target.style.borderColor = styles.input.borderColor}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required // HTML5 validation
              onFocus={(e) => e.target.style.borderColor = styles.inputFocus.borderColor}
              onBlur={(e) => e.target.style.borderColor = styles.input.borderColor}
            />
            <button onClick={handleSignUp} style={styles.authButton}>Sign Up</button>
            <p style={styles.toggleText}>
              Already have an account? <span onClick={() => setCurrentView('signin')} style={styles.toggleLink}>Sign In</span>
            </p>
            {message && <p style={styles.message}>{message}</p>}
          </div>
        );
      case 'signin':
        return (
          <div style={styles.authBox}>
            <h2 style={styles.authHeading}>Sign In</h2>
            <input
              type="text"
              placeholder="Username or Email" // Updated placeholder
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
              required
              onFocus={(e) => e.target.style.borderColor = styles.inputFocus.borderColor}
              onBlur={(e) => e.target.style.borderColor = styles.input.borderColor}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
              onFocus={(e) => e.target.style.borderColor = styles.inputFocus.borderColor}
              onBlur={(e) => e.target.style.borderColor = styles.input.borderColor}
            />
            <button onClick={handleSignIn} style={styles.authButton}>Sign In</button>
            <p style={styles.toggleText}>
              Don't have an account? <span onClick={() => setCurrentView('signup')} style={styles.toggleLink}>Sign Up</span>
            </p>
            {message && <p style={styles.message}>{message}</p>}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={styles.authContainer}>
      {renderContent()}
    </div>
  );
};

const styles = {
  authContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 'calc(100vh - 10rem)', // Adjust based on header/footer height
    width: '100%',
    padding: '2rem',
    boxSizing: 'border-box',
  },
  authBox: {
    background: 'rgba(255, 255, 255, 0.08)',
    borderRadius: '15px',
    padding: '3rem 2rem',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(8px)',
    textAlign: 'center',
    maxWidth: '450px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    animation: 'fadeInUp 0.8s ease-out forwards', // Apply animation
  },
  authHeading: {
    fontSize: '2.5rem',
    color: '#00c6ff',
    marginBottom: '0.5rem',
    textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
  },
  authSubheading: {
    fontSize: '1.1rem',
    color: '#e0e0e0',
    marginBottom: '1.5rem',
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
  authButton: {
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
    marginTop: '0.5rem',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
  },
  buttonGroup: {
    display: 'flex',
    gap: '1rem',
    marginTop: '1rem',
    justifyContent: 'center',
  },
  toggleText: {
    color: '#e0e0e0',
    fontSize: '0.95rem',
    marginTop: '1rem',
  },
  toggleLink: {
    color: '#00c6ff',
    cursor: 'pointer',
    fontWeight: 'bold',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
    '&:hover': {
      color: '#92fe9d',
    },
  },
  message: {
    marginTop: '1rem',
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#ffea00', // Yellow for messages
  },
};

export default AuthContent;