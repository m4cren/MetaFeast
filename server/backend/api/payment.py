from flask import Blueprint, jsonify, request
from ..db_models import PendingPayments, Costumer
from ..db_config import PAYMONGO_API_URL, PAYMONGO_API_KEY, encode_api_key
from ..extensions import jwt_required,get_jwt_identity 

from sqlalchemy import desc
import requests
encoded_api_key = encode_api_key(PAYMONGO_API_KEY)

payment = Blueprint('payment', __name__)

def create_payment_link(amount, description, remarks):
     payload = {
          'data':{
               'attributes':{
                    'amount': amount * 100,
                    'description': description,
                    'remarks': remarks,
                    'currency': 'PHP'
               }
          }
     }

     headers = {
          'accept': 'application/json',
          'content-type': 'application/json',
          'authorization': f'Basic {encoded_api_key}'
     }

     response = requests.post(PAYMONGO_API_URL, json=payload, headers=headers)
     data = response.json()

     try:
          checkout_url = data['data']['attributes']['checkout_url']
          return {'checkout_url': checkout_url}
     except KeyError:
          return {'error': 'Payment link creation failed', 'details': data}



@payment.route('/payment/get-pending-payments', methods=['GET'])
def get_pending_payments():
     
     try:
          pending_payments = PendingPayments.query.filter((PendingPayments.status == 'Unconfirmed') & (PendingPayments.payment_type != 'Undefined')).order_by(desc(PendingPayments.id)).all()

          response = [request.to_dict() for request in pending_payments]
          print(response)
          return jsonify({'msg': 'success', 'status': True, 'pending_payment_requests': response})
     except:
          print('error')
          response = None
          return jsonify({'msg': 'failed', 'status': False, 'pending_payment_requests': response})
     

@payment.route('/payment', methods=['POST'])
def payment_request():
 

     data = request.json
     costumer_name = data.get('costumer_name')

     price = data.get('price')

     print(costumer_name, 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXx')





     payment_item = PendingPayments.query.filter_by(costumer_name = costumer_name).first()
     print(payment_item)

     if(payment_item):
          payment_id = payment_item.payment_id

          description = f'Transaction for {costumer_name} - Ref No: {payment_id}'
          remarks = f'Metafeast order #{payment_id} | Costumer: {costumer_name}'

          result = create_payment_link(price, description, remarks)

          return jsonify(result) 
     else:
          return jsonify({'msg': 'Error', 'status': False})
  

@payment.route('/payment/receipt', methods=['GET'])
@jwt_required()
def get_payment_receipt():

     costumer_id = get_jwt_identity()

     try:

          query_costumer = Costumer.query.filter_by(id = costumer_id).first()

          costumer_receipt = PendingPayments.query.filter_by(costumer_name = query_costumer.costumer_name).first()


          response = costumer_receipt.to_dict()

          return jsonify({'msg': 'Success', 'response': response, 'status': True})
     except:
          print('the user exitted or had been removed')

          return jsonify({'msg': 'Success',  'status': True})
    