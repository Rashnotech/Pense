#!/usr/bin/python3
""" a module for the post model"""
from hashlib import md5
from models.base_model import Base, BaseModel
from sqlalchemy import create_engine, Column, String, Text, Integer, ForeignKey, DateTime
from sqlalchemy.orm import relationship


class Post(BaseModel, Base):
    """Create the post model"""
    __tablename__ = 'posts'

    title = Column(String(100), nullable=False)
    content = Column(Text, nullable=False)
    post_cover = Column(String(100), nullable=True)
    attachment = Column(String(100), nullable=True)
    category_id = Column(Integer, ForeignKey('categories.id'), nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'))
    user = relationship('User', backref='posts')

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
        # Generate the unique link for the post using the md5 hash
        self.link = md5(self.title.encode()).hexdigest()
