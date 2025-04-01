from .extensions import db
from datetime import datetime


class AdminCredentials(db.Model):
    __tablename__ = "administrator"
    admin_id = db.Column(db.Integer, primary_key=True)
    admin_name = db.Column(db.String(126), default = 'MetaFeast')
    admin_password = db.Column(db.String(125))


class Costumer(db.Model):
    __tablename__ = "costumer"
    id = db.Column(db.Integer, primary_key=True)
    costumer_name = db.Column(db.String(126), nullable=False)

    current_table = db.relationship("Table", backref="costumer")

    def to_dict(self):
        return {"costumer_id": self.id, "costumer_name": self.costumer_name}


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

    def get_position(self):
        return [self.table_position_x, self.table_position_y, self.table_position_z]

    def update_to_ordering(self):
        self.current_costumer_status = 'Ordering'
    
    def update_to_eating(self):
        self.current_costumer_status = 'Eating'

    def update_to_billing(self):
        self.current_costumer_status = 'Billing'
    
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
            'details': self.details
            
        }

    def increase_quantity(self):
        self.quantity += 1

    def decrease_quantity(self):
        if self.quantity <= 0:
            self.quantity = 0
            return
        
        self.quantity -= 1


class Orders(db.Model):
    __tablename__ = 'orders'
    id = db.Column(db.Integer, primary_key = True)
    status = db.Column(db.String(64), nullable =False, default = 'Pending')
    costumer_name = db.Column(db.String(126), nullable = False)
    current_costumer_id = db.Column(db.Integer, db.ForeignKey("costumer.id"), nullable=True)
    current_table = db.Column(db.String(10), nullable = False)
    food_name = db.Column(db.String(56), nullable = False)
    quantity = db.Column(db.Integer)
    total_price = db.Column(db.Integer)
    total_calories = db.Column(db.Integer)

    def to_dict(self):
        return{
            'status': self.status,
            'costumer_name': self.costumer_name,
            'current_table': self.current_table,
            'food_name': self.food_name,
            'quantity': self.quantity,
            'total_price': self.total_price,
            'total_calories': self.total_calories
        }
    
    def serve(self):
        self.status = 'Served'

           
        
    