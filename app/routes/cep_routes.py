from flask import Blueprint, request, jsonify
from app.services.cep_service import consultar_cep

cep_bp = Blueprint("cep", __name__)

@cep_bp.route("/cep/<cep>", methods=["GET"])
def buscar_cep(cep):
    user_id = request.args.get("user_id")

    if not user_id:
        return jsonify({"error": "Usuário não identificado"}), 400

    data, status = consultar_cep(cep, user_id)
    return jsonify(data), status
