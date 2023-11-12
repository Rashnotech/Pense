#!/usr/bin/python3
""" Pense Backend entry point """
from flask import Flask, jsonify
from flask_cors import CORS
from api.v1.routes import app_views
from models import storage


app = Flask(__name__)
app.register_blueprint(app_views)
CORS(app, resources={r"api/v1/*": {"origins": "*"}})

@app.teardown_appcontext
def teardown_appcontext(self):
    """ Teardown app context """
    storage.close()

@app.errorhandler(404)
def not_found_error(error):
    """ Not found error """
    return jsonify({"error": "Not found"}), 404


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, threaded=True)