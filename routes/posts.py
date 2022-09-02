import sys
import json
from flask import Blueprint, request, jsonify
from flask_jwt_extended import get_jwt_identity, jwt_required
from controllers import get_all_posts, get_post_by_id, create_post, update_post, delete_post, create_vote, delete_vote

# '/posts/' routes 
bp = Blueprint('posts', __name__, url_prefix='/posts')

@bp.route('/', methods=['GET'])
def get_all():
  return json.dumps(get_all_posts())

# 
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
  identity, data = get_jwt_identity(), request.get_json()
  try:
    create_post(identity['id'], data)
    return jsonify(message='Post created.'), 201
  except:
    print(f'```````````````````````` {sys.exc_info()[0]} ````````````````````````')
    return jsonify(message='Post failed.'), 500

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
    post = get_post_by_id(id)
    return jsonify(post), 200

  except:
    print(f'```````````````````````` {sys.exc_info()[0]} ````````````````````````')
    return jsonify(message='Posts not found.'), 500

@bp.route('/<id>', methods=['PUT'])
@jwt_required()
def update(id):
  identity, data = get_jwt_identity(), request.get_json()
  try:
    update_post(identity['id'], id, data),
    return jsonify(message='Post updated.'), 204
    
  except PermissionError as msg:
    print(f'```````````````````````` {msg} ````````````````````````')
    return jsonify(message=msg.args[0]), 401

  except:
    print(f'```````````````````````` {sys.exc_info()[0]} ````````````````````````')
    return jsonify(message='Post not found.'), 500

@bp.route('/<id>', methods=['DELETE'])
@jwt_required()
def delete(id):
  identity = get_jwt_identity()
  try:
    delete_post(identity['id'], id)
    return jsonify(message='Post deleted.'), 204

  except PermissionError as msg:
    print(f'```````````````````````` {msg} ````````````````````````')
    return jsonify(message=msg.args[0]), 401

  except:
    print(f'```````````````````````` {sys.exc_info()[0]} ````````````````````````')
    return jsonify(message='Post not found.'),500

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
  try:
    create_vote(identity['user']['id'], data['post_id'])
    return jsonify(message='Upvote success.'), 204
  except:
    print(f'```````````````````````` {sys.exc_info()[0]} ````````````````````````')
    return jsonify(message='Upvote failed.'), 500

@bp.route('/upvote', methods=['DELETE'])
@jwt_required()
def delete_upvote():
  data = request.get_json()
  identity = get_jwt_identity()

  user_id = data['user']['id']
  
  if user_id != identity['id']:
    return jsonify(message = 'Update failed, User is unauthorized.'), 401

  try:
    delete_vote(user_id, identity['id'])
    return jsonify(message='Upvote deleted.'), 204
  except:
    print(f'```````````````````````` {sys.exc_info()[0]} ````````````````````````')
    return jsonify(message='Delete failed'), 500