#!/usr/bin/python3
import os

class Config:
    """ a class for config"""
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 465
    MAIL_USE_SSL = True
    MAIL_USERNAME = 'pense.blogpost@gmail.com'
    MAIL_PASSWORD = 'nigyjnsceqoooqty'
    UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'upload', 'images')

    os.makedirs(UPLOAD_FOLDER, exist_ok=True)
    @classmethod
    def init_app(cls, app):
        pass