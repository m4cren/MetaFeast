from flask import Blueprint, jsonify, request
from ..db_models import Table
from ..extensions import db, jwt_required
from ..db_config import save_data, delete_all_data, delete_data

tables = Blueprint('tables', __name__)

@tables.route('/get-table-status', methods=['GET'])
def table_status():
     tables = Table.query.all()

     tables_status = [
          {'table_name': table.table_name,
          'table_status': 'Available' if table.isAvailable else 'Occupied',
          'table_type': table.table_type,
          'table_position': table.get_position(),
          'costumer_name': table.current_costumer_name,
          'costumer_status': table.current_costumer_status
          } for table in tables
     ]
   
     return jsonify({'message': 'success', 'status': True, 'tables': tables_status})

@tables.route('/get-table-details', methods=['POST'])
def table_details():
     data = request.json
     table_id = data.get('table_id')

     selected_table = Table.query.filter_by(table_name = table_id).first()
     response = selected_table.to_dict()

     return jsonify({'message': 'success', 'status': True, 'table_detail': response})

# class Table(db.Model):
#     __tablename__ = "table_status"
#     id = db.Column(db.Integer, primary_key=True)
#     table_name = db.Column(db.String(10), nullable=False, unique = True)
#     table_type = db.Column(db.String(20), nullable=False)
#     table_position_x = db.Column(db.Float(), nullable = True)
#     table_position_y= db.Column(db.Float(), nullable = True)
#     table_position_z = db.Column(db.Float(), nullable = True)
#     isAvailable = db.Column(db.Boolean, default=True)
#     current_costumer_name = db.Column(db.String(56), nullable=True, default="AVAILABLE")
#     current_costumer_id = db.Column(
#         db.Integer, db.ForeignKey("costumer.id"), nullable=True
#     )
#     current_costumer_status = db.Column(db.String(56), default='Available')

