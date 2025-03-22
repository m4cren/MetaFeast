from .extensions import db, socketio
from .db_config import save_data
from sqlalchemy import desc
from flask_socketio import SocketIO, emit
from .db_models import Table, TableRequest


@socketio.on("connect")
def connect():

    print("client connected")


@socketio.on('request-table')
def table_status(data):

    tableID = data.get('table_id')
    costumerName = data.get('costumer_name')

    new_table_request = TableRequest(costumer_name = costumerName, table_id = tableID)
    save_data(new_table_request)

    response = {
        'message':f'{costumerName} is requesting to seat on table {tableID}',
        'costumerName': costumerName,
        'tableID': tableID
    }

    print(response)

    emit('notify-admin', response, broadcast=True)

@socketio.on('accept-request')
def accept_request(data):

    costumer_name = data.get('costumer_name')
    selected_table = data.get('table_selected')

    print(f'{costumer_name} is accepted to seat on table {selected_table}')

    response = {
        'costumer_name': costumer_name,
        'selected_table': selected_table
    }

    emit('is-costumer-accepted', response, broadcast=True)

@socketio.on('deny-request')
def accept_request(data):

    costumer_name = data.get('costumer_name')
    selected_table = data.get('table_selected')

    print(f'{costumer_name} is denied to seat on table {selected_table}')
    response = {
        'costumer_name': costumer_name,
        'selected_table': selected_table
    }

    emit('is-costumer-denied', response, broadcast=True)




    


    