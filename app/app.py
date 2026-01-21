from flask import Flask, jsonify
from flask_cors import CORS
from routes.cep_routes import cep_bp

def create_app():
    app = Flask(__name__)

    CORS(app)

    app.register_blueprint(cep_bp)

    @app.route("/")
    def home():
        return jsonify({"status": "API running"})

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)