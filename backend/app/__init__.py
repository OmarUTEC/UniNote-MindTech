from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config import Config

from flask_cors import CORS

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    db.init_app(app)
    CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
    
    with app.app_context():
        from .routes import main as main_blueprint
        app.register_blueprint(main_blueprint)
    

    return app
