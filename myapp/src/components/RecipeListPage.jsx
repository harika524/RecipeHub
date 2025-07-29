import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import recipes from '../data/recipesData'; // Import your recipe data

const RecipeListPage = () => {
  const { type } = useParams(); // Get the 'type' parameter from the URL (e.g., 'spicy', 'coffee')
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(''); // New state for search query

  // Function to capitalize the first letter of each word
  const capitalizeWords = (str) => {
    if (!str) return '';
    return str.replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  // Title for the page
  const pageTitle = type ? `${capitalizeWords(type)} Recipes` : 'All Recipes';

  // Filter recipes based on the 'type' parameter first
  let currentRecipes = recipes.filter(recipe => recipe.type === type);

  // Further filter based on search query if it exists
  let displayedRecipes = [];
  let exactMatchRecipe = null;

  if (searchQuery) {
    const lowerCaseSearchQuery = searchQuery.toLowerCase();
    const tempFiltered = currentRecipes.filter(recipe =>
      recipe.name.toLowerCase().includes(lowerCaseSearchQuery)
    );

    // Check for exact match and separate it
    const exactMatchIndex = tempFiltered.findIndex(recipe =>
      recipe.name.toLowerCase() === lowerCaseSearchQuery
    );

    if (exactMatchIndex !== -1) {
      exactMatchRecipe = tempFiltered[exactMatchIndex];
      // Remove exact match from its current position to add it at the beginning
      const remainingRecipes = tempFiltered.filter((_, index) => index !== exactMatchIndex);
      displayedRecipes = [exactMatchRecipe, ...remainingRecipes];
    } else {
      displayedRecipes = tempFiltered;
    }
  } else {
    displayedRecipes = currentRecipes;
  }

  const handleRecipeClick = (id) => {
    navigate(`/recipe/${id}`); // Navigate to the detail page for the clicked recipe
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>{pageTitle}</h2>

      {/* Search Input Field */}
      <input
        type="text"
        placeholder="Search for a recipe by name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={styles.searchInput}
        onFocus={(e) => e.target.style.borderColor = styles.inputFocus.borderColor}
        onBlur={(e) => e.target.style.borderColor = styles.searchInput.borderColor}
      />

      {displayedRecipes.length === 0 && searchQuery ? (
        <p style={styles.noRecipesMessage}>No recipes found matching "{searchQuery}". Try a different search!</p>
      ) : currentRecipes.length === 0 && !searchQuery ? (
        <p style={styles.noRecipesMessage}>Oops! No recipes found for "{capitalizeWords(type)}".</p>
      ) : (
        <div style={styles.recipeGrid}>
          {displayedRecipes.map((recipe) => (
            <div
              key={recipe.id}
              style={{
                ...styles.recipeCard,
                ...(exactMatchRecipe && recipe.id === exactMatchRecipe.id ? styles.highlightedCard : {})
              }}
              onClick={() => handleRecipeClick(recipe.id)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = styles.recipeCardHover.transform;
                e.currentTarget.style.boxShadow = styles.recipeCardHover.boxShadow;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = styles.recipeCard.boxShadow;
              }}
            >
              <img
                src={recipe.image}
                alt={recipe.name}
                style={styles.recipeImage}
                onError={(e) => { e.target.onerror = null; e.target.src = `https://via.placeholder.com/400x300/F8F8F8/888888?text=Image+Unavailable`; }} // Elegant fallback
              />
              <h3 style={styles.recipeName}>{recipe.name}</h3>
              <p style={styles.recipeType}>{capitalizeWords(recipe.type)}</p> {/* Display recipe type */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Styles for RecipeListPage
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '3rem 2rem', // Increased top/bottom padding
    width: '100%',
    boxSizing: 'border-box',
    // Elegant and light background with a culinary feel
    background: 'linear-gradient(135deg, #FDFDFD 0%, #F5F5F5 100%)',
    color: '#333', // Darker text for better contrast on light background
    minHeight: 'calc(100vh - 10rem)',
    fontFamily: '"Poppins", sans-serif', // Modern, clean font (remember to import)
    animation: 'fadeIn 0.8s ease-out', // Subtle fade-in for the whole page
  },
  heading: {
    fontSize: '3.5rem', // Larger, more prominent heading
    marginBottom: '2.5rem',
    color: '#8B4513', // Warm brown for primary headings
    textShadow: '1px 1px 3px rgba(0,0,0,0.05)', // Softer text shadow
    textAlign: 'center',
    fontWeight: '700',
    fontFamily: '"Lora", serif', // Elegant serif font
  },
  searchInput: {
    padding: '1rem 1.5rem',
    borderRadius: '30px', // Pill shape for modern look
    border: '1px solid #FFDAB9', // Soft peach border
    backgroundColor: 'rgba(255,255,255,0.9)', // Almost opaque white background
    color: '#555',
    fontSize: '1.1rem',
    outline: 'none',
    width: '90%',
    maxWidth: '600px', // Wider search bar
    marginBottom: '3rem', // More space below search
    boxSizing: 'border-box',
    boxShadow: '0 5px 15px rgba(0,0,0,0.05)', // Subtle shadow
    transition: 'all 0.3s ease',
    '::placeholder': {
      color: '#A0A0A0', // Softer placeholder color
      opacity: 0.9,
    },
  },
  inputFocus: {
    borderColor: '#FFA07A', // Coral border on focus
    backgroundColor: '#FFFFFF', // Solid white on focus
    boxShadow: '0 0 20px rgba(255, 160, 122, 0.2)', // Soft coral glow
  },
  noRecipesMessage: {
    fontSize: '1.4rem',
    color: '#D32F2F', // Professional error red
    marginTop: '3rem',
    textAlign: 'center',
    fontWeight: '500',
    fontStyle: 'italic',
  },
  recipeGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', // Slightly larger min-width for cards
    gap: '2.5rem', // Increased gap between cards
    width: '100%',
    maxWidth: '1300px', // Wider grid max width
    justifyContent: 'center',
    animation: 'fadeInUp 0.8s ease-out', // Fade-in effect for the grid
  },
  recipeCard: {
    background: 'rgba(255, 255, 255, 0.9)', // Lighter card background
    borderRadius: '20px', // More rounded corners
    overflow: 'hidden',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)', // Softer, more elegant shadow
    cursor: 'pointer',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease, border 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    paddingBottom: '1.5rem', // More padding at the bottom
    border: '1px solid #F0F0F0', // Subtle default border
    position: 'relative', // For potential future overlays/badges
  },
  recipeCardHover: {
    transform: 'translateY(-8px) scale(1.02)', // More pronounced lift and slight scale
    boxShadow: '0 15px 40px rgba(255, 160, 122, 0.25)', // Coral glow on hover
  },
  highlightedCard: {
    border: '3px solid #FFA07A', // Prominent coral border for exact match
    boxShadow: '0 0 35px rgba(255, 160, 122, 0.5)', // Stronger coral glow
    transform: 'scale(1.04) translateY(-10px)', // Slightly larger and higher lift
  },
  recipeImage: {
    width: '100%',
    height: '220px', // Slightly taller images
    objectFit: 'cover',
    borderTopLeftRadius: '20px',
    borderTopRightRadius: '20px',
    marginBottom: '1.2rem',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)', // Subtle shadow under image
  },
  recipeName: {
    fontSize: '1.5rem', // Larger recipe name
    fontWeight: 'bold',
    color: '#8B4513', // Warm brown for recipe name
    padding: '0 1rem',
    marginBottom: '0.5rem', // Space between name and type
    fontFamily: '"Lora", serif',
  },
  recipeType: {
    fontSize: '0.95rem',
    color: '#A0522D', // Slightly lighter brown for type
    fontStyle: 'italic',
    marginBottom: '0.8rem', // Space before bottom padding
  },
  // Keyframes for animations
  '@keyframes fadeIn': {
    '0%': { opacity: 0 },
    '100%': { opacity: 1 },
  },
  '@keyframes fadeInUp': {
    '0%': { opacity: 0, transform: 'translateY(20px)' },
    '100%': { opacity: 1, transform: 'translateY(0)' },
  },
};

export default RecipeListPage;