#!/usr/bin/python3
""" a module for the post model"""
from hashlib import md5
from models.base_model import Base, BaseModel
from sqlalchemy import create_engine, Column, String, Text, Integer, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from math import ceil


class Post(BaseModel, Base):
    """Create the post model"""
    __tablename__ = 'posts'

    title = Column(String(100), nullable=False, unique=True)
    content = Column(Text, nullable=False)
    post_cover = Column(String(100), nullable=False)
    attachment = Column(String(100), nullable=False)
    category_id = Column(Integer, ForeignKey('categories.id'), nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'))
    user = relationship('User', backref='posts')
    slug_column = Column(String(100), nullable=False, unique=True)
    summary_column = Column(Text)
    read_time_column = Column(Integer)

    @property
    def slug(self):
        # Generate a URL-friendly slug from the title
        return self.title.lower().replace(' ', '-')

    @property
    def summary(self):
        # Generate a short summary from the first 100 characters of the content
        return self.content[:100] + '...'

    @property
    def read_time(self):
        # Calculate the read time based on the word count and the average reading speed
        word_count = len(self.content.split())
        reading_speed = 200 # words per minute
        read_time = ceil(word_count / reading_speed)
        return read_time

    def __init__(self, **kwargs) -> None:
        super().__init__(**kwargs)
        self.slug_column = self.slug
        self.summary_column = self.content.split('.')[0] + '.'
        word_count = len(self.content.split())
        self.read_time_column = ceil(word_count / reading_speed)