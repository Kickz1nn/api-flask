from flask import Flask
from flask_cors import CORS
from app.models.user_model import db

from app.routes.auth_routes import auth_bp
from app.routes.cep_routes import cep_bp
from app.routes.history_routes import history_bp

def create_app():
    app = Flask(__name__)

    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    CORS(app)

    db.init_app(app)

    with app.app_context():
        db.create_all()

    app.register_blueprint(auth_bp, url_prefix="/auth")
    app.register_blueprint(cep_bp)
    app.register_blueprint(history_bp)

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
