import React from 'react';

const LoginPage = () => {
  return (
    <div style={styles.wrapper}>
      {/* Header */}
      <header style={styles.header}>
        <h1 style={styles.logo}>Recipe Manager</h1>
        <nav style={styles.nav}>
          <a href="/" style={styles.navLink}>Home</a>
          <a href="/login" style={{ ...styles.navLink, borderBottom: '2px solid #00c9ff' }}>Login</a>
        </nav>
      </header>

      {/* Main Content */}
      <div style={styles.container}>
        <div style={styles.overlay}></div>

        <div style={styles.content}>
          <h2 style={styles.heading}>Welcome Back</h2>
          <p style={styles.subheading}>Login to your account</p>

          <form style={styles.form}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              style={styles.input}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              style={styles.input}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              style={styles.input}
              required
            />
            <button type="submit" style={styles.button}>Login</button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>© 2025 Recipe Manager. All rights reserved.</p>
      </footer>
    </div>
  );
};

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    background: 'linear-gradient(45deg, #000428, #004e92)',
    color: '#fff',
    fontFamily: 'Segoe UI, sans-serif',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '15px 30px',
    backgroundColor: '#0a0f1c',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
    alignItems: 'center',
  },
  logo: {
    fontSize: '1.6rem',
    fontWeight: 'bold',
    color: '#00c9ff',
  },
  nav: {
    display: 'flex',
    gap: '20px',
  },
  navLink: {
    color: '#ccc',
    textDecoration: 'none',
    fontSize: '1rem',
    transition: 'color 0.3s ease',
  },
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    padding: '40px 20px',
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.05), transparent 70%)',
    zIndex: 1,
  },
  content: {
    zIndex: 2,
    maxWidth: '500px',
    width: '100%',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '20px',
    padding: '40px',
    boxShadow: '0 0 20px rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
  },
  heading: {
    fontSize: '2rem',
    textAlign: 'center',
    marginBottom: '10px',
    color: '#fff',
  },
  subheading: {
    fontSize: '1rem',
    textAlign: 'center',
    marginBottom: '30px',
    color: '#ccc',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  input: {
    padding: '12px 20px',
    borderRadius: '10px',
    border: '1px solid rgba(255,255,255,0.3)',
    backgroundColor: 'rgba(255,255,255,0.15)',
    color: '#fff',
    fontSize: '1rem',
    outline: 'none',
    transition: '0.3s',
    '::placeholder': {
      color: '#fff',
    }
  },
  button: {
    padding: '12px 20px',
    borderRadius: '10px',
    border: 'none',
    backgroundColor: '#00c9ff',
    backgroundImage: 'linear-gradient(45deg, #00c9ff, #92fe9d)',
    color: '#000',
    fontWeight: 'bold',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'transform 0.2s ease-in-out',
  },
  footer: {
    padding: '15px',
    textAlign: 'center',
    backgroundColor: '#0a0f1c',
    fontSize: '0.9rem',
    color: '#888',
  },
};

export default LoginPage;