#!/usr/bin/python3
""" Blueprint for the api """
from flask import Blueprint, jsonify, request, abort, current_app, json
app_views = Blueprint('app_views', __name__, url_prefix='/api/v1', template_folder='templates')

from .post import post_bp
from .comment import comment_bp
app_views.register_blueprint(post_bp)
app_views.register_blueprint(comment_bp)

from api.v1.routes.signup import *
from api.v1.routes.login import *
from api.v1.routes.email import *
from api.v1.routes.post import *
from api.v1.routes.comment import *
from api.v1.routes.category import *
from api.v1.routes.upload_user import *