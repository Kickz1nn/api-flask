from flask import Blueprint, request
from app.services.auth_service import cadastrar_usuario, autenticar_usuario

auth_bp = Blueprint('auth', __name__)


@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.json
    return cadastrar_usuario(
        data['nome'],
        data['email'],
        data['senha']
    )


@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    return autenticar_usuario(
        data['email'],
        data['senha']
    )
