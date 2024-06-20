from .auth import auth_bp
from .user import user_bp
from .document import document_bp
from .like import like_bp
from .favourite import favourite_bp
from .follower import follower_bp

all_blueprints = [ auth_bp, user_bp, document_bp, like_bp, favourite_bp, follower_bp ]

def init_routes(app):
    for bp in all_blueprints:
        app.register_blueprint(bp)
