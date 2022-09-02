from models import User
from db import get_db

# signup
def create_user(data):
  db = get_db()
  try:
    new_user = User(name=data['name'], email=data['email'], password=data['password'])

    db.add(new_user)
    db.commit()
    return new_user
  except: 
    db.rollback()
    raise

# login
def get_user(email):
  db = get_db()
  try:
    return db.query(User).filter(User.email == email).one()
  except:
    raise

# get user as dict
def get_user_posts(id):
  db = get_db()
  try:
    return (
      db.query(User).filter(User.id == id).one()
    ).as_dict()
  except:
    raise