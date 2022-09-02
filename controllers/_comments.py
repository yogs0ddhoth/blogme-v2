from models import Comment
from db import get_db

def create_comment(user_id, data):
  db = get_db()
  try:
    newComment = Comment(text=data['text'], post_id=data['post_id'], user_id=user_id)

    db.add(newComment)
    db.commit()
    return
  except:
    db.rollback()
    raise

def update_comment(user_id, comment_id, data):
  db = get_db()
  try:
    comment = db.query(Comment).filter(Comment.id == comment_id).one()

    if comment.user_id != user_id:
      raise PermissionError('Update failed, User is not authorized.')

    comment.text = data['text']
    db.commit()
    return
  except:
    db.rollback()
    raise

def delete_comment(user_id, comment_id):
  db = get_db()
  try:
    comment = db.query(Comment).filter(Comment.id == comment_id).one()

    if comment.user_id != user_id:
      raise PermissionError('Update failed, User is not authorized.')

    db.delete(comment)
    db.commit()
    return
  except:
    db.rollback()
    raise