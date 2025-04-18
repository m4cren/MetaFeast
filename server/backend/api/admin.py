from flask import Blueprint, jsonify, request
from werkzeug.security import generate_password_hash, check_password_hash
from ..extensions import db
from ..db_models import AdminCredentials, TableRequest, Costumer
from sqlalchemy import desc
from ..db_config import time_ago

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


     response = [{
          'costumer_name': request.costumer_name,
          'table_selected': request.table_id,
          'message':request.to_msg(),
          'time_ago':time_ago(request.date_time)  
     } for request in table_requests 
       ]



     return jsonify({'status': True, 'response': response})


@admin.route('/admin/current-costumers', methods=['GET'])
def get_current_costumers():

     

     try:
          current_costumers = Costumer.query.filter(Costumer.current_table != 'Undecided').order_by(desc(Costumer.id)).all()
          print(current_costumers)
          response = [{
               'costumer_name': costumer.costumer_name,
               'current_table': costumer.current_table,
               'status': costumer.status,
               'time': time_ago(costumer.date_time)
          }for costumer in current_costumers]

          return jsonify({'msg': 'Success', 'current_costumers': response})
     
     except:
          print('error')
          return jsonify({'msg': 'error'})

     # const dataToSend = {
     #        product_ratings: productReview,
     #        email:
     #            serviceReview.email.length <= 0
     #                ? "Anonymous"
     #                : serviceReview.email,
     #        comment: serviceReview.comment,
     #        name: myOrders?.costumer_name,
     #    };

     #    const sendToAdmin = async () => {
     #        try {
     #            const response = await axios.post(
     #                `${server}/admin/recieve-rating`,
     #                dataToSend,
     #            );

     #            console.dir(response.data);
     #        } catch (error) {
     #            console.log(error);
     #        }
     #    };

@admin.route('/admin/recieve-rating', methods=['POST'])
def receive_rating():
     data = request.json

     email = data.get('email')
     name =data.get('name')
     comment = data.get('comment')
     product_ratings = data.get('product_ratings')

     print('===================================================================')
     print(f'Email: {email}')
     print(f'Name: {name}')
     print(f'Comment: {comment}')
     
     for x in product_ratings:
          print(f'{x['food_name']} : Ratings: {x['rating']}')
     print('===================================================================')


     return jsonify({'msg': 'Success', 'status': True})