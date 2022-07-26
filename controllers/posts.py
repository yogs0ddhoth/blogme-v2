import sys
import sqlalchemy
from flask import Blueprint, request, jsonify, session
from models import Post, Comment
from db import get_db
from utils.auth import login_required

bp = Blueprint('posts', __name__, url_prefix='/posts')

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

@bp.route('/<id>', methods=['PUT'])
# @login_required # require the user to be logged in
def update(id):
  data = request.get_json()
  db = get_db()
  try:
    post = ( # query Posts, retrieve single Post by id
      db.query(Post)
        .filter(Post.id == id)
        .one()
    )
    post.title = data['title'] # update title
    db.commit()
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

@bp.route('/upvote', methods=['PUT'])
# @login_required
def upvote():
  data = request.get_json()
  db = get_db()
  try:
    newVote = Vote( # create new Vote 
      post_id = data['post_id'],
      user_id = session.get('user_id')
    )
    db.add(newVote)
    db.commit()
  except:
    print(sys.exc_info()[0])

    db.rollback()
    return jsonify(message = 'Upvote failed'), 500
  
  return '', 204

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