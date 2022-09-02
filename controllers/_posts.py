from models import Post
from db import get_db

def get_all_posts():
  db = get_db()
  return [
    p.as_dict() for p in (
      db.query(Post)
        .order_by(Post.created_at.desc())
        .all()
    )
  ]

def get_post_by_id(id):
  db = get_db()
  try:
    return (
      db.query(Post).filter(Post.id == id).one()
    ).as_dict()
  except:
    raise

def create_post(user_id, data):
  db = get_db()
  try:
    new_post = Post(title=data['title'], text=data['text'], user_id=user_id)
    
    db.add(new_post)
    db.commit()
    return
  except:
    db.rollback()
    raise

def update_post(user_id, post_id, data):
  db = get_db()
  try:
    post = db.query(Post).filter(Post.id == post_id).one()

    if post.user_id != user_id:
      raise PermissionError('Update failed, User is not authorized.')

    if data['title']:
      post.title = data['title']
    if data['text']:
      post.text = data['text']

    db.commit()
    return
  except: 
    db.rollback()
    raise

def delete_post(user_id, post_id):
  db = get_db()
  try:
    post = db.query(Post).filter(Post.id == post_id).one()

    if post.user_id != user_id:
      raise PermissionError('Update failed, User is not authorized.')

    db.delete(post)
    db.commit()
    return
  except:
    db.rollback()
    raise