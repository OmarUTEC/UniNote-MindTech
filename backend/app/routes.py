from flask import Blueprint, request, session, jsonify, redirect, url_for, abort
from app.models import Usuarios, Carreras, Documentos, Follows
from . import db
from .google_oauth import get_google_oauth_flow
from config import Config
import requests
from pip._vendor import cachecontrol
import google.auth.transport.requests
from google.oauth2 import id_token

main = Blueprint('main', __name__)

def login_is_required(function):
    def wrapper(*args, **kwargs):
        if "google_id" not in session:
            return abort(401)
        else:
            return function(*args, **kwargs)
    wrapper.__name__ = function.__name__
    return wrapper

@main.route("/login-google")
def login():
    flow = get_google_oauth_flow()
    authorization_url, state = flow.authorization_url()
    session["state"] = state
    return redirect(authorization_url)

@main.route("/callback")
def callback():
    try:
        flow = get_google_oauth_flow()
        flow.fetch_token(authorization_response=request.url)

        state_in_session = session.get("state")
        state_in_request = request.args.get("state")
        if not state_in_session or not state_in_request or state_in_session != state_in_request:
            abort(500, description="Error en la validación del estado.")

        credentials = flow.credentials
        request_session = requests.session()
        cached_session = cachecontrol.CacheControl(request_session)
        token_request = google.auth.transport.requests.Request(session=cached_session)
        id_info = id_token.verify_oauth2_token(
            id_token=credentials._id_token,
            request=token_request,
            audience=Config.GOOGLE_CLIENT_ID
        )

        user = Usuarios.query.filter_by(email=id_info.get("email")).first()
        if not user:
            user = Usuarios(
                username=id_info.get("name"),
                email=id_info.get("email"),
            )
            db.session.add(user)
        db.session.commit()

        session["google_id"] = id_info.get("sub")
        session["name"] = id_info.get("name")

        return redirect(url_for("main.protected_area"))

    except Exception as e:
        print(f"Error en el callback: {e}")  
        abort(500, description=f"Error interno del servidor: {str(e)}")

@main.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("main.index"))

@main.route("/")
def index():
    return "Hello World <a href='/login-google'><button>Login</button></a>"

@main.route("/protected_area")
@login_is_required
def protected_area():
    return f"Hello {session.get('name')}! <a href='/logout'><button>Logout</button></a>"

def init_routes(app):
    app.register_blueprint(main)




@main.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data['username']
    password = data['password']
    email = data['email']
    if Usuarios.query.filter_by(username=username).first():
        return jsonify({'message': 'User already exists'}), 400
    new_user = Usuarios(username=username, email = email)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User created successfully'}), 200

@main.route('/login', methods=['POST'])
def login_simple():
    data = request.get_json()
    user = Usuarios.query.filter_by(email=data['email']).first()
    if user and user.check_password(data['password']):
        return jsonify({'message': 'Logged in successfully'}), 200
    return jsonify({'message': 'Invalid username or password'}), 400

@main.route('/usuarios', methods=['GET'])
def get_users():
    all_users = Usuarios.query.all()
    lista_users = [{'usuario_id':users.usuario_id,'username': users.username, 'email': users.email} for users in all_users]
    return jsonify(lista_users), 200

@main.route('/usuarios/<usuario_id>', methods=['GET','PUT','DELETE'])
def route_user_id(usuario_id):
    if request.method == 'GET':
        user = Usuarios.query.filter_by(usuario_id=usuario_id).first()
        if user:
            return jsonify({
                'username': user.username,
                'email': user.email
            }), 200
        return jsonify({'message': 'User not found'}), 404
    elif request.method == 'PUT':
        user = Usuarios.query.filter_by(usuario_id=usuario_id).first()
        if user:
            data = request.get_json()
            if 'username' in data:
                user.username = data['username']
            if 'foto_perfil_url' in data:
                user.foto_perfil_url = data['foto_perfil_url']
            db.session.commit()
            return jsonify({'message': 'User updated successfully'}), 200
        return jsonify({'message': 'User not found'}), 404
    elif request.method == 'DELETE':
        user = Usuarios.query.filter_by(usuario_id=usuario_id).first()
        if user:
            db.session.delete(user)
            db.session.commit()
            return jsonify({'message': 'User deleted successfully'}), 200
        return jsonify({'message': 'User not found'}), 404

@main.route('/carreras', methods=['GET'])
def get_carreras():
    todas_carreras = Carreras.query.all()
    lista_carreras = [{'carrera_id': carrera.carrera_id, 'nombre': carrera.nombre} for carrera in todas_carreras]
    
    return jsonify(lista_carreras), 200

@main.route('/documentos',methods=['GET'])
def get_documentos():
    todos_documentos = Documentos.query.all()
    return jsonify(todos_documentos),200

@main.route('/followers/<usuario_id>', methods=['GET'])
def get_followers(usuario_id):
    usuario = Usuarios.query.get(usuario_id)
    if not usuario:
        return jsonify({'message': 'Usuario no encontrado'}), 404
    seguidores = db.session.query(Usuarios).join(Follows, Usuarios.usuario_id == Follows.follower_id).filter(Follows.following_id == usuario_id).all()    
    lista_seguidores = [{'username': seguidor.username} for seguidor in seguidores]
    
    return jsonify(lista_seguidores), 200

@main.route('/following/<usuario_id>', methods=['GET'])
def get_following(usuario_id):
    usuario = Usuarios.query.get(usuario_id)
    if not usuario:
        return jsonify({'message': 'User not found'}),404
    following = db.session.query(Usuarios).join(Follows, Usuarios.usuario_id == Follows.following_id).filter(Follows.follower_id == usuario_id).all()
    lista = [{'username':follow.username} for follow in following]
    return jsonify(lista),200
    