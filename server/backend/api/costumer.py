from flask import Blueprint, jsonify, request
from ..db_config import save_data, delete_all_data, delete_data
from ..db_models import Costumer
from ..extensions import jwt_required, get_jwt_identity, create_access_token


costumer = Blueprint("costumer", __name__)


@costumer.route("/costumer/register", methods=["POST"])
def costumer_register():

    data = request.json

    name = data.get("costumer_name")

    is_costumer = Costumer.query.filter_by(costumer_name=name).first()

    if is_costumer:
        print("Name already taken")
        return jsonify({"message": f"Someone here named { name}", "status": False})
    else:
        new_costumer = Costumer(costumer_name=name)
        save_data(new_costumer)

    access_token = create_access_token(identity=str(new_costumer.id))
    return jsonify({"message": "ok", "status": True, "access_token": access_token})

@costumer.route('/costumer/get-name', methods=['POST'])
def get_name():

    data = request.json

    name = data.get('name')

    current_costumer = Costumer.query.filter_by(costumer_name = name).first()

    if current_costumer:
        return jsonify({'msg':'success', 'status':True})
    else:
        return jsonify({'msg':'not existing', 'status':False})









@costumer.route("/costumer/exit", methods=["POST", "GET"])
@jwt_required()
def exit_costumer():
    current_costumer_id = get_jwt_identity()

    costumer_to_leave = Costumer.query.filter_by(id=current_costumer_id).first()

    if not costumer_to_leave:
        return jsonify({"message": "Costumer not found", "status": False})

    delete_data(costumer_to_leave)

    return jsonify({"message": "Succesfully loggout!", "status": True})
