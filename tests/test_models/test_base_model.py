#!/usr/bin/python3
"""Unittest for BaseModel class"""
from models.base_model import BaseModel
import unittest
from datetime import datetime


class TestBaseModel(unittest.TestCase):
    """A class that test the base model"""

    def setUp(self) -> None:
        """Set up method"""
        self.base_model = BaseModel()

    def test_class(self):
        """ test type method"""
        self.assertTrue(isinstance(self.base_model, BaseModel))
        self.assertIsNotNone(self.base_model.id)
        self.assertIsInstance(self.base_model.created_at, datetime)
        self.assertIsInstance(self.base_model.updated_at, datetime)

    def test_id(self):
        """ test id method"""
        self.assertEqual(int, type(self.base_model.id))
        self.assertNotEqual(self.base_model.id, BaseModel().id)

    def test_str(self):
        """ test str method"""
        self.assertEqual(str, type(str(self.base_model)))