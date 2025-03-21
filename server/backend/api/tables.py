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
          'table_position': table.get_position()
          } for table in tables
     ]

     

   
     return jsonify({'message': 'success', 'status': True, 'tables': tables_status})