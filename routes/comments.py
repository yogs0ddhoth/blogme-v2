import sys
import json
from flask import Blueprint, request, jsonify
from flask_jwt_extended import get_jwt_identity, jwt_required
from controllers import create_comment, update_comment, delete_comment

bp = Blueprint('comments', __name__, url_prefix='/comments')

# 'comments/' route 
'''
@expect:
  data: {
    post_id: string,
    test: string
  }
'''
@bp.route('/', methods=['Post'])
@jwt_required()
def create(): # {post_id: int, text: string}
  data = request.get_json()
  identity = get_jwt_identity()
  try:
    create_comment(identity['id'], data)
    return jsonify(message='Comment created.'), 201  

  except:
    print(f'```````````````````````` {sys.exc_info()[0]} ````````````````````````')
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
  try:
    update_comment(identity['id'], id, data)
    return jsonify(message='Comment updated.'), 204

  except PermissionError as msg:
    print(f'```````````````````````` {msg} ````````````````````````')
    return jsonify(message=msg.args[0]), 401

  except:
    print(f'```````````````````````` {sys.exc_info()[0]} ````````````````````````')
    return jsonify(message = 'Update failed'), 500

@bp.route('/<id>', methods=['DELETE'])
@jwt_required()
def delete(id):
  identity = get_jwt_identity()
  try:
    delete_comment(identity['id'], id)
    return '', 204
  except PermissionError as msg:
    print(f'```````````````````````` {msg} ````````````````````````')
    return jsonify(message=msg.args[0]), 401

  except:
    print(f'```````````````````````` {sys.exc_info()[0]} ````````````````````````')
    return jsonify(message = 'Comment not found'), 500