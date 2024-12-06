from flask import Flask, request, jsonify
from flask_cors import CORS  # Import Flask-CORS
import firebase_admin
from firebase_admin import credentials, firestore
from firebase_admin import auth
import bcrypt

# Initialize Firebase
cred = credentials.Certificate("live-69c93-firebase-adminsdk-dhmtt-fe9f8328e2.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    
    # Hash the password before saving it
    hashed_password = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    # Save user data in Firestore
    user_data = {
        "username": data['username'],
        "email": data['email'],
        "password": hashed_password,  # Save hashed password
        "phone": data['phone'],
    }

    # Create a new user in the 'users' collection
    db.collection('users').add(user_data)
    
    # Optional: Add initial feed data or profile details
    db.collection('feed').add({
        "user_id": data['email'],  # Assuming email as unique identifier
        "posts": []
    })
    
    # Respond with success
    return jsonify({'message': 'User registered successfully!'})
if __name__ == "__main__":
    app.run(debug=True)
    print("Flask app is running...")

