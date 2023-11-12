#!/usr/bin/python3
""" index """
from api.v1.routes import app_views


@app_views.route('/', strict_slashes=False)
def index():
    """ index """
    return "Hello HBNB!"