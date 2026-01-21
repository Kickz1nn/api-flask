from app.models.user_model import db
from datetime import datetime

class CepHistory(db.Model):
    __tablename__ = "cep_history"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    cep = db.Column(db.String(8), nullable=False)
    logradouro = db.Column(db.String(150))
    bairro = db.Column(db.String(100))
    cidade = db.Column(db.String(100))
    uf = db.Column(db.String(2))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
