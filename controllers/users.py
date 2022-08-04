import json
from datetime import datetime, timedelta, timezone
from unicodedata import name
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, jwt_required, unset_jwt_cookies
import sqlalchemy
from flask import Blueprint, request, jsonify, session
from models import User, Post
from db import get_db
from utils.auth import login_required
from utils.filters import format_fields

bp = Blueprint('users', __name__, url_prefix='/users')

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

@bp.route('/', methods=['GET'])
@jwt_required()
def get_posts():
  data = request.json.get('name')
  identity = get_jwt()
  print("!!!!!!!!!!!!!!!!!!!!!!!!!!", identity, "!!!!!!!!!!!!!!!!!!!!!!!!!!")
  db = get_db() # connect to database
  user = ( # identity['sub']: {'name': 'seed1', 'email': 'seed1@cbc.ca'}
    db.query(User)
    .filter(User.email == identity['sub']['email'])
    .one()
  ).as_dict()
  print(user)
  return jsonify(user)

@bp.route('/signup', methods=['POST'])
def signup(): # req: {name:string, email:string, password:string}
  data = request.get_json()
  db = get_db()
  try:
    newUser = User(
      name = data['name'],
      email = data['email'],
      password = data['password']
    )
    db.add(newUser)
    db.commit()
    print('Success!')
  
  except AssertionError:
    print('Validation Error')
    db.rollback()
    return jsonify(message='Signup Failed'), 500

  except sqlalchemy.exc.IntegrityError:
    print('MySQL Error')
    db.rollback()
    return jsonify(message='Signup Failed'), 500

  access_token = create_access_token(identity={'name': data['name'], 'email': data['email']})
  session.clear()
  session['user_id'] = newUser.id
  session['loggedIn'] = True
  return jsonify(id=newUser.id, name=newUser.name, access_token=access_token)

@bp.route('/login', methods=['POST'])
def login(): # req: {email:string, password:string}
  data = request.get_json()
  db = get_db()
  try:
    user = ( # get single user by email
      db.query(User)
        .filter(User.email == data['email'])
        .one()
    )
  except sqlalchemy.exc.NoResultFound:
    print('No result found')
    return jsonify(message = 'Incorrect credentials'), 400
  
  if user.verify_password(data['password']) == False:
    return jsonify(message = 'Incorrect credentials'), 400
  
  access_token = create_access_token(identity={'name': user.name, 'email': user.email})
  session.clear()
  session['user_id'] = user.id
  session['loggedIn'] = True
  return jsonify(id=user.id, name=user.name, access_token=access_token)

@bp.route('/logout', methods=['POST'])
def logout(): # remove session variables
  session.clear()
  response = jsonify({'message': 'logout successful'})
  unset_jwt_cookies(response)
  return response