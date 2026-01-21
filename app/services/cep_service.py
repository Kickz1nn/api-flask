import requests
from app.models.cep_history_model import CepHistory
from app.models.user_model import db

def consultar_cep(cep, user_id):
    response = requests.get(f"https://viacep.com.br/ws/{cep}/json/")
    data = response.json()

    if "erro" in data:
        return {"error": "CEP não encontrado"}, 404

    history = CepHistory(
        user_id=user_id,
        cep=data["cep"].replace("-", ""),
        logradouro=data.get("logradouro"),
        bairro=data.get("bairro"),
        cidade=data.get("localidade"),
        uf=data.get("uf")
    )

    db.session.add(history)
    db.session.commit()

    return data, 200
