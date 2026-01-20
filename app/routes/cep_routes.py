from flask import Blueprint, request, jsonify
import requests

cep_bp = Blueprint("cep", __name__)

@cep_bp.route("/cep", methods=["GET"])

def consultar_cep():
    cep = request.args.get("cep")

    if not cep:
        return jsonify({"erro": "CEP não informado"}), 400

    cep = cep.replace("-", "").strip()

    if len(cep) != 8 or not cep.isdigit():
        return jsonify({"erro": "CEP inválido"}), 400

    url = f"https://viacep.com.br/ws/{cep}/json/"

    try:
        response = requests.get(url, timeout=5)
        data = response.json()

        if "erro" in data:
            return jsonify({"erro": "CEP não encontrado"}), 404

        return jsonify({
            "cep": data["cep"],
            "logradouro": data["logradouro"],
            "bairro": data["bairro"],
            "cidade": data["localidade"],
            "estado": data["uf"]
        })

    except requests.exceptions.RequestException:
        return jsonify({"erro": "Erro ao acessar o ViaCEP"}), 500