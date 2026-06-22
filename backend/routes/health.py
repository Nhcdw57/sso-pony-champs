from flask import Blueprint, jsonify

health_bp = Blueprint("health", __name__,url_prefix="/api/health")

@health_bp.route("/")
def health():
    return jsonify({"ok": True})