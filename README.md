RecipeHub Project Documentation

This document provides comprehensive documentation for the RecipeHub application, detailing its architecture, technologies used, setup instructions, and key functionalities.

1. Introduction to RecipeHub
RecipeHub is a web application designed to be a central hub for discovering, managing, and interacting with various recipes. It provides a user-friendly interface for authentication (signup/signin), browsing different recipe categories, viewing detailed recipe information, and even interacting with an AI-powered chatbot for recipe assistance.

2. Technologies Used
The RecipeHub application is built using a modern full-stack architecture, separating the frontend and backend concerns.

Frontend:

React JS: A JavaScript library for building user interfaces. It provides a component-based structure for developing interactive and dynamic web pages.

React Router DOM: A library for declarative routing in React applications, enabling navigation between different pages without full page reloads.

CSS-in-JS (Inline Styles): Styling is primarily handled using JavaScript objects for inline styles, with some global CSS embedded for base styling and animations.

Backend:

Flask: A lightweight Python web framework used for building the RESTful API that serves data to the frontend.

Flask-CORS: A Flask extension for handling Cross-Origin Resource Sharing (CORS), allowing the frontend (running on a different origin) to communicate with the backend.

SQLite3: A C-language library that implements a small, fast, self-contained, high-reliability, full-featured, SQL database engine. It's used as the database for storing user and recipe data.

Requests: A Python HTTP library used by the Flask backend to make external API calls, specifically to the Gemini API for the chatbot functionality.

Google Gemini API: A powerful large language model used to power the chatbot, providing AI-driven responses to user queries about recipes.

3. Project Structure
The project is typically organized into two main directories: frontend (for the React application) and backend (for the Flask application).

recipehub/
├── backend/
│   ├── app.py                  # Flask application entry point, API endpoints
│   ├── instance/               # Flask instance folder (e.g., for sqlite.db)
│   │   └── sqlite.db           # SQLite database file
│   └── requirements.txt        # Python dependencies
├── frontend/
│   ├── public/
│   │   └── index.html          # Main HTML file
│   ├── src/
│   │   ├── App.js              # Main React component, global layout, routing
│   │   ├── index.js            # React application entry point
│   │   ├── components/
│   │   │   ├── AuthContent.jsx       # Handles signup/signin forms
│   │   │   ├── WelcomePage.jsx       # Post-login welcome dashboard
│   │   │   ├── ContactPage.jsx       # Contact form
│   │   │   ├── RecipeListPage.jsx    # Displays list of recipes for a category
│   │   │   ├── RecipeDetailPage.jsx  # Displays details of a single recipe
│   │   │   ├── RecipeCategoriesPage.jsx # NEW: Page to list recipe categories
│   │   │   └── ChatbotPage.jsx       # NEW: Chatbot interface
│   │   │   └── (OtherRecipePages).jsx # Individual recipe detail pages
│   │   └── (other React components and assets)
│   ├── package.json            # Node.js dependencies
│   └── yarn.lock / package-lock.json
└── README.md                   # Project README

4. Backend (Flask & SQLite3)
Setup
Navigate to the backend directory:

cd backend

Create a Python Virtual Environment (recommended):

python -m venv venv

Activate the Virtual Environment:

On Windows: .\venv\Scripts\activate

On macOS/Linux: source venv/bin/activate

Install Dependencies:

pip install -r requirements.txt

(Ensure requirements.txt contains Flask, Flask-CORS, requests, etc.)

Database (SQLite3)
SQLite3 is a file-based database, meaning your database is a single file (e.g., sqlite.db) within your instance folder.

Database Schema: You'll need to define your database schema. For a recipe app, this would typically include tables for users (username, email, password_hash) and recipes (name, ingredients, instructions, category, etc.).

Initialization: Flask applications often have a script or a function to initialize the database if it doesn't exist. This involves creating tables.

Example (in app.py or a separate db.py):

import sqlite3

DATABASE = 'instance/sqlite.db'

def init_db():
    with app.app_context():
        db = get_db()
        with app.open_resource('schema.sql', mode='r') as f:
            db.cursor().executescript(f.read())
        db.commit()

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
        db.row_factory = sqlite3.Row # This makes rows behave like dicts
    return db

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

You would also need a schema.sql file in your backend directory:

-- schema.sql
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS recipes;

CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL -- In production, store hashed passwords!
);

CREATE TABLE recipes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    ingredients TEXT NOT NULL,
    instructions TEXT NOT NULL,
    image_url TEXT,
    youtube_url TEXT
);

You can call init_db() once to set up your database, e.g., from a separate script or when the app first runs if the DB file doesn't exist.

Key Endpoints (app.py)
/signup (POST):

Receives username, email, password.

Validates input, hashes password (crucial for security), and stores user in sqlite.db.

Returns success message or error.

/signin (POST):

Receives username (or email) and password.

Authenticates user against sqlite.db (verifying hashed password).

Returns success message and potentially an authentication token (JWT recommended for real apps).

/chatbot (POST):

Receives message from the React frontend.

Constructs a payload and makes a POST request to the Google Gemini API.

Parses the Gemini API response and extracts the AI's text reply.

Returns the AI's response to the frontend.

Recipe Endpoints (Example):

/recipes/<category> (GET): Fetches a list of recipes based on category from the database.

/recipe/<id> (GET): Fetches detailed information for a specific recipe by ID.

/recipes (POST): (Admin/Authenticated User) Adds a new recipe to the database.

Running the Backend
Ensure your virtual environment is activated.

Run the Flask application:

python app.py

The server will typically run on http://127.0.0.1:5000.

5. Frontend (React JS)
Setup
Navigate to the frontend directory:

cd frontend

Install Node.js Dependencies:

npm install
# or
yarn install

Component Structure
App.js: This is the main entry point for your React application's routing. It uses react-router-dom to define different paths (/, /welcome, /contact, /recipes-categories, /recipes/:type, /recipe/:id, /chatbot). It also manages the global authentication state (isAuthenticated) and passes it down to ProtectedRoute to guard sensitive routes.

AuthContent.jsx: This component is responsible for rendering the initial "Home" content, as well as the "Sign Up" and "Sign In" forms. It manages its internal view state (currentView) and communicates with the Flask backend for authentication.

WelcomePage.jsx: A dedicated page displayed after successful user authentication.

ContactPage.jsx: A form for users to send messages or inquiries.

RecipeCategoriesPage.jsx (New): This component would display different categories of recipes (e.g., Indian, Italian, Desserts, Beverages), allowing users to navigate to a list of recipes within that category.

RecipeListPage.jsx: Displays a list of recipes for a specific category (e.g., /recipes/indian). It would fetch data from the Flask backend.

RecipeDetailPage.jsx: Shows the detailed view of a single recipe, including ingredients, instructions, nutritional value, and potentially a YouTube link.

ChatbotPage.jsx (New): This component provides the interactive chatbot interface. It manages the chat history, user input, and sends messages to the Flask backend's /chatbot endpoint.

React-Flask Interaction
The React frontend communicates with the Flask backend using fetch API calls.

For authentication (/signup, /signin), the frontend sends user credentials to Flask.

For the chatbot (/chatbot), the frontend sends user queries to Flask, which then relays them to the Gemini API.

The API_BASE_URL constant (http://127.0.0.1:5000) in the React components must match the address where your Flask backend is running.

CORS: Flask-CORS on the backend is essential to allow cross-origin requests from your React development server (typically http://localhost:3000) to your Flask backend.

Styling
The application uses a combination of global CSS embedded directly in App.js and inline styles defined within JavaScript objects (styles). This approach allows for component-specific styling while maintaining a consistent visual theme. Hover effects and basic animations are also implemented using inline styles and CSS keyframes.

6. Chatbot Integration
The chatbot functionality is a key feature, leveraging Google's Gemini API:

Frontend (ChatbotPage.jsx):

Maintains messages state to display the conversation.

Captures user input in inputMessage.

sendMessage function sends the user's message to the Flask backend's /chatbot endpoint.

Displays a loading indicator (isLoading) while waiting for a response.

Auto-scrolls the chat window to the latest message.

Backend (app.py):

The /chatbot endpoint receives the user's message.

It constructs a request to the gemini-2.0-flash model via the Google Gemini API.

The prompt sent to Gemini includes a system instruction (e.g., "You are a helpful recipe assistant.") to guide the AI's responses.

The AI's response is extracted from the Gemini API's JSON output and sent back to the React frontend.

Includes basic error handling for API communication issues.

7. Setup & Running the Application
To get the entire RecipeHub application running:

Clone the Repository (if applicable):

git clone <your-repo-url>
cd recipehub

Backend Setup:

Navigate to the backend directory: cd backend

Create and activate a virtual environment: python -m venv venv and source venv/bin/activate (Linux/macOS) or .\venv\Scripts\activate (Windows).

Install dependencies: pip install -r requirements.txt (ensure Flask, Flask-CORS, requests are in requirements.txt).

(Optional, but recommended for initial setup) If you have a schema.sql and init_db() function, run it once to create your database tables.

Start the Flask server: python app.py

Leave this terminal window open.

Frontend Setup:

Open a new terminal window.

Navigate to the frontend directory: cd frontend

Install Node.js dependencies: npm install or yarn install.

Start the React development server: npm start or yarn start

This will usually open the application in your browser at http://localhost:3000.

Now, your RecipeHub application should be fully operational, with the React frontend communicating with the Flask backend and the chatbot powered by Gemini.

8. Future Enhancements
Database Integration: Implement full CRUD (Create, Read, Update, Delete) operations for recipes, allowing authenticated users (e.g., admins) to add, edit, and delete recipes.

User Profiles: Expand user management to include profile pages, saved recipes, and personalized recommendations.

Search and Filtering: Implement robust search and filtering capabilities for recipes based on ingredients, cuisine, dietary restrictions, etc.

Recipe Submission: Allow users to submit their own recipes, possibly with a moderation system.

Rating and Reviews: Enable users to rate and review recipes.

Image Uploads: Integrate image upload functionality for recipes (using cloud storage like AWS S3 or Google Cloud Storage, not directly in SQLite).

Improved Chatbot: Enhance the chatbot's capabilities to provide more specific recipe suggestions, ingredient substitutions, or cooking tips by potentially giving it access to your recipe database.

Advanced Styling: Transition to a CSS framework like Tailwind CSS or a more robust CSS-in-JS library for better maintainability and scalability of styles.

Error Handling & UX: Implement more user-friendly error messages and loading states across the application.

Deployment: Prepare the application for deployment to a cloud platform (e.g., Heroku, Google Cloud Run, AWS Elastic Beanstalk).
