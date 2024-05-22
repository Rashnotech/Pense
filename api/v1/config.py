#!/usr/bin/python3
import os
from datetime import timedelta

class Config:
    """ a class for config"""
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 465
    MAIL_USE_SSL = True
    MAIL_USERNAME = 'pense.blogpost@gmail.com'
    MAIL_PASSWORD = 'nigyjnsceqoooqty'
    SECRET_KEY = 'blogger_smooth'
    JWT_SECRET_KEY = 'blogger_smooth'
    JWT_TOKEN_LOCATION = ['headers']
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=30)
    UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'upload', 'images')

    os.makedirs(UPLOAD_FOLDER, exist_ok=True)
    @classmethod
    def init_app(cls, app):
        pass