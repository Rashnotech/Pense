#!/usr/bin/python3
"""a module for user signup"""
from api.v1.routes import app_views, jsonify, request, abort
from models import storage
from api.v1.routes import Message
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
    validate = storage.get(User, data['email'])
    if validate is not None:
        abort(400, 'User already exists')
    user = User(**data)
    storage.new(user)
    storage.save()
    msg = Message('Pense Verification', 'pense@gmail.com',
                  recipients=[data.email])
    msg.body = '<b>Testing</b>'
    msg.send(msg)
    return jsonify(user.to_dict()), 201