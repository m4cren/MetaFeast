from flask import Blueprint, request, jsonify
from ..db_models import Orders
from sqlalchemy import desc

order = Blueprint("order", __name__)

@order.route('/orders/get-pending-orders', methods=['GET'])
def get_orders():
     pending_orders = Orders.query.filter_by(status = 'Pending').order_by(desc(Orders.id)).all()



     response = [order.to_dict() for order in pending_orders]

     return jsonify({'msg': 'success', 'pending_orders': response })