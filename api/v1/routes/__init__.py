#!/usr/bin/python3
""" Blueprint for the api """
from flask import Blueprint, jsonify, request, abort, current_app
app_views = Blueprint('app_views', __name__, url_prefix='/api/v1')

from api.v1.routes.index import *
from api.v1.routes.signup import *
from api.v1.routes.login import *
from api.v1.routes.email import *