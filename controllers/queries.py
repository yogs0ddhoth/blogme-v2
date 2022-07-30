from flask import session
from ariadne import convert_kwargs_to_snake_case
from models import Post
from db import get_db
from utils.filters import format_fields

def get_all_posts_resolver(obj, info):
  try:
    db = get_db()
    posts = []
    for p in (
      db.query(Post)
        .order_by(Post.created_at.desc())
        .all()
    ):
      post = format_fields(p.as_dict(), ['updated_at', 'created_at'])
      del post['user_id']
      post['user']= {'id': p.user.__dict__['id'], 'name': p.user.__dict__['name']}
      post['vote_count']=p.__dict__['vote_count']
      posts.append(post)
    print(posts)
    payload = {
      'success': True,
      'posts': posts
    }
  except Exception as error:
    payload = {
      'success': False,
      'errors': [str(error)]
    }
  return payload

@convert_kwargs_to_snake_case
def get_post_resolver(obj, info, id):
  try:
    db = get_db()
    p = ( # get single post by id
      db.query(Post)
        .filter(Post.id == id)
        .one()
    )
    print(p.__dict__)
    post = format_fields(p.as_dict(), ['updated_at', 'created_at'])
    del post['user_id']
    post['user']= {'id': p.user.__dict__['id'], 'name': p.user.__dict__['name']}
    post['vote_count']=p.__dict__['vote_count']
    payload = {
      'success': True,
      'post': post
    }
  except Exception as error:
    payload = {
      'success': False,
      'errors': [str(error)]
    }
  return payload
