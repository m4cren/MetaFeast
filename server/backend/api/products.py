from flask import Blueprint, request, jsonify
from ..db_models import Products

products = Blueprint('products', __name__)

@products.route('/products/get-details', methods=['GET','POST'])
def get_product_details():

     products = Products.query.all()

     response = [product.to_dict() for product in products]

     return jsonify({'message':'success', 'products': response})