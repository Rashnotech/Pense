#!/usr/bin/python3
"""a module for user signup"""
from api.v1.routes import app_views, jsonify, request, abort, app_views
from api.v1.routes.email import send_mail
from models import storage
from flask import url_for, render_template, redirect
from models.user import User


@app_views.route('/signup', methods=['POST'], strict_slashes=False)
def signup():
    """a view function that creates a user"""
    data = request.get_json()
    if not data:
        abort(400, 'Not a JSON')
    require_fields = ['firstname', 'lastname', 'email', 'password']
    for field in require_fields:
        if field not in data:
            return jsonify({'message': f'Missing {field}'}), 400
    validate = storage.all(User)
    for user in validate.values():
        if user.email == data['email']:
           return jsonify({'message': 'User already exists'}), 400
    body = render_template('verify.html',
                           verify_url=url_for('app_views.verify',
                                              email=data['email'], _external=True),
                                              fullname=data['lastname'],
                                              email=data['email'])
    response, status_code = send_mail(data['email'], body)
    new_user = User(**data)
    new_user.save()
    if status_code == 500:
        abort(400, response)
    return jsonify(new_user.to_dict()), 201


@app_views.route('/verify?email=<email>', methods=['GET', 'PUT'], strict_slashes=False)
def verify(email):
    """signup verification"""
    if not email:
        return jsonify({'message': 'Missing email'}), 400
    users = storage.all(User)
    for user in users.values():
        if user.email == email:
            setattr(user, 'verify', True)
            user.save()
            return redirect('https://pense-theta.vercel.app')
    jsonify({'message': 'Verfication Failed'}), 400
