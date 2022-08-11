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
  text = Column(String(300), nullable=False)
  user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
  post_id = Column(Integer, ForeignKey('posts.id'), nullable=False)
  
  created_at = Column(DateTime, default=datetime.now)
  updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)

  user = relationship('User')

  def as_dict(self):
   return {
    'id': self.id,
    'text': self.text,
    'post_id': self.post_id,
    'created_at': self.created_at.isoformat(),
    'updated_at': self.updated_at.isoformat(),
    "user": {
      "id": self.user.id,
      "name": self.user.name
    }
   }