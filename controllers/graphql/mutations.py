from flask import session
from ariadne import convert_kwargs_to_snake_case
from models import Post
from db import get_db
from utils.filters import format_fields

@convert_kwargs_to_snake_case
def create_post_resolver(obj, info, title, text):
  db = get_db()
  try:
    newPost = Post(
      title = title,
      text = text,
      user_id = session.get('user_id')
    )
    db.add(newPost)
    db.commit()
    print(newPost)
    post = format_fields(newPost.as_dict(), ['updated_at', 'created_at'])
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