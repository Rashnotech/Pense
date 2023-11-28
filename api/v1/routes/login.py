#!/usr/bin/python3
""" a module for user login"""
from api.v1.routes import request, abort, app_views, jsonify
from models import storage
from api.v1.routes.email import send_mail
from flask import render_template, url_for, redirect
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
        abort(400, 'Missing email')
    users = storage.all(User)
    if users is None:
        abort(400, 'User not found')
    for user in users.values():
        if user.email == data['email']:
            if user.password != md5(data['password'].encode()).hexdigest():
                abort(400, 'Incorrect password')
            if user.verify is False:
                return jsonify({'message': 'Email not verified'}), 400
            return jsonify(user.to_dict(), 201)
    return jsonify({'message': 'User not found'}), 400


@app_views.route('/forget', methods=['POST'], strict_slashes=False)
def forget():
    """ a function that check for password"""
    data = request.get_json()
    if not data:
        abort(400, 'Not a JSON')
    if 'email' not in data:
        abort(400, 'Missing email')
    users = storage.all(User)
    for user in users.values():
        if user.email == data['email']:
            body = render_template('password_reset.html',
                           reset_url=url_for('app_views.password_reset',
                                             email=user.email, _external=True),
                           fullname=user.firstname.join(' ' + user.lastname))
            response, status_code = send_mail(user.email, body)
            if status_code == 500:
                abort(status_code, response)
            return jsonify({'message': 'Email sent successfully'}), 201
    abort(400, 'Email Failed, retry after few minutes')


@app_views.route('/reset?email=<string:email>', methods=['POST', 'PUT'], strict_slashes=False)
def password_reset(email):
    """a function that change password"""
    if not email:
        abort(400, 'Missing email')
    data = request.get_json()
    if not data:
        abort(400, 'Not a JSON')
    if 'password' not in data:
        abort(400, 'Missing password')
    users = storage.all(User)
    new_pass = md5(data['password'].encode()).hexdigest()
    for user in users.values():
        if user.email == email:
            setattr(user, 'password', new_pass)
            user.save()
            return redirect('/login')
    abort(400, 'An error occurred!')


@app_views.route('/user/<int:user_id>', methods=['GET'], strict_slashes=False)
def getdetails(user_id):
    users = storage.get(User, user_id)
    if users is None:
        abort(400, 'User not found')
    user = [val.to_dict for val in users.values()]
    return jsonify(user.to_dict(), 201)