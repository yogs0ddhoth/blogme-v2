from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime, select, func
from sqlalchemy.orm import relationship, column_property

from db import Base
from utils.filters import created_at, format_date
from .Vote import Vote

class Post(Base):
  __tablename__ = 'posts'
  id = Column(
    Integer, 
    primary_key=True, 
    autoincrement='auto'
  )
  title = Column(String(200), nullable=False)
  text = Column(Text(60000), nullable=False)
  user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
  
  created_at = Column(DateTime, default=datetime.now)
  updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)

  vote_count = column_property(
    select( [func.count(Vote.id)] ).where(Vote.post_id == id)
  )

  user = relationship('User')
  comments = relationship('Comment', cascade='all,delete')
  votes = relationship('Vote', cascade='all,delete')

  def as_dict(self):
    self.comments.sort(key=created_at)
    return {
      'id': self.id,
      'title': self.title,
      'text': self.text,
      'user': {
        'id': self.user.id,
        'name': self.user.name
      },
      'vote_count': self.vote_count,
      'votes': [v.as_dict() for v in self.votes],
      'comments': [c.as_dict() for c in self.comments],
      'created_at': self.created_at.isoformat(),
      'updated_at': self.updated_at.isoformat()
    }