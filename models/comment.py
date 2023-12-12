#!/usr/bin/python3
""" a module for comments """
from models.base_model import Base, BaseModel
from sqlalchemy import Column, Text, Integer, ForeignKey
from sqlalchemy.orm import relationship

class Comment(BaseModel, Base):
    """comment class for orm"""
    __tablename__ = 'comments'
    comment = Column(Text, nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    post_id = Column(Integer, ForeignKey('posts.id'), nullable=False)
    users = relationship('User', backref='comments')

    # Define the methods and properties
    @property
    def comment_length(self):
        # Return the length of the comment
        return len(self.comment.split())

    def __init__(self, **kwargs) -> None:
        super().__init__(**kwargs)
