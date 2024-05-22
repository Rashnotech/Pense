#!/usr/bin/python3
""" Pense Backend entry point """
from flask import Flask, jsonify
from flask_mail import Mail
from flask_cors import CORS
from models import storage
from api.v1.config import Config
from api.v1.routes import app_views
from flask_jwt_extended import JWTManager

app = Flask(__name__)

config_name = "development"
app.config.from_object(Config)
Config.init_app(app)
mail = Mail()
mail.init_app(app)
CORS(app, resources={r"/api/v1/*": {"origins": "*"}})
app.register_blueprint(app_views)

jwt = JWTManager(app)

@app.teardown_appcontext
def teardown_appcontext(self):
    """ Teardown app context """
    storage.close()


@app.errorhandler(401)
def unauthorized(error) -> str:
    """ Unauthorized error """
    return jsonify({"error": "Unauthorized"}), 401

@app.errorhandler(404)
def not_found_error(error):
    """ Not found error """
    return jsonify({"error": "Not found"}), 404

@app.errorhandler(403)
def forbidden(error) -> str:
    """ Forbidden error """
    return jsonify({"error": "Forbidden"}), 403



if __name__ == "__main__":
    app.run(debug=True)