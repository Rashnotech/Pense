#!/usr/bin/python3
""" pense config file"""


class Config:
    """ a class for config"""
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 465
    MAIL_USE_SSL = True
    MAIL_USERNAME = 'pense.blogpost@gmail.com'
    MAIL_PASSWORD = 'nigyjnsceqoooqty'
    UPLOAD_FOLDER = '/api/v1/assets/uploads'

    @classmethod
    def init_app(cls, app):
        pass