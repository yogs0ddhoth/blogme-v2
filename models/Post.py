from datetime import datetime
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, select, func
from sqlalchemy.orm import relationship, column_property

from db import Base
from .Vote import Vote

class Post(Base):
  __tablename__ = 'posts'
  id = Column(Integer, primary_key=True, autoincrement='auto')
  title = Column(String(100), nullable=False)
  text = Column(String(300), nullable=False)
  user_id = Column(Integer, ForeignKey('users.id'))
  created_at = Column(DateTime, default=datetime.now)
  updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)

  vote_count = column_property(
    select( [func.count(Vote.id)] ).where(Vote.post_id == id)
  )

  user = relationship('User')
  comments = relationship('Comment', cascade='all,delete')

