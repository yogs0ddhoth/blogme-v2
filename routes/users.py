import sys
import json
from datetime import datetime, timedelta, timezone
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, jwt_required, unset_jwt_cookies
import sqlalchemy
from flask import Blueprint, request, jsonify, session
from controllers import create_user, get_user, get_user_posts

bp = Blueprint('users', __name__, url_prefix='/users')

# auth
'''
@expect:
  get_jwt_identity() = {
    'id': int,
    'user': string
  }
'''
@bp.after_request
def refresh_expiring_jwt(response):
  try:
    exp_timestamp = get_jwt()['exp']
    now = datetime.now(timezone.utc)
    target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
    if target_timestamp > exp_timestamp:
      access_token = create_access_token(identity=get_jwt_identity())
      data = response.get_json()
      if type(data) is dict:
        data['access_token'] = access_token
        response.data = json.dumps(data)
    return response
  except (RuntimeError, KeyError):
    return response

# '/users' routes

@bp.route('/', methods=['GET'])
@jwt_required()
def get_posts():
  identity = get_jwt_identity()
  print(f'```````````````````````` {identity} ````````````````````````') 
  try:
    user_posts = get_user_posts(identity['id'])
    return jsonify(user_posts), 200
  except Exception:
    print(f'```````````````````````` {Exception.__class__} ````````````````````````') 
    return '', 500

# '/signup'
  '''
  @expect:
    data: {
      name: string,
      email: string,
      password: string
    }
  '''
@bp.route('/signup', methods=['POST'])
def signup():
  data = request.get_json()
  try:
    user = create_user(data)

    print(f'---------- Success! {user.name}, {user.email}, signed up! ----------')
    return jsonify(
      access_token=create_access_token(
        identity={'id': user.id, 'user': user.name}
      )
    ), 201
  except AssertionError:
    print(f'````````````````````````  Validation Error: {AssertionError} ```````````````````````` ')
    return jsonify(message='Signup Failed'), 500

  except sqlalchemy.exc.IntegrityError as msg:
    code = msg.orig.args[0]
    print(f'````````````````````````  MySQL Error: {code}, {msg.orig.args[1]} ```````````````````````` ')
    
    if code == 1062:
      return jsonify(message='User already exists.'), 400

    return jsonify(message='Signup Failed.'), 500

  except:
    print(f'```````````````````````` {sys.exc_info()[0]} ````````````````````````')
    return jsonify(message='Signup Failed.'), 500


# '/login'
  '''
  @expect:
    data: {
      email: string,
      password: string
    }
  '''
@bp.route('/login', methods=['POST'])
def login():
  data = request.get_json()
  try:
    user = get_user(data['email'])

    if user.verify_password(data['password']) == False:
      return jsonify(message='Incorrect credentials'), 401

    print(f'```````````````````````` {user.name}, {user.email} logged in. ```````````````````````` ')
    return jsonify(
      access_token=create_access_token(
        identity={'id': user.id, 'user': user.name}
      )
    ), 201
  except sqlalchemy.exc.NoResultFound as msg:
    print(f'````````````````````````  No result found: {msg} ```````````````````````` ')
    return jsonify(message='Incorrect credentials'), 401

  except:
    print(f'```````````````````````` {sys.exc_info()[0]} ````````````````````````')
    return jsonify(message='Login Failed.'), 500

@bp.route('/logout', methods=['POST'])
@jwt_required()
def logout(): # remove session variables
  identity = get_jwt_identity()
  print(f'```````````````````````` {identity} logged out. ````````````````````````')
  session.clear()
  response = jsonify(message='Logged out')
  unset_jwt_cookies(response)
  return response, 200