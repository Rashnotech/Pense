#!/usr/bin/python3
"""a module for user signup"""
from api.v1.routes import app_views, jsonify, request, abort, app_views
from api.v1.routes.email import send_mail
from models import storage
from models.user import User


@app_views.route('/signup', methods=['POST'], strict_slashes=False)
def signup():
    """a view function that creates a user"""
    data = request.get_json()
    if not data:
        abort(400, 'Not a JSON')
    if 'firstname' not in data:
        abort(400, 'Missing firstname')
    if 'lastname' not in data:
        abort(400, 'Missing lastname')
    if 'email' not in data:
        abort(400, 'Missing email')
    if 'password' not in data:
        abort(400, 'Missing password')
    validate = storage.all(User)
    for user in validate.values():
        if user.email == data['email']:
            abort(400, 'User already exists')
    body = 'Welcome to Pense!'
    response = send_mail(data['email'], body)
    new_user = User(**data)
    new_user.save()
    if response.status == 500:
        abort(400, 'Verification Failed')
    return jsonify(new_user.to_dict()), 201