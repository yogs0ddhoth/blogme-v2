from flask import Flask
from db import init_db
# from flask_cors import CORS

from controllers import api, graphql, users, posts

def create_app(test_config = None):
  # set up app:
  app = Flask(__name__, static_folder='build', static_url_path = '')
  # CORS(app) # comment out on deployment

  app.url_map.strict_slashes = False
  app.config.from_mapping(
    SECRET_KEY='TODO_change_this_to_something_secure'
  )
  init_db(app)

  @app.route('/')
  def index():
    return app.send_static_file('index.html')

  app.register_blueprint(api)
  app.register_blueprint(users)
  app.register_blueprint(posts)
  app.register_blueprint(graphql)
  
  return app