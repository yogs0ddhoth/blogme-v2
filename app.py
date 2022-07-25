from flask import Flask
from flask_cors import CORS

from api import api

def create_app(test_config = None):
  # set up app:
  app = Flask(__name__, static_folder='build', static_url_path = '')
  # CORS(app) # comment out on deployment

  app.url_map.strict_slashes = False
  app.config.from_mapping(
    SECRET_KEY='super_secret_key'
  )
  
  @app.route('/')
  def index():
    return app.send_static_file('index.html')

  app.register_blueprint(api)
  
  return app