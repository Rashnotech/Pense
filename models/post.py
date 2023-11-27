#!/usr/bin/python3
""" a module for the post model"""
from hashlib import md5
from models.base_model import Base, BaseModel
from sqlalchemy import Column, String, Text, Integer, ForeignKey
from sqlalchemy.orm import relationship
from math import ceil


class Post(BaseModel, Base):
    """Create the post model"""
    __tablename__ = 'posts'
    
    reading_speed = 120

    title = Column(String(100), nullable=False)
    content = Column(Text, nullable=False)
    post_cover = Column(String(100), nullable=True)
    attachment = Column(String(100), nullable=True)
    category_id = Column(Integer, ForeignKey('categories.id'), nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'))
    user = relationship('User', backref='posts')
    slug = Column(String(100))
    summary = Column(Text)
    read_time = Column(Integer)


    def __init__(self, **kwargs) -> None:
        super().__init__(**kwargs)

    def slug(self, title):
        # Generate a URL-friendly slug from the title
        return title.lower().replace(' ', '-')
 
    def summary(self, content):
        # Generate a short summary from the first 100 characters of the content
        return content[:100]

    def read_time(self, content):
        # Calculate the read time based on the word count and the average reading speed
        word_count = len(content.split())
        read_time = ceil(word_count / Post.reading_speed)
        return read_time
