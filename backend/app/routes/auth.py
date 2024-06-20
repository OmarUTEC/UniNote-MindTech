from flask import Blueprint, request, session, jsonify, redirect, url_for, abort

from app.models import Usuarios
from .. import db
from ..google_oauth import get_google_oauth_flow
from config import Config
from ..drive_api_connect import *
import requests
from pip._vendor import cachecontrol
import google.auth.transport.requests
import os
from google.oauth2 import id_token

UPLOAD_FOLDER = '/temp/folder'

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

auth_bp = Blueprint('auth', __name__)

def login_is_required(function):
    def wrapper(*args, **kwargs):
        if "google_id" not in session:
            return abort(401)
        else:
            return function(*args, **kwargs)
    wrapper.__name__ = function.__name__
    return wrapper


@auth_bp.route("/login-google")
def login():
    flow = get_google_oauth_flow()
    authorization_url, state = flow.authorization_url()
    session["state"] = state
    return redirect(authorization_url)


@auth_bp.route("/callback")
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
                foto_perfil_url=id_info.get("picture"),
                nombres=id_info.get("given_name"),
                apellidos=id_info.get("family_name")
            )
            db.session.add(user)
        db.session.commit()
        session["google_id"] = id_info.get("sub")
        session["name"] = id_info.get("name")
        data = user.get_usuario_id()
        
        return f"""
        <script>
            window.opener.postMessage({data}, "http://localhost:3000");
            window.close();
        </script>
        """
    except Exception as e:
        print(f"Error en el callback: {e}")
        abort(500, description=f"Error interno del servidor: {str(e)}")



@auth_bp.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("main.index"))


@auth_bp.route("/")
def index():
    return "Hello World <a href='/login-google'><button>Login</button></a>"


@auth_bp.route("/protected_area")
@login_is_required
def protected_area():
    return f"Hello {session.get('name')}! <a href='/logout'><button>Logout</button></a>"


@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')
    nombres = data.get('nombres')
    apellidos = data.get('apellidos')
    carrera = data.get('carrera')
    ciclo = data.get('ciclo')

    if Usuarios.query.filter_by(username=username).first():
        return jsonify({'message': 'Username already exists'}), 402
    elif Usuarios.query.filter_by(email=email).first():
        return jsonify({'message':'Email already exists'}),401
    
    new_user = Usuarios(
        username=username, 
        email=email,
        nombres=nombres,
        apellidos=apellidos,
        carrera=carrera,
        ciclo=ciclo
    )
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User created successfully'}), 200


@auth_bp.route('/login', methods=['POST'])
def login_simple():
    data = request.get_json()
    if not data or not 'username' in data or not 'password' in data:
        return jsonify({'error': 'Missing username or password'}), 400
    user = Usuarios.query.filter_by(username=data['username']).first()
    if user and user.check_password(data['password']):
        data = user.get_usuario_id()
        return jsonify(data), 200
    return jsonify({'message': 'Invalid username or password'}), 401

