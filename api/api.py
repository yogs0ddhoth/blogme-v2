
from flask import Blueprint, request, jsonify, session

bp = Blueprint('api', __name__, url_prefix='/api')

@bp.route('/hello')
def hello():
  response = {
    'key_1': 'hello',
    'key_2': 'world',
  }
  return jsonify(response)