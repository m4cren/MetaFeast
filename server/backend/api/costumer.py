from flask import Blueprint, jsonify, request
from ..db_config import save_data, delete_all_data, delete_data
from ..db_models import Costumer
from ..extensions import jwt, jwt_required, get_jwt, get_jwt_identity


costumer = Blueprint("costumer", __name__)


@costumer.route("/phase-1", methods=["POST", "GET"])
@jwt_required()
def phase_1():
    current_costumer_id = get_jwt_identity()

    current_costumer = Costumer.query.filter_by(id=current_costumer_id).first()

    if not current_costumer:
        return jsonify({"message": "Costumer not found", "status": False})

    return jsonify({"message": "ok", "costumer_name": current_costumer.costumer_name})





@costumer.route("/costumer-exit", methods=["POST", "GET"])
@jwt_required()
def exit_costumer():
    current_costumer_id = get_jwt_identity()

    costumer_to_leave = Costumer.query.filter_by(id=current_costumer_id).first()

    if not costumer_to_leave:
        return jsonify({"message": "Costumer not found", "status": False})

    delete_data(costumer_to_leave)

    return jsonify({"message": "Succesfully loggout!", "status": True})
