import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import recipes from '../data/recipesData'; // Import your recipe data

const RecipeDetailPage = () => {
  const { id } = useParams(); // Get the 'id' parameter from the URL
  const navigate = useNavigate();

  // Find the recipe by ID
  const recipe = recipes.find(r => r.id === id);

  if (!recipe) {
    return (
      <div style={styles.container}>
        <h2 style={styles.heading}>Recipe Not Found</h2>
        <p style={styles.errorMessage}>The recipe you are looking for does not exist. Perhaps it's a secret family recipe!</p>
        <button
          onClick={() => navigate('/welcome')} // Go back to Welcome Page
          style={styles.backButton}
          onMouseEnter={(e) => e.currentTarget.style.transform = styles.backButtonHover.transform}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          Back to Welcome
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>{recipe.name}</h2>

      <div style={styles.contentWrapper}>
        <div style={styles.imageColumn}>
          <img
            src={recipe.image}
            alt={recipe.name}
            style={styles.mainImage}
            onError={(e) => { e.target.onerror = null; e.target.src = `https://via.placeholder.com/600x450/F8F8F8/888888?text=Image+Unavailable`; }} // More elegant fallback
          />
        </div>

        <div style={styles.textColumn}>
          <p style={styles.description}>{recipe.description}</p>

          <h3 style={styles.subHeading}>Ingredients:</h3>
          <ul style={styles.list}>
            {recipe.ingredients.map((item, index) => (
              <li key={index} style={styles.listItem}>{item}</li>
            ))}
          </ul>

          <h3 style={styles.subHeading}>Procedure:</h3>
          <ol style={styles.list}>
            {recipe.recipe.map((step, index) => (
              <li key={index} style={styles.listItem}>{step}</li>
            ))}
          </ol>

          <h3 style={styles.subHeading}>Benefits:</h3>
          <p style={styles.paragraph}>{recipe.benefits}</p>

          <h3 style={styles.subHeading}>Calories:</h3>
          <p style={styles.paragraph}>{recipe.calories}</p>

          {recipe.videoLink && ( // Only show if videoLink exists
            <div style={styles.videoSection}>
              <h3 style={styles.subHeading}>Reference Video:</h3>
              <p>
                <a
                  href={recipe.videoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.videoLink}
                  onMouseEnter={(e) => e.currentTarget.style.color = styles.videoLinkHover.color}
                  onMouseLeave={(e) => e.currentTarget.style.color = styles.videoLink.color}
                >
                  Watch Recipe Video <span style={{ marginLeft: '5px' }}>▶️</span>
                </a>
              </p>
            </div>
          )}

          <button
            onClick={() => navigate(-1)} // Go back to the previous page (RecipeListPage)
            style={styles.backButton}
            onMouseEnter={(e) => e.currentTarget.style.transform = styles.backButtonHover.transform}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            ← Back to Recipes
          </button>
        </div>
      </div>
    </div>
  );
};

// Styles for RecipeDetailPage
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '3rem 2rem', // Increased top/bottom padding
    width: '100%',
    boxSizing: 'border-box',
    // Elegant and light background with a subtle culinary feel
    background: 'linear-gradient(135deg, #FDFDFD 0%, #F5F5F5 100%)',
    color: '#333', // Darker text for better contrast on light background
    minHeight: 'calc(100vh - 10rem)',
    fontFamily: '"Lora", serif', // Consistent elegant font
  },
  heading: {
    fontSize: '3.8rem', // Larger, more prominent heading
    marginBottom: '3rem',
    color: '#8B4513', // Warm brown for primary headings
    textShadow: '1px 1px 3px rgba(0,0,0,0.1)', // Softer text shadow
    textAlign: 'center',
    fontWeight: '700',
  },
  errorMessage: {
    fontSize: '1.4rem',
    color: '#D32F2F', // More professional error red
    marginTop: '2.5rem',
    fontFamily: '"Poppins", sans-serif',
    fontWeight: '500',
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: '4rem', // Increased gap for more distinct sections
    width: '100%',
    maxWidth: '1400px', // Wider content area
    padding: '2.5rem', // Generous internal padding
    background: 'rgba(255, 255, 255, 0.95)', // Nearly opaque white for content card
    borderRadius: '20px', // More rounded corners
    boxShadow: '0 15px 50px rgba(0, 0, 0, 0.08)', // Softer, wider shadow
    border: '1px solid #FFDAB9', // Soft peach border
    animation: 'fadeInUp 1s ease-out', // Subtle fade-in animation
    '@media (maxWidth: 1024px)': { // Adjusted breakpoint for responsiveness
      flexDirection: 'column',
      gap: '2.5rem',
      padding: '2rem',
    },
  },
  textColumn: {
    flex: 2,
    textAlign: 'left',
    paddingRight: '1.5rem',
  },
  imageColumn: {
    flex: 1.2, // Image takes a bit more space
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: '1.5rem',
    '@media (maxWidth: 1024px)': {
      order: -1,
      paddingLeft: '0',
      marginBottom: '1.5rem',
    },
  },
  mainImage: {
    width: '100%',
    maxWidth: '550px', // Larger image
    height: 'auto',
    borderRadius: '25px', // More rounded image corners
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)', // Pronounced but elegant shadow
    border: '4px solid #FFA07A', // Inviting coral border
    transition: 'transform 0.4s ease-out, box-shadow 0.4s ease-out', // Smoother transition
    '&:hover': {
      transform: 'scale(1.02) rotateZ(1deg)', // Subtle zoom and tilt on hover
      boxShadow: '0 12px 40px rgba(255, 160, 122, 0.4)', // More vibrant shadow on hover
    }
  },
  description: {
    fontSize: '1.2rem', // Larger, more readable description
    lineHeight: '1.9', // Increased line height
    marginBottom: '2.5rem',
    color: '#555', // Softer grey for description
    background: '#FDF7E7', // Very light, creamy background for description
    padding: '1.5rem',
    borderRadius: '15px',
    borderLeft: '5px solid #FFC0CB', // A beautiful light pink accent border
    boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
    fontFamily: '"Poppins", sans-serif',
  },
  subHeading: {
    fontSize: '2.4rem', // Larger subheadings
    color: '#D2691E', // Chocolate color for subheadings
    marginTop: '3rem', // More space above subheadings
    marginBottom: '1.2rem',
    borderBottom: '2px solid #FFDAB9', // Soft peach underline
    paddingBottom: '0.8rem',
    fontWeight: '600',
    fontFamily: '"Lora", serif',
  },
  list: {
    listStyleType: 'none', // Remove default bullets
    padding: 0, // Remove default padding
    marginLeft: '1rem',
    marginBottom: '2.5rem',
  },
  listItem: {
    fontSize: '1.1rem',
    lineHeight: '1.8',
    marginBottom: '0.8rem',
    color: '#666',
    position: 'relative',
    paddingLeft: '1.8rem', // Space for custom bullet
    '&::before': { // Custom bullet point
      content: '"•"',
      color: '#FFA07A', // Coral bullet
      position: 'absolute',
      left: 0,
      fontWeight: 'bold',
      fontSize: '1.5rem',
      top: '50%',
      transform: 'translateY(-50%)',
    },
    fontFamily: '"Poppins", sans-serif',
  },
  paragraph: {
    fontSize: '1.1rem',
    lineHeight: '1.8',
    marginBottom: '2.5rem',
    color: '#666',
    fontFamily: '"Poppins", sans-serif',
  },
  videoSection: {
    marginTop: '3.5rem',
    marginBottom: '3rem',
  },
  videoLink: {
    color: '#D2691E', // Warm brown for the link
    textDecoration: 'none', // No underline by default
    fontWeight: 'bold',
    fontSize: '1.3rem', // Larger, more prominent link
    transition: 'color 0.3s ease, transform 0.3s ease',
    display: 'inline-flex', // Align icon and text
    alignItems: 'center',
    '&:hover': {
      color: '#FFA07A', // Coral on hover
      textDecoration: 'underline', // Underline on hover
      transform: 'translateX(5px)', // Slight shift on hover
    },
    fontFamily: '"Poppins", sans-serif',
  },
  videoLinkHover: {
    color: '#FFA07A',
  },
  backButton: {
    padding: '1.2rem 2.5rem', // Even larger button
    borderRadius: '30px', // Pill shape
    border: 'none',
    backgroundColor: '#FF8C00', // Dark orange
    backgroundImage: 'linear-gradient(45deg, #FF8C00, #FF6347)', // Orange to tomato gradient
    color: '#FFFFFF', // White text
    fontWeight: 'bold',
    fontSize: '1.3rem', // Larger font
    cursor: 'pointer',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease, background-image 0.3s ease',
    marginTop: '3.5rem',
    boxShadow: '0 8px 25px rgba(255, 140, 0, 0.3)', // Orange glow shadow
    fontFamily: '"Poppins", sans-serif',
    letterSpacing: '0.05em',
  },
  backButtonHover: {
    transform: 'scale(1.06) translateY(-2px)', // More prominent lift
    boxShadow: '0 12px 35px rgba(255, 99, 71, 0.5)', // Stronger, more vibrant shadow on hover
    backgroundImage: 'linear-gradient(45deg, #FF6347, #FF8C00)', // Reverse gradient on hover
  },
  // Keyframes for fade-in animation
  '@keyframes fadeInUp': {
    '0%': { opacity: 0, transform: 'translateY(20px)' },
    '100%': { opacity: 1, transform: 'translateY(0)' },
  },
};

export default RecipeDetailPage;