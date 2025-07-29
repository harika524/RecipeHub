import React from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (type) => {
    navigate(`/recipes/${type}`);
  };

  return (
    <div style={styles.container}>
      {/* Welcome Section */}
      <div style={styles.welcomeSection}>
        <h2 style={styles.heading}>Welcome to RecipeHub</h2>
        <p style={styles.subheading}>Your culinary journey begins here.</p>
        <marquee behavior="scroll" direction="left" style={styles.marquee}>
          Discover Delicious Recipes, Cook with Passion!
        </marquee>

        <div style={styles.foodInfo}>
          <p>🍲 Our platform offers hundreds of chef-curated recipes, designed for beginners and experts alike.</p>
          <p>🥗 Each recipe includes step-by-step instructions, prep time, cook time, and dietary information.</p>
          <p>🍜 You’ll find dishes from various cuisines—Indian, Italian, Thai, Chinese, and more!</p>
          <p>🍕 Our AI-powered recommendation system suggests meals based on your preferences and ingredients.</p>
          <p>🍣 Get real-time feedback from users who’ve tried the recipes and tweak them to your taste.</p>
          <p>🍰 Explore vegan, gluten-free, and low-calorie dishes without compromising on flavor!</p>
        </div>
      </div>

      {/* Direct Category Options */}
      <div style={styles.categoryOptionsContainer}>
        <h3 style={styles.categoryHeading}>Choose by Taste</h3>
        <div style={styles.categoryGrid}>
          <div
            style={styles.categoryItem}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = styles.categoryItemHover.backgroundColor; e.currentTarget.style.transform = styles.categoryItemHover.transform; e.currentTarget.style.boxShadow = styles.categoryItemHover.boxShadow; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = styles.categoryItem.backgroundColor; e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = styles.categoryItem.boxShadow; }}
            onClick={() => handleCategoryClick('spicy')}
          >Spicy</div>
          <div
            style={styles.categoryItem}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = styles.categoryItemHover.backgroundColor; e.currentTarget.style.transform = styles.categoryItemHover.transform; e.currentTarget.style.boxShadow = styles.categoryItemHover.boxShadow; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = styles.categoryItem.backgroundColor; e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = styles.categoryItem.boxShadow; }}
            onClick={() => handleCategoryClick('sweet')}
          >Sweet</div>
          <div
            style={styles.categoryItem}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = styles.categoryItemHover.backgroundColor; e.currentTarget.style.transform = styles.categoryItemHover.transform; e.currentTarget.style.boxShadow = styles.categoryItemHover.boxShadow; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = styles.categoryItem.backgroundColor; e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = styles.categoryItem.boxShadow; }}
            onClick={() => handleCategoryClick('salty')}
          >Salty</div>
          <div
            style={styles.categoryItem}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = styles.categoryItemHover.backgroundColor; e.currentTarget.style.transform = styles.categoryItemHover.transform; e.currentTarget.style.boxShadow = styles.categoryItemHover.boxShadow; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = styles.categoryItem.backgroundColor; e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = styles.categoryItem.boxShadow; }}
            onClick={() => handleCategoryClick('sour')}
          >Sour</div>
        </div>

        <h3 style={styles.categoryHeading}>Choose by Mood</h3>
        <div style={styles.categoryGrid}>
          <div
            style={styles.categoryItem}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = styles.categoryItemHover.backgroundColor; e.currentTarget.style.transform = styles.categoryItemHover.transform; e.currentTarget.style.boxShadow = styles.categoryItemHover.boxShadow; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = styles.categoryItem.backgroundColor; e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = styles.categoryItem.boxShadow; }}
            onClick={() => handleCategoryClick('coffee')}
          >Coffee</div>
          <div
            style={styles.categoryItem}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = styles.categoryItemHover.backgroundColor; e.currentTarget.style.transform = styles.categoryItemHover.transform; e.currentTarget.style.boxShadow = styles.categoryItemHover.boxShadow; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = styles.categoryItem.backgroundColor; e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = styles.categoryItem.boxShadow; }}
            onClick={() => handleCategoryClick('tea')}
          >Tea</div>
          <div
            style={styles.categoryItem}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = styles.categoryItemHover.backgroundColor; e.currentTarget.style.transform = styles.categoryItemHover.transform; e.currentTarget.style.boxShadow = styles.categoryItemHover.boxShadow; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = styles.categoryItem.backgroundColor; e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = styles.categoryItem.boxShadow; }}
            onClick={() => handleCategoryClick('cooldrinks')}
          >Cool Drinks</div>
          <div
            style={styles.categoryItem}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = styles.categoryItemHover.backgroundColor; e.currentTarget.style.transform = styles.categoryItemHover.transform; e.currentTarget.style.boxShadow = styles.categoryItemHover.boxShadow; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = styles.categoryItem.backgroundColor; e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = styles.categoryItem.boxShadow; }}
            onClick={() => handleCategoryClick('mocktails')}
          >Mocktails</div>
        </div>
      </div>

      {/* Feedback Section */}
      <div style={styles.feedbackSection}>
        <div style={styles.feedbackMarquee}>
          {/* Duplicate cards for continuous marquee effect */}
          {[...Array(2)].map((_, i) => (
            <React.Fragment key={i}>
              <div style={styles.feedbackCard}>
                <div style={styles.feedbackTitle}>Samantha 🍝</div>
                <div style={styles.feedbackContent}>The pasta recipe was amazing! My family loved it. The instructions were crystal clear.</div>
              </div>
              <div style={styles.feedbackCard}>
                <div style={styles.feedbackTitle}>Ravi 🍛</div>
                <div style={styles.feedbackContent}>Loved the South Indian Sambar recipe. Tasted just like my grandmother's!</div>
              </div>
              <div style={styles.feedbackCard}>
                <div style={styles.feedbackTitle}>Linda 🍰</div>
                <div style={styles.feedbackContent}>The chocolate cake turned out fluffy and moist. I'm impressed!</div>
              </div>
              <div style={styles.feedbackCard}>
                <div style={styles.feedbackTitle}>Mohit 🥘</div>
                <div style={styles.feedbackContent}>Thanks for the detailed paneer butter masala recipe. Easy and delicious!</div>
              </div>
              <div style={styles.feedbackCard}>
                <div style={styles.feedbackTitle}>Ayesha 🥗</div>
                <div style={styles.feedbackContent}>Perfect salad recipe with homemade dressing. Light and refreshing!</div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

// Styles object for the component
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2rem',
    width: '100%',
    boxSizing: 'border-box',
    // Visually appealing, warm yet light gradient background
    background: 'linear-gradient(135deg, #FFFAF0 0%, #FFF5E1 50%, #FFFAFA 100%)', // Creamy, soft, inviting gradient
    minHeight: '100vh',
    fontFamily: '"Poppins", sans-serif', // Modern, clean font (remember to import)
  },
  welcomeSection: {
    textAlign: 'center',
    padding: '3rem 2.5rem',
    maxWidth: '900px',
    width: '100%',
    background: 'rgba(255, 255, 255, 0.98)', // Almost opaque white for crispness
    borderRadius: '25px', // More rounded corners
    boxShadow: '0 15px 50px rgba(0, 0, 0, 0.08)', // Soft, subtle shadow
    border: '1px solid #FFE0B2', // A warm, soft orange border
    marginBottom: '3.5rem',
    boxSizing: 'border-box',
    animation: 'fadeInUp 1s ease-out', // Added a subtle fade-in animation
  },
  heading: {
    fontSize: '3.5rem',
    marginBottom: '0.8rem',
    color: '#8B4513', // Rich, warm brown
    fontFamily: '"Lora", serif', // Elegant serif font (remember to import)
    fontWeight: '700',
    letterSpacing: '0.05rem',
  },
  subheading: {
    fontSize: '1.6rem',
    color: '#A0522D', // Slightly lighter brown
    marginBottom: '2.5rem',
    fontFamily: '"Poppins", sans-serif',
    fontWeight: '300',
  },
  marquee: {
    color: '#FFA07A', // Soft, inviting coral
    fontSize: '1.3rem',
    margin: '1.8rem 0',
    fontWeight: '600',
    fontStyle: 'italic',
    textShadow: '0 1px 2px rgba(0,0,0,0.05)',
  },
  foodInfo: {
    textAlign: 'center', // Centered for general info
    margin: '2.5rem auto',
    fontSize: '1.15rem',
    color: '#696969', // Sophisticated dark grey
    lineHeight: '2', // Increased line height for readability
    maxWidth: '750px',
    fontFamily: '"Lato", sans-serif', // Clean sans-serif
    letterSpacing: '0.02rem',
  },
  categoryOptionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2.5rem',
    marginBottom: '3.5rem',
    width: '100%',
    maxWidth: '900px',
    background: 'rgba(255, 255, 255, 0.95)', // Slightly transparent white
    borderRadius: '25px',
    boxShadow: '0 15px 50px rgba(0, 0, 0, 0.05)',
    backdropFilter: 'blur(4px)', // Gentle blur
    padding: '3rem',
    border: '1px solid #FFDAB9', // Peach puff border
    animation: 'fadeInUp 1.2s ease-out', // Delayed fade-in
  },
  categoryHeading: {
    fontSize: '2.5rem',
    color: '#8B4513', // Consistent warm brown
    marginBottom: '1.5rem',
    fontFamily: '"Lora", serif',
    fontWeight: '600',
  },
  categoryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', // Slightly larger min-width
    gap: '1.8rem', // More space between items
    width: '100%',
    justifyContent: 'center',
  },
  categoryItem: {
    background: 'linear-gradient(45deg, #FFDAB9, #FFC0CB)', // Soft peach to pink gradient
    color: '#8B4513', // Text in warm brown
    padding: '1.5rem',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    borderRadius: '18px', // More rounded
    textAlign: 'center',
    cursor: 'pointer',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.08)',
    transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)', // Smoother animation curve
    border: '1px solid #F08080', // Light coral border
    fontFamily: '"Poppins", sans-serif',
    letterSpacing: '0.03rem',
  },
  categoryItemHover: {
    backgroundColor: '#FFECB3', // Lighter, warm yellow on hover
    transform: 'translateY(-8px) scale(1.03)', // More pronounced lift and slight scale
    boxShadow: '0 12px 30px rgba(255, 160, 122, 0.3)', // Glowy coral shadow
  },
  feedbackSection: {
    marginTop: '3rem',
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
    padding: '2.5rem 0',
    background: 'rgba(255, 255, 255, 0.9)', // Lighter background for the section
    borderRadius: '25px',
    boxShadow: '0 15px 50px rgba(0, 0, 0, 0.03)',
    border: '1px solid #FFDAB9',
    maxWidth: '900px',
    animation: 'fadeInUp 1.4s ease-out', // Further delayed fade-in
  },
  feedbackMarquee: {
    display: 'flex',
    gap: '2.5rem',
    animation: 'slide-left 40s linear infinite', // Slower animation for relaxed feel
    width: 'max-content',
    padding: '1.5rem 0',
  },
  feedbackCard: {
    background: '#effc7cff', // Very light, creamy background for cards
    border: '1px solid #FFDAB9',
    padding: '2rem',
    minWidth: '320px',
    maxWidth: '360px',
    borderRadius: '20px',
    boxShadow: '0 8px 25px rgba(0,0,0,0.06)',
    flexShrink: 0,
    transition: 'all 0.4s ease-in-out',
    '&:hover': {
      transform: 'translateY(-5px) rotateZ(1deg)', // Slight lift and tilt
      boxShadow: '0 10px 30px rgba(255,160,122,0.15)', // Enhanced shadow
    }
  },
  feedbackTitle: {
    fontWeight: 'bold',
    color: '#D2691E', // Chocolate color
    marginBottom: '0.8rem',
    fontSize: '1.3rem',
    fontFamily: '"Lora", serif',
  },
  feedbackContent: {
    fontSize: '1.05rem',
    color: '#8B4513', // Warm brown content
    fontFamily: '"Lato", sans-serif',
  },
  // Keyframes for animations
  '@keyframes slide-left': {
    '0%': { transform: 'translateX(0%)' },
    '100%': { transform: 'translateX(-50%)' },
  },
  '@keyframes fadeInUp': {
    '0%': { opacity: 0, transform: 'translateY(20px)' },
    '100%': { opacity: 1, transform: 'translateY(0)' },
  },
};

export default WelcomePage;