# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import hashlib # For hashing passwords

# Imports for email sending
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

app = Flask(__name__)
# Enable CORS for all origins. In a production environment, you should restrict this
# to only your frontend's domain (e.g., CORS(app, resources={r"/api/*": {"origins": "http://yourfrontend.com"}}))
CORS(app)

DATABASE = 'users.db'

# --- Email Configuration ---
# IMPORTANT: Replace with your actual Gmail credentials and recipient email
SENDER_EMAIL = '224g1a0524@srit.ac.in' # Your Gmail address
SENDER_PASSWORD = 'tzox rgln wpvn iruh' # Your Gmail App Password (NOT your regular password if 2FA is on)
RECEIVER_EMAIL = '224g1a0524@srit.ac.in' # The email address where you want to receive feedback

# SMTP server details for Gmail
SMTP_SERVER = 'smtp.gmail.com'
SMTP_PORT = 587 # For TLS

def init_db():
    """Initializes the SQLite database and creates the users table."""
    with sqlite3.connect(DATABASE) as conn:
        cursor = conn.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT NOT NULL UNIQUE,
                email TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL
            )
        ''')
        conn.commit()
    print("Database initialized and 'users' table ensured.")

def hash_password(password):
    """Hashes a password using SHA-256."""
    return hashlib.sha256(password.encode()).hexdigest()

@app.route('/')
def index():
    """A simple index route to confirm the server is running."""
    return "Flask backend is running for RecipeHub!"

@app.route('/signup', methods=['POST'])
def signup():
    """Handles user registration."""
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not email or not password:
        return jsonify({'error': 'Missing username, email, or password'}), 400

    hashed_password = hash_password(password)

    try:
        with sqlite3.connect(DATABASE) as conn:
            cursor = conn.cursor()
            cursor.execute("INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
                           (username, email, hashed_password))
            conn.commit()
        return jsonify({'message': 'User registered successfully!'}), 201
    except sqlite3.IntegrityError:
        # This error occurs if username or email already exists (due to UNIQUE constraint)
        return jsonify({'error': 'Username or email already exists.'}), 409
    except Exception as e:
        print(f"Error during signup: {e}")
        return jsonify({'error': 'An internal server error occurred.'}), 500

@app.route('/signin', methods=['POST'])
def signin():
    """Handles user login."""
    data = request.get_json()
    username = data.get('username') # Can be username or email for login
    password = data.get('password')

    if not username or not password:
        return jsonify({'error': 'Missing username/email or password'}), 400

    hashed_password = hash_password(password)

    with sqlite3.connect(DATABASE) as conn:
        cursor = conn.cursor()
        # Check if user exists by username or email
        cursor.execute("SELECT * FROM users WHERE (username = ? OR email = ?) AND password = ?",
                       (username, username, hashed_password))
        user = cursor.fetchone()

    if user:
        # In a real application, you would create a session or JWT here
        return jsonify({'message': 'Sign in successful!', 'username': user[1]}), 200
    else:
        return jsonify({'error': 'Invalid username/email or password'}), 401

@app.route('/send_feedback', methods=['POST'])
def send_feedback():
    """Handles sending feedback email from the contact form."""
    data = request.get_json()
    sender_name = data.get('name')
    sender_email = data.get('email')
    message_body = data.get('message')

    if not sender_name or not sender_email or not message_body:
        return jsonify({'error': 'Missing name, email, or message in feedback'}), 400

    try:
        msg = MIMEMultipart()
        msg['From'] = SENDER_EMAIL
        msg['To'] = RECEIVER_EMAIL
        msg['Subject'] = f"New Feedback from RecipeHub Contact Form: {sender_name}"

        body = f"Name: {sender_name}\nEmail: {sender_email}\n\nMessage:\n{message_body}"
        msg.attach(MIMEText(body, 'plain'))

        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls() # Enable TLS encryption
            server.login(SENDER_EMAIL, SENDER_PASSWORD)
            text = msg.as_string()
            server.sendmail(SENDER_EMAIL, RECEIVER_EMAIL, text)

        return jsonify({'message': 'Feedback sent successfully!'}), 200
    except Exception as e:
        print(f"Error sending email: {e}")
        return jsonify({'error': f'Failed to send feedback: {str(e)}. Please check server logs.'}), 500


if __name__ == '__main__':
    init_db() # Initialize database when the app starts
    app.run(debug=True) # Run in debug mode for development (auto-reloads on changes)