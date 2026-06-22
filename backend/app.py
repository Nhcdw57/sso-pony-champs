from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os
from routes.health import health_bp
from routes.races import races_bp
from extensions import db, migrate

load_dotenv()
app = Flask(__name__)
CORS(app)

DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL is not set")
app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URL
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)
migrate.init_app(app, db)

app.register_blueprint(health_bp)
app.register_blueprint(races_bp)



if __name__ == "__main__":
    app.run(debug=True)