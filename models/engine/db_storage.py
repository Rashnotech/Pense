#!/usr/bin/python3
""" a module that stores in the database """
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session, Session
from models.base_model import Base, BaseModel
from models.user import User
from models.post import Post
from models.likes import Like
from models.comment import Comment
from models.category import Category
from sys import modules


classes = {'User': User, 'Post': Post, 'likes': Like,
                   'Comment': Comment, 'Category': Category}


class DBStorage:
    """
        DBStorage class that implements the storage in database
        Attrs:
            __engine: a private attribute
            __session: a private attribue
    """
    __engine = None
    __session = None

    def __init__(self):
        """ Initialize the DBStorage instance. """
        self.__engine = create_engine('sqlite:///pense.db')

    def all(self, cls=None):
        """
            Query all object in the current database session.
            Args:
                cls (class): The class to query. If None, query all types of
                objects.
            Returns:
                dict: A dictionary with keys in the format below
                <class-name>.<object-id>
        """
        obj_dict = {}
        if cls:
            cls = getattr(modules[__name__], cls.__name__)
            result = self.__session.query(cls).all()
        else:
            result = []
            for class_name in classes:
                result.extend(self.__session.query(classes[class_name]).all())
        
        for obj in result:
            key = '{}.{}'.format(type(obj).__name__, obj.id)
            obj_dict[key] = obj
        return obj_dict

    def new(self, obj):
        """
        Add the object to the current database session.
        Args:
            obj (BaseModel): The object to add to the session.
        """
        self.__session.add(obj)

    def save(self):
        """Commit all changes of the current database session."""
        self.__session.commit()

    def delete(self, obj=None):
        """
        Delete an object from the current database session if it's
        not None.

        Args:
            obj (BaseModel): The object to delete from the session
        """
        if obj:
            self.__session.delete(obj)

    def reload(self):
        """
        Create all tables in the database and create the current database
        session.
        """
        Base.metadata.create_all(self.__engine)
        session = sessionmaker(bind=self.__engine, expire_on_commit=False)
        self.__session = scoped_session(session)

    def close(self):
        """a method that callremove method"""
        self.__session.remove()

    def get(self, cls, id):
        """Retrieve objects from storage"""
        objs = self.__session.query(cls).filter_by(id=id).first()
        return objs

    def count(self, cls=None):
        """count the number of objects in storage """
        if cls is None:
            count = 0
            for clss in classes.values():
                count += self.__session.query(clss).count()
        else:
            count = self.__session.query(cls).count()

