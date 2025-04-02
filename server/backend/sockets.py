from .extensions import db, socketio
from .db_config import save_data, delete_all_data, delete_data
from sqlalchemy import desc
from flask_socketio import SocketIO, emit
from .db_models import Table, TableRequest, Costumer, Orders


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

    current_costumer = Costumer.query.filter_by(costumer_name = costumer_name).first()
    costumerID = current_costumer.id

    print(f'{costumer_name} is accepted to seat on table {selected_table}')

    change_table_status = Table.query.filter_by(table_name = selected_table).first()
    change_table_status.isAvailable = False
    change_table_status.current_costumer_name = current_costumer.costumer_name
    change_table_status.current_costumer_id = costumerID
    change_table_status.update_to_ordering()

    remove_table_request = TableRequest.query.filter(TableRequest.table_id == selected_table and TableRequest.costumer_name == costumer_name).first()
    delete_data(remove_table_request)
    

    response = {
        'costumer_name': costumer_name,
        'selected_table': selected_table
    }

    emit('is-costumer-accepted', response, broadcast=True)

@socketio.on('deny-request')
def accept_request(data):

    costumer_name = data.get('costumer_name')
    selected_table = data.get('table_selected')
    message = data.get('message')

    remove_table_request = TableRequest.query.filter(TableRequest.table_id == selected_table and TableRequest.costumer_name == costumer_name).first()
    delete_data(remove_table_request)

    current_costumer_to_deny = Costumer.query.filter_by(costumer_name = costumer_name).first()
    delete_data(current_costumer_to_deny)

    print(message)
    response = {
        'costumer_name': costumer_name,
        'selected_table': selected_table,
        'message': message
    }

    emit('is-costumer-denied', response, broadcast=True)


# export type OrderType = {
#     category: string;
#     img: string;
#     food_name: string;
#     quantity: number;
#     price: number;
#     calories: number;
#     waiting_time: number;
#     base_price: number;
#     base_calories: number;
# };

@socketio.on('send-order')
def send_order(data):

    costumer_name = data.get('costumer_name')
    table_picked = data.get('table_picked')
    food_names = data.get('food_name')
    food_category = data.get('food_category')
    img = data.get('img')
    quantity = data.get('quantity')
    total_price = data.get('total_price')


  

    current_costumer = Costumer.query.filter_by(costumer_name = costumer_name).first()

    
    new_order = Orders(costumer_name = current_costumer.costumer_name,
                       current_costumer_id = current_costumer.id,
                       current_table = table_picked,
                       orders = [{'food_name': fn,
                                  'food_category': cat,
                                  'img': img
,                                  'quantity': q,
                                  'price': p
                                  } for fn, q, p, cat, img in zip(food_names, quantity, total_price, food_category, img)]
                       )
    
    db.session.add(new_order)

    db.session.commit()

    emit('push-to-admin', broadcast=True)


   

        

   
    


    


    