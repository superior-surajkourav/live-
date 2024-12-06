from flask import Blueprint, request, jsonify
from firebase_config import db  # Importing the database connection

feed_route = Blueprint('feed', __name__)

@feed_route.route('/', methods=['GET'])
def get_feed():
    # Fetch all posts from Firebase (assuming you have a 'posts' collection)
    posts_ref = db.collection('posts').stream()
    
    posts = []
    for post in posts_ref:
        posts.append(post.to_dict())
    
    return jsonify(posts)

@feed_route.route('/post', methods=['POST'])
def create_post():
    data = request.get_json()
    post_data = {
        "username": data['username'],
        "content": data['content'],
        "timestamp": firestore.SERVER_TIMESTAMP
    }
    
    # Add new post to Firebase 'posts' collection
    db.collection('posts').add(post_data)
    
    return jsonify({'message': 'Post created successfully!'})
