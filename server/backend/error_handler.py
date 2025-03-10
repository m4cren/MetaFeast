from flask import Blueprint, jsonify

error_handler = Blueprint("error_handler", __name__)


def handle404(error):
    return jsonify({"message": "not found"}), 404
