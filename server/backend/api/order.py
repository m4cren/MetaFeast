from flask import Blueprint, request, jsonify

order = Blueprint('order', __name__)

@order.route('/api/order', methods=['GET'])
def order_food():

     return jsonify({'message': 'okey'})
