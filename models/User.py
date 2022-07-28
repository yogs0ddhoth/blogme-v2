from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import validates

from db import Base

import bcrypt
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
   return {c.name: getattr(self, c.name) for c in self.__table__.columns}