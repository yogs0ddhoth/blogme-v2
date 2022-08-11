from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship

from db import Base

class Vote(Base):
  __tablename__ = 'votes'
  id = Column(Integer, primary_key=True)
  
  user_id = Column(Integer, ForeignKey('users.id'))
  post_id = Column(Integer, ForeignKey('posts.id'))

  user = relationship('User')

  def as_dict(self):
    return {
      'post': self.post_id,
      'user': {
        'id': self.user.id,
        'name': self.user.name
      }
    }