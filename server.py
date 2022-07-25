from flask import Flask

def create_app(test_config = None):
  # set up app:
  app = Flask(__name__, static_folder='build', static_url_path = '/')

  app.url_map.strict_slashes = False
  app.config.from_mapping(
    SECRET_KEY='super_secret_key'
  )
  
  @app.route('/')
  def index():
    return app.send_static_file('index.html')

  @app.route('/hello') # test route
  def hello(): 
    return {
      'key_1': 'hello',
      'key_2': 'world'
    }
  
  return app