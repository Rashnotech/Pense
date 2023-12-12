#!/usr/bin/python3
"""a module that contain user attributes"""
from models.base_model import Base, BaseModel
from models.image import Image
from sqlalchemy import Column, String, Boolean, ForeignKey, Integer, Table
from sqlalchemy.orm import relationship
from hashlib import md5


subscriber_assoc = Table('subscriber', Base.metadata,
                   Column('following', Integer, ForeignKey('users.id', onupdate='CASCADE', ondelete='CASCADE')),
                   Column('follower_id', Integer, ForeignKey('users.id', onupdate='CASCADE', ondelete='CASCADE'), primary_key=True)
                   )

class User(BaseModel, Base):
    """User class model"""
    __tablename__ = 'users'
    firstname = Column(String(128), nullable=False)
    lastname = Column(String(128), nullable=False)
    email = Column(String(128), nullable=False, unique=True)
    password = Column(String(128), nullable=False)
    verify = Column(Boolean, nullable=False, default=False)
    image = relationship('Image', backref='user', cascade='all, delete-orphan')
    followers = relationship('User', secondary=subscriber_assoc, back_populates='following', foreign_keys=[subscriber_assoc.c.follower_id])
    following = relationship('User', secondary=subscriber_assoc, back_populates='followers', foreign_keys=[subscriber_assoc.c.following])

    def __init__(self, **kwargs) -> None:
        super().__init__(**kwargs)
        self.password = md5(self.password.encode()).hexdigest()


    def add_follower(self, follower):
        """add followers"""
        if follower not in self.followers:
            self.followers.append(follower)

    def add_following(self, following):
        """add following"""
        if following not in self.following:
            self.following.append(following)