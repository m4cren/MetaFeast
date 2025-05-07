from flask import Blueprint, jsonify, request, json
from werkzeug.security import  check_password_hash
from werkzeug.utils import secure_filename
from ..extensions import db
from ..db_models import AdminCredentials, TableRequest, Costumer, Reviews, CostumerHistory, Products, Orders,  PendingPayments,Table
from sqlalchemy import desc, asc
import os
from ..db_config import time_ago, save_data, delete_data

import random

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
     ratings = data.get('ratings')
     order_items = data.get('order_items')
     total_spend = data.get('total_spend')
  




     print('===================================================================')
     print(f'Email: {email}')
     print(f'Name: {name}')
     print(f'Comment: {comment}')
     print(f'Ratings: {ratings}')
     print(f'total_spend: {total_spend}')
     print(f'order_items: {order_items}')
     
     for x in product_ratings:

          rated_product = Products.query.filter_by(food_name = x['food_name']).first()

       

          if x['rating'] > 0:
               rated_product.total_ratings += 1
               rated_product.get_ratings(x['rating'])
          else:
               print(f'{x['food_name']} got no reviews')

          
          

          print(f'{x['food_name']} : Ratings: {x['rating']}')
     print('===================================================================')

     db.session.commit()

     try: 
          random_gender = random.randint(0,1)

          gender = ''
          
          if random_gender == 0:
               gender = 'boy'
          elif random_gender == 1:
               gender = 'girl'

     

          new_reviews = Reviews(email = email,
                                ratings = ratings,
                                name = name,
                                comment = comment,
                                img_profile_url = f'https://avatar.iran.liara.run/public/{gender}?username={name}',
                                order_items = order_items,
                                total_spend= total_spend)

          
          save_data(new_reviews)




          
     except KeyError:
          print(KeyError)


     return jsonify({'msg': 'Success', 'status': True})


@admin.route('/admin/fetch-reviews',methods=['GET'])
def fetch_reviews():

     get_reviews = Reviews.query.order_by(desc(Reviews.date)).all()
     

     if get_reviews:

          reviews = [ review.to_dict() for review in get_reviews]

          return jsonify({'msg': 'Success', 'status': True, 'reviews': reviews})
     
     return jsonify({'msg': 'No reviews', 'status': False})


@admin.route('/admin/fetch-history', methods=['GET'])
def fetch_histories():
     get_history_desc = CostumerHistory.query.order_by(desc(CostumerHistory.dine_time)).all()
     get_history = CostumerHistory.query.order_by(asc(CostumerHistory.dine_time)).all()

     if get_history or get_history_desc:
          histories_desc = [history.to_dict() for history in get_history_desc]
          histories = [history.to_dict() for history in get_history]

          return jsonify({'msg': 'Success', 'status': True, 'histories': histories, 'histories_desc': histories_desc})
     
     return jsonify({'msg': 'No history', 'status': False, 'histories': 'empty'})

     #    formData.append("food_name_orig", newProductDetails.food_name_orig);
     #    formData.append("food_name", newProductDetails.food_name);
     #    formData.append("cusine_category", newProductDetails.cusine_category);
     #    formData.append("calories", String(newProductDetails.calories));
     #    formData.append("quantity", String(newProductDetails.quantity));
     #    formData.append(
     #        "product_price",
     #        String(newProductDetails.product_price),
     #    );
     #    formData.append("waiting_time", String(newProductDetails.waiting_time));
     #    formData.append("short_desc", newProductDetails.short_desc);
     #    formData.append("full_details", newProductDetails.full_details);

     #    if (newProductDetails.imgFile) {
     #        formData.append("new_img_file", newProductDetails.imgFile);


@admin.route('/admin/update-product', methods=['POST'])
def update_product():

     food_name_orig = request.form.get('food_name_orig')
     food_name = request.form.get("food_name")
     cusine_category = request.form.get("cusine_category")
     calories = request.form.get("calories")
     quantity = request.form.get("quantity")
     product_price = request.form.get("product_price")
     waiting_time = request.form.get("waiting_time")
     short_desc = request.form.get("short_desc")
     full_details = request.form.get("full_details")

     new_img_file = request.files.get("new_img_file")
     

     try:
          selected_product = Products.query.filter_by(food_name = food_name_orig).first()

          
    
          if (selected_product):

               if new_img_file :
                    
                    print(os.getcwd())
                   
                    filename = secure_filename(new_img_file.filename)
                    project_root = os.path.abspath(os.path.join(os.getcwd(), '..'))
                    UPLOAD_FOLDER = os.path.join(project_root, 'client', 'public', 'images', 'products')
                    os.makedirs(UPLOAD_FOLDER, exist_ok=True)

                    file_path = os.path.join(UPLOAD_FOLDER, filename)
                    new_img_file.save(file_path)
                    selected_product.img = new_img_file.filename
                    print(f'success changing image of {food_name} to {new_img_file.filename}')


               selected_product.food_name = food_name
               selected_product.category = cusine_category
               selected_product.calories = calories
               selected_product.quantity = quantity
               selected_product.food_price = product_price
               selected_product.waiting_time = waiting_time
               selected_product.description = short_desc
               selected_product.details = full_details

               db.session.commit()
          else:
               print(f'Product: {food_name} does not exist on the kitchen')
     except(KeyError):
          print(KeyError)

     return jsonify({'msg': 'Success', 'status': True})



@admin.route('/admin/create-product',methods=['POST'])
def create_product():
      
     food_name = request.form.get("food_name")
     cusine_category = request.form.get("cusine_category")
     calories = request.form.get("calories")
     quantity = request.form.get("quantity")
     product_price = request.form.get("product_price")
     waiting_time = request.form.get("waiting_time")
     short_desc = request.form.get("short_desc")
     full_details = request.form.get("full_details")

     new_img_file = request.files.get("new_img_file")

     existing_product = Products.query.filter(Products.food_name.ilike(f'%{food_name}%')).first()

     if not existing_product:
          if new_img_file :
                    
               print(os.getcwd())
                   
               filename = secure_filename(new_img_file.filename)
               project_root = os.path.abspath(os.path.join(os.getcwd(), '..'))
               UPLOAD_FOLDER = os.path.join(project_root, 'client', 'public', 'images', 'products')
               os.makedirs(UPLOAD_FOLDER, exist_ok=True)

               file_path = os.path.join(UPLOAD_FOLDER, filename)
               new_img_file.save(file_path)
              
               print(f'success changing image of {food_name} to {new_img_file.filename}')

          new_product = Products(
               category = cusine_category,
               quantity = quantity,
               food_name = food_name,
               food_price = product_price,
               calories = calories,
               waiting_time = waiting_time,
               img = new_img_file.filename,
               description = short_desc,
               details = full_details
          )
          save_data(new_product)

          return jsonify({'msg': 'Sucess', 'status': True})
     else:
          return jsonify({'msg': 'Product already exist', 'status': False})
     

@admin.route('/admin/remove-costumer',methods=['POST'])
def remove_costumer():
     print('hellofbafbwohfoiaw')

     data = request.json

     costumer_name = data.get('name')
     table_id = data.get('table_id')
    
     costumer_identity = Costumer.query.filter_by(costumer_name=costumer_name).first()
     print(costumer_identity.costumer_name)
     costumer_orders = Orders.query.filter_by(costumer_name=costumer_identity.costumer_name).first()
     costumer_table = Table.query.filter_by(table_name=table_id).first()
     
     if costumer_identity:
         
          costumer_table.clear_costumer()
          db.session.commit()
          db.session.delete(costumer_orders)
          db.session.commit()
          db.session.delete(costumer_identity)
          db.session.commit()
          
          
         
          

          
          print('Succesfully removed')
          return jsonify({'msg':'Success', 'status':True})
        

     else: 
          return jsonify({'msg':'Failed', 'status':False})