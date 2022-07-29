import sys
import json
from flask import Blueprint, request, jsonify, session
from models import Post, Comment, Vote
from db import get_db
from utils.auth import login_required
from utils.filters import format_fields

bp = Blueprint('posts', __name__, url_prefix='/posts')

@bp.route('/', methods=['GET'])
# @login_required
def get_all_posts():
  db = get_db() # connect to database
  posts = []
  for p in (
    db.query(Post) # get all posts
      .order_by(Post.created_at.desc())
      .all()
  ):
    post = format_fields(p.as_dict(), ['updated_at', 'created_at'])
    del post['user_id']
    post['user']= {'id': p.user.__dict__['id'], 'name': p.user.__dict__['name']}
    post['vote_count']=p.__dict__['vote_count']
    posts.append(post)

  print(json.dumps(posts))
  return json.dumps(posts)

@bp.route('/', methods=['POST'])
# @login_required
def create():
  data = request.get_json()
  db = get_db()
  try:
    newPost = Post( # create new Post
      title = data['title'],
      post_url = data['post_url'],
      user_id = session.get('user_id')
    )
    db.add(newPost)
    db.commit()
  except:
    print(sys.exc_info()[0])

    db.rollback()
    return jsonify(message = 'Post failed'), 500

  return jsonify(id = newPost.id)

@bp.route('/<id>', methods=['GET'])
# @login_required
def edit(id):
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
  return jsonify(post)

@bp.route('/<id>', methods=['PUT'])
# @login_required # require the user to be logged in
def update(id):
  data = request.get_json()
  db = get_db()
  try:
    post = ( # get single Post by id
      db.query(Post)
        .filter(Post.id == id)
        .one()
    )
    post.title = data['title'] # update title
    db.commit() # update model
  except:
    print(sys.exc_info()[0])

    db.rollback()
    return jsonify(message = 'Post not found'), 404
  
  return '', 204

@bp.route('/<id>', methods=['DELETE'])
# @login_required
def delete(id):
  db = get_db()
  try:
    db.delete( # delete:
      db.query(Post) # single Post by id
        .filter(Post.id == id)
        .one()
    )
    db.commit()
  except:
    print(sys.exc_info()[0])

    db.rollback()
    return jsonify(message = 'Post not found'), 404
  
  return '', 204

# @bp.route('/upvote', methods=['PUT'])
# # @login_required
# def upvote():
#   data = request.get_json()
#   db = get_db()
#   try:
#     newVote = Vote( # create new Vote 
#       post_id = data['post_id'],
#       user_id = session.get('user_id')
#     )
#     db.add(newVote)
#     db.commit()
#   except:
#     print(sys.exc_info()[0])

#     db.rollback()
#     return jsonify(message = 'Upvote failed'), 500
  
#   return '', 204

@bp.route('/comment', methods=['Post'])
# @login_required
def comment():
  data = request.get_json()
  db = get_db()
  try:
    newComment = Comment( # create new Comment
      comment_text = data['comment_text'],
      post_id = data['post_id'],
      user_id = session.get('user_id')
    )
    db.add(newComment)
    db.commit()
  except:
    print(sys.exc_info()[0])

    db.rollback()
    return jsonify(message = 'Comment failed'), 500

  return jsonify(id = newComment.id)