#!/usr/bin/python3
"""testing signup api/v1/routes"""
from flask import Flask, request, jsonify
from models.user import User

app = Flask(__name__)

