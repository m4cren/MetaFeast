from .extensions import db
from datetime import datetime,timezone
from .db_config import time_ago
import pytz, math


phillipines_tz = pytz.timezone('Asia/Manila')

def current_ph_time():
    return datetime.now(phillipines_tz)


class AdminCredentials(db.Model):
    __tablename__ = "administrator"
    admin_id = db.Column(db.Integer, primary_key=True)
    admin_name = db.Column(db.String(126), default = 'MetaFeast')
    admin_password = db.Column(db.String(125))


class Costumer(db.Model):
    __tablename__ = "costumer"
    id = db.Column(db.Integer, primary_key=True)
    costumer_name = db.Column(db.String(126), nullable=False)
    status = db.Column(db.String(64), nullable = False, default = 'Picking')
    current_table = db.Column(db.String(64), nullable = True, default = 'Undecided')
    date_time = db.Column(db.DateTime, default = datetime.utcnow)

    def to_dict(self):
        return {"costumer_id": self.id,
                 "costumer_name": self.costumer_name,
                 'current_table': self.current_table
                 
                 }
    def update_to_ordering(self):
        self.status = 'Ordering'
    
    def update_to_eating(self):
        self.status = 'Eating'

    def update_to_billing(self):
        self.status = 'Billing'


class Table(db.Model):
    __tablename__ = "table_status"
    id = db.Column(db.Integer, primary_key=True)
    table_name = db.Column(db.String(10), nullable=False, unique = True)
    table_type = db.Column(db.String(20), nullable=False)
    table_position_x = db.Column(db.Float(), nullable = True)
    table_position_y= db.Column(db.Float(), nullable = True)
    table_position_z = db.Column(db.Float(), nullable = True)
    isAvailable = db.Column(db.Boolean, default=True)
    current_costumer_name = db.Column(db.String(56), nullable=True, default="AVAILABLE")
    current_costumer_id = db.Column(
        db.Integer, db.ForeignKey("costumer.id"), nullable=True
    )
    current_costumer_status = db.Column(db.String(56), default='Available')

    def clear_costumer(self):
        self.isAvailable = True
        self.current_costumer_name = 'AVAILABLE'
        self.current_costumer_id = None
        self.current_costumer_status = 'Available'

    def get_position(self):
        return [self.table_position_x, self.table_position_y, self.table_position_z]

    def update_to_ordering(self):
        self.current_costumer_status = 'Ordering'
    
    def update_to_eating(self):
        self.current_costumer_status = 'Eating'

    def update_to_billing(self):
        self.current_costumer_status = 'Billing'

    def to_dict(self):
        return{
            'table_name': self.table_name,
            'costumer_name': self.current_costumer_name,
            'is_available': self.isAvailable,
            'current_costumer_status': self.current_costumer_status
        }
    
class TableRequest(db.Model):
    __tablename__ = 'table_request'
    id = db.Column(db.Integer, primary_key=True)
    costumer_name = db.Column(db.String(56))
    table_id = db.Column(db.String(5))
    date_time = db.Column(db.DateTime, default = datetime.utcnow)



    def to_dict(self):
        return{
            'costumer_name': self.costumer_name,
            'table_id': self.table_id,
        }
    
    def to_msg(self):
        return f'{self.costumer_name} is requesting to seat on table {self.table_id}'

class Products(db.Model):
    __tablename__ = 'products'
    id = db.Column(db.Integer, primary_key = True)
    category = db.Column(db.String(64), nullable = False)
    quantity = db.Column(db.Integer, default = 0)
    food_name = db.Column(db.String(64), nullable = False)
    food_price = db.Column(db.Integer, nullable = False)
    calories = db.Column(db.Integer, default = 0)
    waiting_time = db.Column(db.Integer, nullable = False)
    img = db.Column(db.String(124), nullable = False)
    description = db.Column(db.String(246), nullable = False)
    details = db.Column(db.Text, nullable = False)
    type = db.Column(db.String(64), nullable = True)
    ratings = db.Column(db.Float, nullable = False, default = 0)
    total_ratings = db.Column(db.Integer, default = 0, nullable = False)
    total_orders = db.Column(db.Integer, default = 0, nullable =False)

    def add_total_order(self, quantity):
        self.total_orders += quantity
    
   


    def to_dict(self):
        return{
            'category': self.category,
            'quantity': self.quantity,
            'food_name': self.food_name,
            'food_price': self.food_price,
            'calories': self.calories,
            'waiting_time': self.waiting_time,
            'img': self.img,
            'description': self.description,
            'details': self.details,
            'ratings': self.ratings,
            'total_ratings': self.total_ratings,
            'total_orders': self.total_orders
            
        }

    def get_ratings(self, rate):
        self.ratings = ((self.ratings + rate)/ self.total_ratings)

  


class Orders(db.Model):
    __tablename__ = 'orders'
    id = db.Column(db.Integer, primary_key = True)
    status = db.Column(db.String(64), nullable =False, default = 'Pending')
    costumer_name = db.Column(db.String(126), nullable = False)
    total_waiting_time = db.Column(db.String(64), nullable = False)
    current_costumer_id = db.Column(db.Integer, db.ForeignKey("costumer.id"), nullable=True)
    current_table = db.Column(db.String(10), nullable = False)
    orders = db.Column(db.JSON, nullable = False, default=lambda: [{'food_name': '','food_category': '','img':'', 'quantity': 0, 'price': 0.0, 'available_quantity': 0}])
    additional = db.Column(db.Boolean, default = False, nullable = False)
    additional_orders = db.Column(db.JSON, nullable = True, default=lambda: [{'food_name': '','food_category': '','img':'', 'quantity': 0, 'price': 0.0,  'available_quantity': 0}])
    order_time = db.Column(db.DateTime, default = datetime.utcnow)


    def to_dict(self):
        return{
            'status': self.status,
            'costumer_name': self.costumer_name,
            'total_waiting_time': self.total_waiting_time,
            'order_time': time_ago(self.order_time),
            'current_table': self.current_table,
            'is_additional': self.additional,
            'orders':[{
                'food_name': order['food_name'],
                'food_category': order['food_category'],
                'img': order['img'],
                'quantity': order['quantity'],
                'price': order['price'],
                'available_quantity': order['available_quantity']
                
            } for order in self.orders],
            'additional_orders':[{
                'food_name': order['food_name'],
                'food_category': order['food_category'],
                'img': order['img'],
                'quantity': order['quantity'],
                'price': order['price'],
                'available_quantity': order['available_quantity']
                
            } for order in self.additional_orders]
            
        }
    

    
    def serve(self):
        self.status = 'Served'
        self.additional = False
        self.additional_orders = []

    def additional_order(self):
        self.status = 'Pending'
        self.additional = True
        self.order_time = datetime.now(timezone.utc)



class PendingPayments(db.Model):
    __tablename__ = 'pending_payments'
    id = db.Column(db.Integer, primary_key = True)
    payment_id = db.Column(db.String(10), nullable = False, unique = True)
    costumer_name = db.Column(db.String(69), nullable = False)
    status = db.Column(db.String(69), nullable = False, default = 'Unconfirmed')
    payment_type = db.Column(db.String(69), nullable = True)
    table_id = db.Column(db.String(69), nullable = False)
    orders = db.Column(db.JSON, nullable = False, default=lambda: [{'food_name': '', 'quantity': 0, 'price': 0, 'img': ''}])
    total_payment = db.Column(db.Integer, nullable = False)
    payment_time = db.Column(db.DateTime, default = datetime.utcnow)
    date_and_time = db.Column(db.DateTime, default = current_ph_time)

    def to_dict(self):
        return{
            'payment_id': self.payment_id,
            'costumer_name': self.costumer_name,
            'payment_type': self.payment_type,
            'status': self.status,
            'table_id': self.table_id,
            'total_payment': self.total_payment,
            'orders': [{
                'food_name': order['food_name'],
                'quantity': order['quantity'],
                'img': order['img'],
                'price': order['price']
            }for order in self.orders],
            'payment_time': time_ago(self.payment_time),
            'date_and_time': self.date_and_time.strftime("%Y-%m-%d %H:%M:%S")
            
        }
    
    def confirm(self):
        self.status = 'Confirmed'


class Reviews(db.Model):
    __tablename__ = 'reviews'
    id = db.Column(db.Integer, primary_key = True)
    email = db.Column(db.String(124), nullable = True)
    ratings = db.Column(db.Integer, nullable = True)
    name = db.Column(db.String(124), nullable = False)
    comment = db.Column(db.String(524), nullable = True)
    date = db.Column(db.DateTime, default = datetime.utcnow)
    img_profile_url = db.Column(db.String(264), nullable = True)
    total_spend = db.Column(db.Integer, nullable = False)
    order_items= db.Column(db.Integer, nullable = False)

    def to_dict(self):
        return{
            'email': self.email,
            'name': self.name,
            'ratings': self.ratings,
            'comment': self.comment,
            'date': self.date.strftime("%Y-%m-%d %H:%M:%S"),
            'time_age': time_ago(self.date),
            'img_profile_url': self.img_profile_url,
            'total_spend': self.total_spend,
            'order_items': self.order_items

        }
    

class CostumerHistory(db.Model):
    __tablename__ = 'costumer_history'
    id = db.Column(db.Integer, primary_key = True)
    costumer_name = db.Column(db.String(64), nullable = False)
    table_seated = db.Column(db.String(64), nullable = False)
    total_payment = db.Column(db.Integer, nullable =False)
    total_order_items = db.Column(db.Integer, nullable = False)
    payment_method = db.Column(db.String(64), nullable = False)
    payment_id = db.Column(db.String(64), nullable = False)
    orders = db.Column(db.JSON, nullable = True, default=lambda: [{'food_name': '', 'quantity': 0}])
    dine_time = db.Column(db.DateTime, default = datetime.utcnow)

    def to_dict(self):
        return{
            'costumer_name': self.costumer_name,
            'table_seated': self.table_seated,
            'total_payment': self.total_payment,
            'payment_id': self.payment_id,
            'total_order_items': self.total_order_items,
            'payment_method': self.payment_method,
            'orders': [{
                'food_name': order['food_name'],
                'quantity': order['quantity']
            } for order in self.orders],
            'dine_time': self.dine_time.strftime("%Y-%m-%d %H:%M:%S"),
        }



        
    