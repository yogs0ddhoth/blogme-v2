import sys
import json
from flask import Blueprint, request, jsonify, session
from flask_jwt_extended import get_jwt_identity, jwt_required
from models import Post, Comment, Vote
from db import get_db
from utils.auth import login_required
from utils.filters import format_fields

bp = Blueprint('posts', __name__, url_prefix='/posts')

@bp.route('/', methods=['GET'])
def get_all_posts():
  db = get_db() # connect to database
  posts = [
    p.as_dict() for p in (
      db.query(Post) # get all posts
        .order_by(Post.created_at.desc())
        .all()
    )
  ]
  print(json.dumps(posts))
  return json.dumps(posts)

@bp.route('/', methods=['POST'])
@jwt_required()
def create():
  data = request.get_json()
  identity = get_jwt_identity()
  db = get_db()
  try:
    print(identity)
    newPost = Post( # create new Post
      title = data['title'],
      text = data['text'],
      user_id = identity['id']
    )
    db.add(newPost)
    db.commit()
  except:
    print(sys.exc_info()[0])

    db.rollback()
    return jsonify(message = 'Post failed'), 500

  return jsonify(id = newPost.id), 201

@bp.route('/<id>', methods=['GET'])
def get(id):
  try:
    db = get_db()
    post = ( # get single post by id
      db.query(Post)
        .filter(Post.id == id)
        .one()
    ).as_dict()
    print(post)
    return jsonify(post)
  except:
    print(sys.exc_info()[0])

    db.rollback()
    return jsonify(message = 'Posts not found'), 404

@bp.route('/<id>', methods=['PUT'])
@jwt_required()
def update(id):
  data = request.get_json()
  db = get_db()
  try:
    post = ( # get single Post by id
      db.query(Post)
        .filter(Post.id == id)
        .one()
    )
    if data['title']:
      post.title = data['title']
    if data['text']:
      post.text = data['text']

    db.commit() # update model
  except:
    print(sys.exc_info()[0])

    db.rollback()
    return jsonify(message = 'Post not found'), 404
  
  return '', 204

@bp.route('/<id>', methods=['DELETE'])
@jwt_required()
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
@jwt_required()
def upvote():
  data = request.get_json()
  identity = get_jwt_identity()
  db = get_db()
  try:
    newVote = Vote( # create new Vote 
      post_id = data['post_id'],
      user_id = identity['id']
    )
    db.add(newVote)
    db.commit()
  except:
    print(sys.exc_info()[0])

    db.rollback()
    return jsonify(message = 'Upvote failed'), 500
  
  return '', 204

@bp.route('/comment', methods=['Post'])
@jwt_required()
def comment():
  data = request.get_json()
  identity = get_jwt_identity()
  db = get_db()
  try:
    newComment = Comment( # create new Comment
      text = data['text'],
      post_id = data['post_id'],
      user_id = identity['id']
    )
    db.add(newComment)
    db.commit()
  except:
    print(sys.exc_info()[0])

    db.rollback()
    return jsonify(message = 'Comment failed'), 500

  return jsonify(id = newComment.id)
