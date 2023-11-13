#!/usr/bin/python3
""" a module for the post model"""
from models.base_model import Base, BaseModel
from sqlalchemy import Column, String, Text, Integer, ForeignKey
from sqlalchemy.orm import relationship


class Post(BaseModel, Base):
    """Post class"""
    __tablename__ = 'posts'
    title = Column(String(512), nullable=False)
    description = Column(Text, nullable=False)
    category_id = Column(Integer, ForeignKey('categories.id'), nullable=False)
    

    def __init__(self, **kwargs) -> None:
        super().__init__(**kwargs)