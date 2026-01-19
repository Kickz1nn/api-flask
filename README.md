# API Flask – Autenticação e Consulta de CEP

Projeto backend desenvolvido com **Flask**, focado em autenticação de usuários e consumo de API externa para **consulta de CEP**, com uma **interface web simples em Bootstrap** para interação.

O objetivo deste projeto é demonstrar conhecimentos em **backend**, integração frontend-backend, autenticação com JWT e boas práticas básicas de API.

---

## 🚀 Funcionalidades

- Cadastro de usuários
- Login com autenticação JWT
- Proteção de rotas com token
- Consulta de CEP via API externa (ViaCEP)
- Interface web simples (HTML + Bootstrap)
- Armazenamento de token no navegador

---

## 🛠️ Tecnologias Utilizadas

### Backend
- Python
- Flask
- Flask-JWT-Extended
- Requests

### Frontend
- HTML5
- CSS3
- JavaScript (Fetch API)
- Bootstrap 5

---

## 📁 Estrutura do Projeto

```bash
api-flask/
├── app/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── app.py
│   ├── config.py
│   └── requirements.txt
│
├── frontend/
│   ├── index.html        # Login
│   ├── register.html     # Cadastro
│   ├── cep.html          # Consulta de CEP
│   └── script.js
│
└── README.md
