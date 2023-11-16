#!/usr/bin/python3
"""a module that contain user attributes"""
from models.base_model import Base, BaseModel
from sqlalchemy import Column, String, Boolean, ForeignKey, Integer, Table
from hashlib import md5


subscriber = Table('subscriber', Base.metadata,
                   Column('following', Integer, ForeignKey('users.id', onupdate='CASCADE', ondelete='CASCADE')),
                   Column('user_id', Integer, ForeignKey('users.id', onupdate='CASCADE', ondelete='CASCADE'), primary_key=True)
                   )

class User(BaseModel, Base):
    """User class model"""
    __tablename__ = 'users'
    firstname = Column(String(128), nullable=False)
    lastname = Column(String(128), nullable=False)
    email = Column(String(128), nullable=False)
    password = Column(String(128), nullable=False)
    verify = Column(Boolean, nullable=False, default=False)

    def __init__(self, **kwargs) -> None:
        super().__init__(**kwargs)
        self.password = md5(self.password.encode()).hexdigest()