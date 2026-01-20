from flask import Flask, jsonify
from routes.cep_routes import cep_bp

def create_app():
    app = Flask(__name__)

    app.register_blueprint(cep_bp)

    @app.route("/")
    def home():
        return jsonify({"status": "API running"})

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)