from flask import Flask, jsonify
from flask_cors import CORS
from db import engine
from models import Base

app = Flask(__name__)
CORS(app)

# Create tables automatically
Base.metadata.create_all(bind=engine)

@app.route("/api/health")
def health():
    return jsonify({"ok": True})

if __name__ == "__main__":
    app.run(debug=True)