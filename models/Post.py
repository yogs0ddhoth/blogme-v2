from datetime import datetime
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, select, func
from sqlalchemy.orm import relationship, column_property

from db import Base
from utils.filters import format_date
from .Vote import Vote

class Post(Base):
  __tablename__ = 'posts'
  id = Column(
    Integer, 
    primary_key=True, 
    autoincrement='auto'
  )
  title = Column(String(200), nullable=False)
  text = Column(String, nullable=False)
  user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
  
  created_at = Column(DateTime, default=datetime.now)
  updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)

  vote_count = column_property(
    select( [func.count(Vote.id)] ).where(Vote.post_id == id)
  )

  user = relationship('User', back_populates='posts')
  comments = relationship('Comment', cascade='all,delete')
  votes = relationship('Vote', cascade='all,delete')

  def as_dict(self):
    return {
      'id': self.id,
      'title': self.title,
      'text': self.text,
      'user': {
        'id': self.user.id,
        'name': self.user.name
      },
      'vote_count': self.vote_count,
      'comments': [
        {
          'id': c.id,
          'text': c.text,
          'user': {
            'id': c.user.id,
            'name': c.user.name
          },
          'created_at': c.created_at.isoformat(),
          'updated_at': c.updated_at.isoformat()
        } for c in self.comments
      ],
      'created_at': self.created_at.isoformat(),
      'updated_at': self.updated_at.isoformat()
    }