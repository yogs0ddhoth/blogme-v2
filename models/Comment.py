from datetime import datetime
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship

from db import Base
from utils.filters import format_date

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
   return {
    'id': self.id,
    'text': self.text,
    'post_id': self.post_id,
    'created_at': format_date(self.created_at),
    'updated_at': format_date(self.updated_at)
   }