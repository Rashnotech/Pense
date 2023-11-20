#!/usr/bin/python3
""" Blueprint for the api """
from flask import Blueprint, jsonify, request, abort, current_app
app_views = Blueprint('app_views', __name__, url_prefix='/api/v1', template_folder='templates')

from .post import post_bp
app_views.register_blueprint(post_bp)

from api.v1.routes.signup import *
from api.v1.routes.login import *
from api.v1.routes.email import *
from api.v1.routes.post import *