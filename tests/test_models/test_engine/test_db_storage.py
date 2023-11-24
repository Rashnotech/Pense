#!/usr/bin/python3
"""Unittest for DBStorage class"""
import unittest
from models.engine.db_storage import DBStorage
from models import storage


class TestDBStorage(unittest.TestCase):
    """Test for DBStorage class"""

    def setUp(self) -> None:
        """Set up method"""
        self.db_storage = DBStorage()

    def test_class(self):
        """ test type method"""
        self.assertTrue(isinstance(self.db_storage, DBStorage))

    def test_new(self):
        """ test new method"""
        obj = {'name': 'Rashnotech', 'email': 'test@gmail.com'}
    
    def test_save(self):
        """ test save method"""
        storage.save()
        self.assertEqual(dict, type(storage.all()))