import requests

def consultar_cep(cep):
    cep = cep.replace("-", "").strip()

    if len(cep) != 8 or not cep.isdigit():
        return {"erro": "CEP inválido"}, 400
    
    viacep_url = "https://viacep.com.br/ws/{cep}/json/"

    try:
        response = requests.get(viacep_url.format(cep=cep), timeout=5)
        data = response.json()

        if "erro" in data:
            return {"erro": "CEP não encontrado"}, 404
        
        return data, 200
    
    except requests.exceptions.RequestException:
        return {"erro": "Erro ao conectar com o ViaCEP"}, 500