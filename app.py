from datetime import datetime, timedelta, timezone
import sqlalchemy
from flask import Flask, request, jsonify, session
from models import User
from flask_jwt_extended import JWTManager, create_access_token, get_jwt
from db import init_db, get_db
# from flask_cors import CORS

from controllers import api, graphql, users, posts

def create_app(test_config=None):
  # set up app:
  app = Flask(__name__, static_folder='build', static_url_path='')
  # CORS(app) # comment out on deployment

  app.url_map.strict_slashes = False
  app.config.from_mapping(
    SECRET_KEY='t1od1o23cha5n8ge1321t34h55i89s14z233to377z10so987meth159zi258zng418z676zmor1094ze1771z2865zs4636zec12139zure',
    JWT_SECRET_KEY='t1od1o23cha5n8ge1321t34h55i89s14z233to377z10so987meth159zi258zng418z676zmor1094ze1771z2865zs4636zec12139zure',
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
  )
  jwt = JWTManager(app)
 
  init_db(app)

  app.register_blueprint(api)
  app.register_blueprint(users)
  app.register_blueprint(posts)
  app.register_blueprint(graphql)

  @app.route('/', defaults={'path': ''})
  @app.route('/<path>')
  def index(path):
    return app.send_static_file('index.html')

  @app.route('/<path>/<id>')
  def post(path, id):
    return app.send_static_file('index.html')

  return app