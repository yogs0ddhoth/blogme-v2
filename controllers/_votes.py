from models import  Vote
from db import get_db

def create_vote(user_id, post_id):
  db = get_db()
  try:
    new_vote = Vote(post_id=post_id, user_id=user_id)

    db.add(new_vote)
    db.commit()
    return
  except:
    db.rollback()
    raise

def  delete_vote(user_id, post_id):
  db = get_db()
  try:
    db.delete(
      db.query(Vote)
        .filter(Vote.user_id == user_id, Vote.post_id == post_id)
        .one()
    )

    db.commit()
    return
  except:
    db.rollback()
    raise