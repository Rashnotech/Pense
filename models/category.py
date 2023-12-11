#!/usr/bin/python3
"""a module for category model"""
from models.base_model import Base, BaseModel
from models.post import post_category
from sqlalchemy import Column, String, Text
from sqlalchemy.orm import relationship


class Category(BaseModel, Base):
    """category class"""
    __tablename__ = 'categories'
    name = Column(String(100), nullable=False, unique=True)
    posts = relationship(
        'Post',
        secondary=post_category,
        primaryjoin="Category.id == post_category.c.category_id",
        secondaryjoin="Post.id == post_category.c.post_id",
        back_populates='categories'
    )