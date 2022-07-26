import sys
import sqlalchemy
from flask import Blueprint, request, jsonify, session
from models import User
from db import get_db
from utils.auth import login_required

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
  return jsonify(id=newUser.id)

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
  return jsonify(id = user.id, loggedIn=session.get('loggedIn'))

@bp.route('/logout', methods=['POST'])
def logout(): # remove session variables
  session.clear()
  return '', 204