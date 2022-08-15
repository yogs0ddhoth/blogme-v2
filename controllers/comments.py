import sys
import json
from flask import Blueprint, request, jsonify
from flask_jwt_extended import get_jwt_identity, jwt_required
from models import Post, Comment, Vote
from db import get_db

bp = Blueprint('comments', __name__, url_prefix='/comments')

# 'comments/' route 
@bp.route('/', methods=['Post'])
@jwt_required()
def create(): # {post_id: int, text: string}
  data = request.get_json()
  '''
  @expect:
    data: {
      post_id: string,
      test: string
    }
  '''
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

    return '', 201
  except:
    print(sys.exc_info()[0])

    db.rollback()
    return jsonify(message = 'Comment failed'), 500

# '/comments/<id>' routes
  '''
  @expect:
    data: {
      text: string
    }
  '''
@bp.route('/<id>', methods=['PUT'])
@jwt_required()
def update(id): # {text: string}
  data = request.get_json()
  identity = get_jwt_identity()
  db = get_db()
  try:
    comment = db.query(Comment).filter(Comment.id == id).one()

    if comment.user_id != identity['id']:
      return jsonify(message = 'Comment failed, User unauthorized.'), 401
      
    comment.text = data['text']

    db.commit()
    return '', 204
  except:
    print(sys.exc_info()[0])

    db.rollback()
    return jsonify(message = 'Comment failed'), 500

@bp.route('/<id>', methods=['DELETE'])
@jwt_required()
def delete(id):
  data = request.get_json()
  db = get_db()
  try:
    db.delete(
      db.query(Comment).filter(Comment.id == id).one()
    )
    db.commit()
    return '', 204
  except:
    print(sys.exc_info()[0])

    db.rollback()
    return jsonify(message = 'Comment not found'), 500