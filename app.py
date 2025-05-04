from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
from pymongo import MongoClient
from config import Config
import os

app = Flask(__name__, static_folder="../frontend/dist", static_url_path="/")
CORS(app)

# MongoDB Setup
client = Config.get_mongo_client()
if client:
    db = client["docgenie_db"]
    appointments = db.appointments
    patients = db.patients
    doctors = db.doctors
    admins = db.admins
else:
    db = None

# Serve React frontend (index.html)
@app.route("/")
def serve_home():
    return send_from_directory(app.static_folder, "index.html")

# Serve static files (JS, CSS, etc.)
@app.route("/<path:path>")
def static_proxy(path):
    file_path = os.path.join(app.static_folder, path)
    if os.path.exists(file_path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, "index.html")

# POST: Book an appointment
@app.route("/appointments", methods=["POST"])
def book_appointment():
    if not db:
        return jsonify({"error": "Database connection failed"}), 500
    
    data = request.json
    required_fields = ["name", "email", "department", "time"]
    
    if not all(field in data and data[field] for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400

    try:
        appointments.insert_one(data)
        return jsonify({"message": "Appointment booked successfully!"}), 201
    except Exception as e:
        return jsonify({"error": f"Failed to book appointment: {e}"}), 500

if __name__ == "__main__":
    app.run(debug=True)
