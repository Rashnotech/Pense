#!/usr/bin/python3
""" a model for file upload"""
from models.base_model import Base, BaseModel
from sqlalchemy import Column, String, ForeignKey, Integer


class Image(BaseModel, Base):
    """a class for images """
    __tablename__ = 'images'
    filename = Column(String(128), nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)