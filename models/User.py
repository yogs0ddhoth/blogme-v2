from audioop import reverse
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import validates, relationship

from db import Base

import bcrypt

from utils.filters import created_at, format_date
salt = bcrypt.gensalt()

class User(Base):
  __tablename__ = 'users'
  id = Column(
    Integer, 
    primary_key=True, 
    autoincrement='auto'
  )
  name = Column(String(75), nullable=False)
  email = Column(String(75), nullable=False, unique=True)
  password = Column(String(100), nullable=False)

  posts = relationship('Post', back_populates='user')
  @validates('email')
  def validate_email(self, key, email):
    assert '@' in email
    return email

  @validates('password')
  def validate_password(self, key, password):
    assert len(password) > 4
    return bcrypt.hashpw(password.encode('utf-8'), salt)

  def verify_password(self, password):
    return bcrypt.checkpw(
      password.encode('utf-8'), self.password.encode('utf-8')
    )

  def as_dict(self):
    self.posts.sort(key=created_at, reverse=True)
    return {
     'id': self.id,
     'name': self.name,
     'posts': [p.as_dict() for p in self.posts]
    }