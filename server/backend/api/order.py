from flask import Blueprint, request, jsonify
from ..db_models import Orders, Costumer
from sqlalchemy import desc
from ..extensions import get_jwt_identity, jwt_required
order = Blueprint("order", __name__)

@order.route('/orders/get-pending-orders', methods=['GET'])
def get_pending_orders():
     pending_orders = Orders.query.filter_by(status = 'Pending').order_by(desc(Orders.id)).all()



     response = [order.to_dict() for order in pending_orders]

     return jsonify({'msg': 'success', 'pending_orders': response })

@order.route('/order/get-order', methods=['GET'])
@jwt_required()
def get_orders():

     costumer_id = get_jwt_identity()

     costumer = Costumer.query.filter_by(id = costumer_id).first()

     costumer_orders = Orders.query.filter_by(current_costumer_id = costumer.id).first()

     response = costumer_orders.to_dict()


     return jsonify({'msg': 'success', 'orders': response, 'status': True})