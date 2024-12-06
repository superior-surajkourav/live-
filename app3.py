from flask import Blueprint, request, jsonify
from firebase_config import db  # Importing the database connection

profile_route = Blueprint('profile', __name__)

@profile_route.route('/<user_id>', methods=['GET'])
def get_profile(user_id):
    # Fetch the user profile from Firebase by user ID
    user_doc = db.collection('users').document(user_id).get()
    if user_doc.exists:
        user_data = user_doc.to_dict()
        return jsonify(user_data)
    else:
        return jsonify({'message': 'User not found'}), 404
