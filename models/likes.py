#!/usr/bin/python3
"""a module that contain user attributes"""
from models.base_model import Base, BaseModel
from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship


class Like(BaseModel, Base):
    """like class for orm"""
    __tablename__ = 'likes'
    counter = Column(Integer, nullable=False, default=0)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    post_id = Column(Integer, ForeignKey('posts.id'), nullable=False)
    users = relationship('User', backref='likes')

    def __init__(self, **kwargs) -> None:
        super().__init__(**kwargs)