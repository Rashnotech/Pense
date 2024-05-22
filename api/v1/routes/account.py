#!/usr/bin/python3
"""Account routes"""
from flask import jsonify, request, abort
from api.v1.routes import app_views
from models import storage
from models.user import User


@app_views.route('/users', methods=['DELETE'], strict_slashes=False)
def delete_user():
    """Retrieves the list of all User objects"""
    users = storage.all(User).values()
    return jsonify([user.to_dict() for user in users])


def update_user(user_id, data):
    """Updates a User object"""
    user = storage.get(User, user_id)
    if not user:
        abort(404)
    for key, value in data.items():
        if key not in ['id', 'email', 'created_at', 'updated_at']:
            setattr(user, key, value)
    user.save()
    return jsonify(user.to_dict())