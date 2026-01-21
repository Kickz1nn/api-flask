from flask import Blueprint, jsonify
from services.cep_service import consultar_cep

cep_bp = Blueprint("cep", __name__)

@cep_bp.route("/cep/<cep>", methods=["GET"])
def get_cep(cep):
    data, status_code = consultar_cep(cep)
    return jsonify(data), status_code   