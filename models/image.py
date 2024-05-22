#!/usr/bin/python3
""" a model for file upload"""
from models.base_model import BaseModel, Base
from sqlalchemy import Column, ForeignKey, Integer, Text


class Image(BaseModel, Base):
    """a class for images """
    __tablename__ = 'images'
    filename = Column(Text, nullable=False)
    user_id = Column(Integer, ForeignKey('users.id', ondelete='CASCADE'), nullable=False)

    def __init__(self, **kwargs) -> None:
        super().__init__(**kwargs)