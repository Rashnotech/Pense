#!/usr/bin/python
""" a module for subscribers """
from models.base_model import Base, BaseModel
from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship

class Subscriber(BaseModel, Base):
    """Subscriber class model"""
    __tablename__ = 'subscribers'
    user_id = Column(Integer, ForeignKey('users.id', onupdate='CASCADE', ondelete='CASCADE'), primary_key=True)
    following_id = Column(Integer, ForeignKey('users.id', onupdate='CASCADE', ondelete='CASCADE'), primary_key=True)

    # Relationships
    user = relationship('User', foreign_keys=[user_id])
    following = relationship('User', foreign_keys=[following_id])