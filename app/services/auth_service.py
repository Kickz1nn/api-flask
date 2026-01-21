from app.models.user_model import User, db
from werkzeug.security import generate_password_hash, check_password_hash
from flask import jsonify


def cadastrar_usuario(nome, email, senha):
    if User.query.filter_by(email=email).first():
        return jsonify({"erro": "Email já cadastrado"}), 400

    user = User(
        nome=nome,
        email=email,
        senha=generate_password_hash(senha)
    )

    db.session.add(user)
    db.session.commit()

    return jsonify({"msg": "Usuário cadastrado com sucesso"}), 201


def autenticar_usuario(email, senha):
    user = User.query.filter_by(email=email).first()

    if not user or not check_password_hash(user.senha, senha):
        return jsonify({"erro": "Credenciais inválidas"}), 401

    return jsonify({
        "msg": "Login realizado com sucesso",
        "user_id": user.id
    })
