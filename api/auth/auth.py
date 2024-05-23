#!/usr/bin/env python3
"""authentication module"""
from models import storage
from models.user import User
from flask_jwt_extended import get_jwt_identity
from flask import abort


def get_auth_user():
    user_id = get_jwt_identity()
    user = storage.get(User, user_id)

    if not user:
        abort(404)
    return user