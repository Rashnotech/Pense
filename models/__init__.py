#!/usr/bin/python3
"""a module for db storage"""
from models.engine.db_storage import DBStorage


storage = DBStorage()
storage.reload()
