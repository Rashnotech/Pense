#!/usr/bin/python3
"""testing an api/v1/routes"""

from flask import Flask, request, jsonify

app = Flask(__name__)

def generate_token(email, password):
    """generate token"""
    return 'token'

@app.route('/api/v1/reset', methods=['POST'])
def auth():
    """authentication"""
    json_data = request.get_json()
    password = json_data['password']
    email = request.args.get('email')
    return jsonify(token=generate_token(email, password))

with app.test_client() as c:
    rv = c.post('/api/v1/reset?email=test@gmail.com', json={
        'password': 'secret@20'
    })
    assert rv.status_code == 200
    json_data = rv.get_json()
    assert 'token' in json_data