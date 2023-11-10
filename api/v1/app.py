#!/usr/bin/python3
""" Pense Backend entry point """
from flask import Flask
from flask_cors import CORS
from api.v1.views import app_views


app = Flask(__name__)
app.register_blueprint(app_views)
cors = CORS(app, resources={r"api/v1/*": {"origins": "*"}})

@app.teardown_appcontext
def teardown_appcontext(self):
    """ Teardown app context """
    #storage.close()


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, threaded=True)