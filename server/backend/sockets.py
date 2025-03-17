from .extensions import db, socketio
from .db_config import save_data
from sqlalchemy import desc
from flask_socketio import SocketIO, emit
from .db_models import Table


@socketio.on("connect")
def connect():

    print("client connected")


@socketio.on('check-table-status')
def table_status(data):

    tableID = data.get('table_id')

    table_selected = Table.query.filter_by(table_name = tableID).first()

    if(table_selected.isAvailable):
        print(f'Table {table_selected.table_name} is Available')
    else:
         print(f'Table {table_selected.table_name} is Occupied')


    