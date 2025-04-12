from flask import Blueprint, jsonify
from ..db_models import PendingPayments 
from sqlalchemy import desc


payment = Blueprint('payment', __name__)

@payment.route('/payment/get-pending-payments', methods=['GET'])
def get_pending_payments():
     



     try:
          pending_payments = PendingPayments.query.filter_by(status = 'Unconfirmed').order_by(desc(PendingPayments.id)).all()

          response = [request.to_dict() for request in pending_payments]
          print(response)
          return jsonify({'msg': 'success', 'status': True, 'pending_payment_requests': response})
     except:
          print('error')
          response = None
          return jsonify({'msg': 'failed', 'status': False, 'pending_payment_requests': response})