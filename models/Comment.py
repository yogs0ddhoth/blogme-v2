from datetime import datetime
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship

from db import Base

class Comment(Base):
  __tablename__ = 'comments'
  id = Column(
    Integer, 
    primary_key=True, 
    autoincrement='auto'
  )
  text = Column(String(255), nullable=False)
  user_id = Column(Integer, ForeignKey('users.id'))
  post_id = Column(Integer, ForeignKey('posts.id'))
  
  created_at = Column(DateTime, default=datetime.now)
  updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)

  user = relationship('User')

  def as_dict(self):
   return {c.name: getattr(self, c.name) for c in self.__table__.columns}