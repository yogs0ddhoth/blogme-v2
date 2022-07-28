import sys
import json
import sqlalchemy
from flask import Blueprint, request, jsonify, session
from models import User, Post
from db import get_db
from utils.auth import login_required
from utils.filters import format_fields

bp = Blueprint('users', __name__, url_prefix='/users')

@bp.route('/', methods=['POST'])
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

  session.clear()
  session['user_id'] = newUser.id
  session['loggedIn'] = True
  return jsonify(id=session['user_id'], loggedIn=session['loggedIn'])

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
  
  session.clear()
  session['user_id'] = user.id
  session['loggedIn'] = True
  return jsonify(id = session['user_id'], loggedIn=session['loggedIn'])

@bp.route('/logout', methods=['POST'])
def logout(): # remove session variables
  session.clear()
  return '', 204

@bp.route('/posts', methods=['GET'])
# @login_required
def get_posts():
  db = get_db() # connect to database
  posts = []
  for p in (
    db.query(Post) # get posts by session user_id
      .filter(Post.user_id == session.get('user_id'))
      .order_by(Post.created_at.desc())
      .all()
  ):
    post = format_fields(p.as_dict(), ['updated_at', 'created_at'])
    posts.append(post)

  print(json.dumps(posts))
  return json.dumps(posts)