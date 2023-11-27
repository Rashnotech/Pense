#!/usr/bin/python3
"""a module for category model"""
from models.base_model import Base, BaseModel
from sqlalchemy import Column, String, Text
from sqlalchemy.orm import relationship


class Category(BaseModel, Base):
    """category class"""
    __tablename__ = 'categories'
    name = Column(String(100), nullable=False, unique=True)
    posts = relationship('Post', back_populates='categories', primaryjoin='Category.id == Post.category_id')
