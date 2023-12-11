#!/usr/bin/python3
"""a module for base class"""
from datetime import datetime
from sqlalchemy import Column, Integer, DateTime
from sqlalchemy.orm import declarative_base


Base = declarative_base()
class BaseModel:
    """
        A Base model class
    """
    id = Column(Integer, autoincrement=True, unique=True, primary_key=True, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    def __init__(self, **kwargs) -> None:
        """ Initialization method """
        if kwargs:
            for key, value in kwargs.items():
                if key == 'created_at' or key == 'updated_at':
                    setattr(self, key, datetime.strptime(value, 
                                                        "%Y-%m-%dT%H:%M:%S.%f"))
                elif key == '__class__':
                    del key
                else:
                    setattr(self, key, value)
        else:
            self.id = BaseModel.id
            BaseModel.id += 1
            self.created_at = datetime.utcnow()
            self.updated_at = datetime.utcnow()

    def __str__(self) -> str:
        """ returns a string representation of the instance """
        return "[{}] ({}) {}".format(self.__class__.__name__, self.id, 
                                     self.__dict__)
    
    def save(self) -> None:
        from models import storage
        """ updates the public instance attribute updated_at with the current
        datetime """
        self.updated_at = datetime.utcnow()
        storage.new(self)
        storage.save()

    def to_dict(self) -> dict:
        """ returns a dictionary containing all keys/values of __dict__ of the
        instance """
        new_dict = self.__dict__.copy()
        new_dict['__class__'] = self.__class__.__name__
        new_dict['created_at'] = self.created_at.isoformat()
        new_dict['updated_at'] = self.updated_at.isoformat()
        if '_sa_instance_state' in new_dict:
            del new_dict['_sa_instance_state']
        return new_dict
    
    def delete(self) -> None:
        from models import storage
        """ deletes the current instance from the storage """
        storage.delete(self)
        