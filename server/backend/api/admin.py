from flask import Blueprint, jsonify, request
from werkzeug.security import generate_password_hash, check_password_hash

admin = Blueprint('admin', __name__)


@admin.route('/login-admin', methods=['POST'])
def admin_login():

     return jsonify({'status': True})