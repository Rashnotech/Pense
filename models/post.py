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
    Column('id', Integer, autoincrement=True, nullable=False, primary_key=True),
    Column('post_id', Integer, ForeignKey('posts.id')),
    Column('category_id', Integer, ForeignKey('categories.id'))
)

class Post(BaseModel, Base):
    """Create the post model"""
    __tablename__ = 'posts'

    title = Column(String(100), nullable=False)
    content = Column(Text, nullable=False)
    post_cover = Column(String(100), nullable=True)
    attachment = Column(String(100), nullable=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    postcat_id = Column(Integer, ForeignKey('post_category.id'), nullable=False, default=1)
    slug = Column(String(100))
    summary = Column(Text)
    read_time = Column(Integer)
    user = relationship('User', backref='posts')
    categories = relationship(
        'Category',
        secondary=post_category,
        primaryjoin="Post.id == post_category.c.post_id",
        secondaryjoin="Category.id == post_category.c.category_id",
        back_populates='posts'
    )

    reading_speed = 183

    def __init__(self, **kwargs) -> None:
        super().__init__(**kwargs)

    def to_dict(self):
        """ Return a dictionary representation of the post/category"""
        return {
            'id': self.id,
            'title': self.title,
            'content': self.content,
            'post_cover': self.post_cover,
            'user_id': self.user_id,
            'postcat_id': self.postcat_id,
            'slug': self.slug,
            'summary': self.summary,
            'read_time': self.read_time,
            'categories': [category.to_dict() for category in self.categories],
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }

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
