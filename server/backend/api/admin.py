from flask import Blueprint, jsonify, request
from werkzeug.security import generate_password_hash, check_password_hash
from ..extensions import db
from ..db_models import AdminCredentials, TableRequest
from sqlalchemy import desc

admin = Blueprint("admin", __name__)


@admin.route('/admin-login', methods=['POST'])
def admin_login():
     data = request.json

     password = data.get('password')

     admin = AdminCredentials.query.first()

     if check_password_hash(admin.admin_password, password):
          print('success')
          return jsonify({'message': 'Success', 'status': True})
     else:
          print('error')
          return jsonify({'message': 'Wrong password', 'status': False})
     
@admin.route('/admin/table-request', methods=['GET'])
def admin_table_request():

     table_requests = TableRequest.query.order_by(desc(TableRequest.id)).all()

     for i in table_requests:
          print(i.to_dict())

     response = [request.to_msg() for request in table_requests]

     return jsonify({'status': True, 'response': response})

     