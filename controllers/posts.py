import sys
import json
from flask import Blueprint, request, jsonify
from flask_jwt_extended import get_jwt_identity, jwt_required
from models import Post, Comment, Vote
from db import get_db

bp = Blueprint('posts', __name__, url_prefix='/posts')

# '/posts/' routes 
@bp.route('/', methods=['GET'])
def get_all():
  db = get_db() # connect to database
  posts = [
    p.as_dict() for p in (
      db.query(Post) # get all posts
        .order_by(Post.created_at.desc()).all()
    )
  ]
  print(json.dumps(posts))
  return json.dumps(posts)

  '''
  @expect:
    data: {
      title: string,
      text: string
    }
  '''
@bp.route('/', methods=['POST'])
@jwt_required()
def create():
  data = request.get_json()
  identity = get_jwt_identity()
  db = get_db()
  try:
    newPost = Post( # create new Post
      title = data['title'],
      text = data['text'],
      user_id = identity['id']
    )
    db.add(newPost)
    db.commit()
    return jsonify(id = newPost.id), 201
  except:
    print(sys.exc_info()[0])

    db.rollback()
    return jsonify(message = 'Post failed'), 500

# '/posts/<id>' routes
  '''
  @expect:
    data: {
      title: string,
      text: string
    }
  '''
@bp.route('/<id>', methods=['GET'])
def get(id):
  try:
    db = get_db()
    post = ( # get single post by id
      db.query(Post).filter(Post.id == id).one()
    ).as_dict()

    return jsonify(post)
  except:
    print(sys.exc_info()[0])

    db.rollback()
    return jsonify(message = 'Posts not found'), 404

@bp.route('/<id>', methods=['PUT'])
@jwt_required()
def update(id):
  data = request.get_json()
  identity = get_jwt_identity()
  db = get_db()
  try:
    post = db.query(Post).filter(Post.id == id).one()

    if post.user_id != identity['id']:
      return jsonify(message = 'Update failed, User is not authorized.'), 401

    if data['title']:
      post.title = data['title']
    if data['text']:
      post.text = data['text']

    db.commit() # update model
    return '', 204
  except:
    print(sys.exc_info()[0])

    db.rollback()
    return jsonify(message = 'Post not found'), 404

@bp.route('/<id>', methods=['DELETE'])
@jwt_required()
def delete(id):
  identity = get_jwt_identity()
  db = get_db()
  try:
    post = db.query(Post).filter(Post.id == id).one()

    if post.user_id != identity['id']:
      return jsonify(message = 'Update failed, User is not authorized.'), 401

    db.delete(post)
    db.commit()
    return '', 204
  except:
    print(sys.exc_info()[0])

    db.rollback()
    return jsonify(message = 'Post not found'), 404

# '/posts/upVote' routes
  '''
  @expect:
    data: { 
      post_id: int, 
      user: { 
        id: int, 
        name: string 
      } 
    }
  '''
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
    return '', 204
  except:
    print(sys.exc_info()[0])

    db.rollback()
    return jsonify(message = 'Upvote failed'), 500

@bp.route('/upvote', methods=['DELETE'])
@jwt_required()
def delete_vote():
  data = request.get_json()
  identity = get_jwt_identity()
  
  if data['user']['id'] != identity['id']:
    return jsonify(message = 'Update failed, User is unauthorized.'), 401

  db = get_db()
  try:
    db.delete(
      db.query(Vote)
        .filter(Vote.post_id == data['post_id'], Vote.user_id == data['user']['id'])
        .one()
    )
    db.commit()
    return '', 204
  except:
    print(sys.exc_info()[0])

    db.rollback()
    return jsonify(message = 'Delete failed'), 500