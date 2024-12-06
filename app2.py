from flask import Blueprint, request, jsonify
from firebase_config import db  # Importing the database connection

signup_route = Blueprint('signup', __name__)

@signup_route.route('/', methods=['POST'])
def signup():
    data = request.get_json()
    user_data = {
        "username": data['username'],
        "email": data['email'],
        "password": data['password'],  # Ensure password is hashed if needed
        "phone": data['phone']
    }
    
    # Add user to Firebase 'users' collection
    db.collection('users').add(user_data)
    
    return jsonify({'message': 'User registered successfully!'})
