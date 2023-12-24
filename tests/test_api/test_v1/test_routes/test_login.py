#!/usr/bin/python3
"""testing login api/v1/routes"""

from flask import Flask, request, jsonify

from hashlib import md5

app = Flask(__name__)
