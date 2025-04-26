from .extensions import db, socketio
from .db_config import save_data, delete_all_data, delete_data, generate_payment_id
from sqlalchemy import desc
from flask_socketio import SocketIO, emit
from .db_models import Table, TableRequest, Costumer, Orders, Products, PendingPayments

def generate_unique_payment_id(lenght = 8):
    while True:
        pid = generate_payment_id(lenght)
        if not PendingPayments.query.filter_by(payment_id = pid).first():
            return pid


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
    current_costumer.current_table = selected_table
    current_costumer.update_to_ordering()
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




@socketio.on('send-order')
def send_order(data):

    costumer_name = data.get('costumer_name')
    table_picked = data.get('table_picked')
    total_waiting_time = data.get('total_waiting_time')
    food_names = data.get('food_name')
    food_category = data.get('food_category')
    img = data.get('img')
    quantity = data.get('quantity')
    total_price = data.get('total_price')
    additional_order = data.get('additional_order')



    current_costumer = Costumer.query.filter_by(costumer_name = costumer_name).first()


    for order in range(len(food_names)):
        product_to_update = Products.query.filter_by(food_name = food_names[order]).first()
        product_to_update.quantity -= quantity[order]
        product_to_update.total_orders += quantity[order]

    if additional_order == 'No':
        new_order = Orders(costumer_name = current_costumer.costumer_name,
                        total_waiting_time = total_waiting_time,
                        current_costumer_id = current_costumer.id,
                        current_table = table_picked,
                        orders = [{'food_name': fn,
                                    'food_category': cat,
                                    'img': img,
                                    'quantity': q,
                                    'price': p
                                    } for fn, q, p, cat, img in zip(food_names, quantity, total_price, food_category, img)]
                        )
        
        db.session.add(new_order)

    elif additional_order == 'Yes':

        additional_orders = [{'food_name': fn,
                              'food_category': cat,
                              'img': img,
                              'quantity': q,
                              'price': p
                              } for fn, q, p, cat, img in zip(food_names, quantity, total_price, food_category, img)]
                        
        order = Orders.query.filter_by(current_table = table_picked).first()
        order.additional_order()
        
        current_orders = []

        for item in additional_orders:
            current_orders.append(item)

        for item in order.orders:    
            current_orders.append(item)

        order.orders = current_orders
        order.additional_orders = additional_orders

    db.session.commit()

    emit('push-to-admin', broadcast=True)


@socketio.on('deliver-order')
def deliver_order(data):
    costumer_name = data.get('costumer_name')
    table_id = data.get('table_id')

    response = {
        'costumer_name': costumer_name,
        'table_id': table_id
    }

    costumer_to_update = Costumer.query.filter_by(costumer_name = costumer_name).first()
    costumer_to_update.update_to_eating()
    table_to_update = Table.query.filter_by(table_name = table_id).first()
    table_to_update.update_to_eating()

    order_finished = Orders.query.filter(Orders.costumer_name == costumer_name and Orders.current_table == table_id).first()
    order_finished.serve()
    db.session.commit()

    emit('accept-order', response, broadcast=True )


@socketio.on('billing-request')
def billing_request(data):
    costumer_name = data.get('costumer_name')
    table_id = data.get('table_id')
    total_price = data.get('total_price')
    orders = data.get('orders')
  
    payment_id = generate_unique_payment_id()
    payment_type = data.get('payment_type')
    print('==========================================')
    print(f'Costumer Name: {costumer_name}')
    print(f'Payment ID: {payment_id}')
    print(f'Table ID: {table_id}')
    print(f'Total Price: {total_price}')
    print('Orders: ')
    for order in orders:
        print(f'{order['food_name']}:   {order['quantity']}       {order['price']}')
    print('=========================================')
   
    query_existing_payment = PendingPayments.query.filter_by(costumer_name = costumer_name).first()

    if not query_existing_payment:
        try:
            new_payment_request = PendingPayments(payment_id = payment_id,
                                                costumer_name = costumer_name,
                                                table_id = table_id,
                                                payment_type = payment_type,
                                                total_payment = total_price,
                                                orders = [{
                                                    'food_name': order['food_name'],
                                                    'quantity': order['quantity'],
                                                    'price': order['price'],
                                                    'img': order['img']
                                                }for order in orders])
            
            save_data(new_payment_request)

            costumer_to_update = Costumer.query.filter(Costumer.costumer_name == costumer_name and Costumer.current_table == table_id).first()
 
            costumer_to_update.update_to_billing()

            table_to_update = Table.query.filter_by(table_name = table_id).first()
            table_to_update.update_to_billing()

            

            
        except:
            print('error saving to the database')

    else:
        query_existing_payment.payment_type = payment_type
        query_existing_payment.total_payment = total_price

        
    db.session.commit()
    emit('push-to-admin-payment', broadcast=True)

   


@socketio.on('confirm-payment')
def confirm_payment(data):
    
    payment_id = data.get('payment_id')

    costumer_to_confirm = PendingPayments.query.filter_by(payment_id = payment_id).first()
    costumer_to_confirm.confirm()

    db.session.commit()

    print(costumer_to_confirm)

    response = {
        'costumer_name': costumer_to_confirm.costumer_name,
      
    }

    emit('push-to-costumer', {'response': response}, broadcast=True)

@socketio.on('update-costumer-to-billing')
def notify_the_admin():

    emit('notify_the_admin', broadcast=True)


@socketio.on('notify-costumer-exit')
def notify_costumer_exit():

    print('someone exit')

    emit('notify-admin-costumer-exit', broadcast=True)




        

   
    


    


    