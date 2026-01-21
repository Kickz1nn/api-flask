from flask import Blueprint, jsonify
from app.models.cep_history_model import CepHistory

history_bp = Blueprint("history", __name__)

@history_bp.route("/history/<int:user_id>", methods=["GET"])
def get_history(user_id):
    history = CepHistory.query.filter_by(user_id=user_id).order_by(CepHistory.created_at.desc()).all()

    return jsonify([
        {
            "cep": h.cep,
            "logradouro": h.logradouro,
            "bairro": h.bairro,
            "cidade": h.cidade,
            "uf": h.uf,
            "created_at": h.created_at.strftime("%d/%m/%Y %H:%M")
        } for h in history
    ])