import firebase_admin
from firebase_admin import credentials, firestore

# Initialize Firebase (using the same JSON file for all modules)
cred = credentials.Certificate("live-69c93-firebase-adminsdk-dhmtt-fe9f8328e2.json")
firebase_admin.initialize_app(cred)

# Database connection
db = firestore.client()
