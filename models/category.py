#!/usr/bin/python3
"""a module for category model"""
from models.base_model import Base, BaseModel
from sqlalchemy import Column, String
from sqlalchemy.orm import relationship


class Category(BaseModel, Base):
    """category class"""
    __tablename__ = 'categories'
    name = Column(String(128), nullable=False)
    post = relationship('Post', backref='posts')
    