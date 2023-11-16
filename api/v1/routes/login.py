#!/usr/bin/python3
""" a module for user login"""
from api.v1.routes import request, abort, app_views, jsonify
from models import storage
from models.user import User
from hashlib import md5


@app_views.route('/login', methods=['POST'], strict_slashes=False)
def login():
    data = request.get_json()
    if not data:
        abort(400, 'Not a JSON')
    if 'password' not in data:
        abort(400, 'Missing password')
    if 'email' not in data:
        abort(400, 'Missing username or email')
    user = storage.get(User, data['email'])
    if user is None:
        abort(400, 'User not found')
    if user.password != md5(data['password']).encode().hexdigest():
        abort(400, 'Incorrect password')
    return jsonify(user.to_dict(), 201)


@app_views.route('/forget', methods=['POST'], strict_slashes=False)
def forget():
    """ a function that check for password"""
    data = request.get_json()
    if not data:
        abort(400, 'Not a JSON')
    if 'email' not in data:
        abort(400, 'Missing email')
    user = storage.get(User, data['email'])
    if user is None:
        abort(400, 'User not found')
    return jsonify(user.to_dict(), 201)