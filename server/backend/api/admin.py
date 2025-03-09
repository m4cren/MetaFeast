from flask import Blueprint, jsonify, request
from werkzeug.security import generate_password_hash, check_password_hash

admin = Blueprint("admin", __name__)

