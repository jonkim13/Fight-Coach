from flask import Flask, jsonify, request
import firebase_admin
from firebase_admin import credentials 


#Register Imports
from routes.auth import auth_bp



app = Flask(__name__)

# Initialize Firebase Admin
cred = credentials.Certificate('serviceAccountKey.json')
firebase_admin.initialize_app(cred)


# Register blueprints
app.register_blueprint(auth_bp)


@app.route('/')
def home():
    return jsonify({"message": "Hello from Flask + Firebase!"})

if __name__ == '__main__':
    app.run(debug=True)
