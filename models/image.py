#!/usr/bin/python3
""" a model for file upload"""
from models.base_model import Base, BaseModel
from sqlalchemy import Column, ForeignKey, Integer, Text


class Image(BaseModel, Base):
    """a class for images """
    __tablename__ = 'images'
    filename = Column(Text, nullable=False)
    user_id = Column(Integer, ForeignKey('users.id', ondelete='CASCADE'), nullable=False)