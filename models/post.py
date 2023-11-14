#!/usr/bin/python3
""" a module for the post model"""
from models.base_model import Base, BaseModel
from sqlalchemy import create_engine, Column, String, Text, Integer, ForeignKey, DateTime
from sqlalchemy.orm import relationship


# Create the engine and the session
engine = create_engine('sqlite:///pense.db', echo=True)
Session = sessionmaker(bind=engine)
session = Session()

class Post(BaseModel, Base):
    """Create the post model"""
    __tablename__ = 'posts'

    id = Column(Integer, primary_key=True)
    title = Column(String(100), nullable=False, unique=True)
    content = Column(Text, nullable=False)
    image = Column(String(100))
    category_id = Column(Integer, ForeignKey('categories.id'), nullable=False)
    description = Column(Text, nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'))
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)

    # Define the relationships
    category = relationship('Category', backref='posts')
    user = relationship('User', backref='posts')
    comments = relationship('Comment', backref='post')

     # Define the methods and properties
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
