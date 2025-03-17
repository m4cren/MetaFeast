from flask import Blueprint, request, jsonify
from ..db_models import AdminCredentials, Costumer
from ..db_config import save_data, delete_data, delete_all_data
from ..extensions import jwt_required, get_jwt_identity, create_access_token

auth = Blueprint("auth", __name__)


@auth.route("/get-costumer-name", methods=["POST"])
def costumerLogin():

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
