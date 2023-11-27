#!/usr/bin/python3
""" a module for the post model"""
from hashlib import md5
from models.base_model import Base, BaseModel
from sqlalchemy import Column, String, Text, Integer, ForeignKey, Table
from sqlalchemy.orm import relationship
from math import ceil


post_category = Table(
    'post_category',
    Base.metadata,
    Column('post_id', Integer, ForeignKey('posts.id')),
    Column('category_id', Integer, ForeignKey('categories.id'))
)

class Post(BaseModel, Base):
    """Create the post model"""
    __tablename__ = 'posts'

    title = Column(String(100), nullable=False, unique=True)
    content = Column(Text, nullable=False)
    post_cover = Column(String(100), nullable=True)
    attachment = Column(String(100), nullable=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    user = relationship('User', backref='posts')
    slug = Column(String(100))
    summary = Column(Text)
    read_time = Column(Integer)
    category_id = Column(Integer, ForeignKey('categories.id'), nullable=False)
    categories = relationship('Category', secondary=post_category)

    reading_speed = 183

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
