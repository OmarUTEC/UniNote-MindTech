from flask import Blueprint, request, session, jsonify, redirect, url_for, abort, send_file
from app.models import Usuarios, Carreras, Documentos, Follows, Favoritos, Likes
from . import db
from .google_oauth import get_google_oauth_flow
from config import Config
from .drive_api_connect import *
import datetime
import requests
from pip._vendor import cachecontrol
import google.auth.transport.requests
import os
from google.oauth2 import id_token
from io import BytesIO
import tempfile
from flask import render_template

UPLOAD_FOLDER = '/temp/folder'

"""
if Linux :
    bash : sudo chmod 777 /temp/folder
else :
    continue
"""

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

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
                foto_perfil_url=id_info.get("picture"),
                nombres=id_info.get("given_name"),
                apellidos=id_info.get("family_name")
            )
            db.session.add(user)
        db.session.commit()
        session["google_id"] = id_info.get("sub")
        session["name"] = id_info.get("name")
        return redirect(('http://localhost:3000/dashboard'))
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
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')
    nombres = data.get('nombres')
    apellidos = data.get('apellidos')
    carrera = data.get('carrera')
    ciclo = data.get('ciclo')
    if Usuarios.query.filter_by(username=username).first() or Usuarios.query.filter_by(email=email).first():
        return jsonify({'message': 'User already exists'}), 400
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


@main.route('/login', methods=['POST'])
def login_simple():
    data = request.get_json()
    if not data or not 'username' in data or not 'password' in data:
        return jsonify({'error': 'Missing username or password'}), 400
    user = Usuarios.query.filter_by(username=data['username']).first()
    if user and user.check_password(data['password']):
        data = user.get_usuario_id()
        return jsonify(data), 200
    return jsonify({'message': 'Invalid username or password'}), 401


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
                if Usuarios.query.filter_by(username=data['username']).first():
                    return jsonify({'message': 'Username already exists'}), 400
                user.username = data['username']
            if 'foto_perfil_url' in data:
                user.foto_perfil_url = data['foto_perfil_url']
            if 'nombres' in data:
                user.nombres = data['nombres']
            if 'apellidos' in data:
                user.apellidos = data['apellidos']
            if 'carrera' in data:
                user.carrera = data['carrera']
            if 'ciclo' in data:
                user.ciclo = data['ciclo']
            if 'email' in data:
                user.email = data['email']
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


@main.route('/followers/<usuario_id>', methods=['GET','DELETE'])
def route_followers(usuario_id):
    if request.method=='GET':
        usuario = Usuarios.query.get(usuario_id)
        if not usuario:
            return jsonify({'message': 'Usuario no encontrado'}), 404
        seguidores = db.session.query(Usuarios).join(Follows, Usuarios.usuario_id == Follows.follower_id).filter(Follows.following_id == usuario_id).all()    
        lista_seguidores = [{'username': seguidor.username} for seguidor in seguidores]
        return jsonify(lista_seguidores), 200    
    elif request.method =='DELETE':
        follower = Follows.query.filter_by(follower_id=usuario_id).first()
        if follower:
            db.session.delete(follower)
            db.session.commit()
            return jsonify({'message': 'Follower deleted successfully'}), 200
        return jsonify({'message': 'Follower not found'}), 404


@main.route('/following/<usuario_id>', methods=['GET','DELETE'])
def route_following(usuario_id):
    if request.method=='GET':
        usuario = Usuarios.query.get(usuario_id)
        if not usuario:
            return jsonify({'message': 'User not found'}),404
        following = db.session.query(Usuarios).join(Follows, Usuarios.usuario_id == Follows.following_id).filter(Follows.follower_id == usuario_id).all()
        lista = [{'username':follow.username} for follow in following]
        return jsonify(lista),200
    elif request.method=='DELETE':
        following = Follows.query.filter_by(following_id=usuario_id).first()
        if following:
            db.session.delete(following)
            db.session.commit()
            return jsonify({'message': 'Follower deleted successfully'}), 200
        return jsonify({'message': 'Follower not found'}), 404


@main.route('/follow', methods=['POST'])
def follows():
    data = request.get_json()
    follower = data['follower_id']
    following = data['following_id']
    
    new_follows = Follows(follower_id=follower, following_id = following)
    db.session.add(new_follows)
    db.session.commit()
    return jsonify({'message': 'Success'}), 200


@main.route('/upload_file', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        userId = request.form.get('userId')
        titulo = request.form.get('titulo')
        carrera = request.form.get('carrera')
        curso = request.form.get('curso')
        ciclo = request.form.get('ciclo')
        descripcion = request.form.get('descripcion')
        if 'file' not in request.files:
            return jsonify({'error': 'No file part'}), 400
        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 400
        file_path = os.path.join("", file.filename)
        file.save(file_path)
        file_id = upload_file_basic("1E8cQZY3fUnBg2d7wpIl0F1Q98bwGTWJq", file.filename)
        fecha_actual = datetime.datetime.utcnow()
        doc = fitz.open(file.filename)
        _pixmap = doc.load_page(0).get_pixmap()
        doc.close()    
        buffered = BytesIO()
        Image.frombytes("RGB", [_pixmap.width, _pixmap.height], _pixmap.samples).crop((10, 10, 580, 280)).save(buffered, format="JPEG")
        new_file = Documentos(
            titulo = titulo,
            descripcion = descripcion,
            file_id = file_id,
            preview_image = buffered.getvalue(),
            usuario_id = userId,
            carrera_id = int(carrera),
            fecha_creacion = fecha_actual.strftime("%Y-%m-%d %H:%M:%S")
        )
        db.session.add(new_file)
        db.session.commit()
        os.remove(file_path)
        return jsonify({'message': 'File uploaded successfully to Google Drive', 'drive_message': "Gaaaaaaaaaa!"}), 200
    else:
        return render_template('from.html')


@main.route('/documents', methods=['GET'])
def get_documents():
    documents = Documentos.query.all()
    documents_list = [doc.to_dict() for doc in documents]
    return jsonify(documents_list), 200


@main.route('/documents/user/<int:id>', methods=['GET'])
def get_documents_by_user(id):
    documents = Documentos.query.filter_by(usuario_id=id).all()
    documents_list = [doc.to_dict() for doc in documents]
    return jsonify(documents_list), 200


@main.route('/documents/<id>', methods=['GET','DELETE','PUT'])
def route_documents(id):
    if request.method =='DELETE':
        documento = Documentos.query.get(id)
        if not documento:
            return jsonify({"Error":"Document not found"}), 404
        delete_files(documento.file_id)
        db.session.delete(documento)
        db.session.commit()
        return jsonify({'message': 'Document deleted successfully'}), 200
    elif request.method == 'GET':
        documento = Documentos.query.get(id)
        doc = documento.to_dict()
        return jsonify(doc), 200
    elif request.method == 'PUT':
        documento = Documentos.query.get(id)
        if documento:
            data = request.get_json()
            if 'titulo' in data:
                documento.titulo = data['titulo']
            if 'descripcion' in data:
                documento.descripcion = data['descripcion']
            db.session.commit()
            return jsonify({'message': 'Document updated successfully'}), 200
        return jsonify({'Error': 'Document not found'}), 404


@main.route('/download/<id>',methods=['GET'])
def download_doc(id):
    document = Documentos.query.get(id)
    if not document:
        return jsonify({'error': 'Document not found'}), 404

    file_id = document.file_id
    temp_file = tempfile.NamedTemporaryFile(delete=False)
    temp_file.close()  

    download_file(file_id, temp_file.name)

    return send_file(temp_file.name, as_attachment=True, download_name=f"{document.titulo}.pdf")


@main.route('/favorite', methods=['POST','DELETE'])
def add_favorite():
    if request.method == 'POST':
        data = request.get_json()
        usuario_id = data.get('usuario_id')
        documento_id = data.get('documento_id')

        if not usuario_id or not documento_id:
            return jsonify({'error': 'Missing usuario_id or documento_id'}), 400

        existing_favorite = Favoritos.query.filter_by(usuario_id=usuario_id, documento_id=documento_id).first()
        if existing_favorite:
            return jsonify({'message': 'Favorite already exists'})

        new_favorite = Favoritos(usuario_id=usuario_id, documento_id=documento_id)
        db.session.add(new_favorite)
        db.session.commit()

        return jsonify({'message': 'Favorite added successfully'}), 200
    elif request.method == 'DELETE':
        data = request.get_json()
        usuario_id = data.get('usuario_id')
        documento_id = data.get('documento_id')

        if not usuario_id or not documento_id:
            return jsonify({'error': 'Missing usuario_id or documento_id'}), 400

        favorite = Favoritos.query.filter_by(usuario_id=usuario_id, documento_id=documento_id).first()
        if not favorite:
            return jsonify({'error': 'Favorite not found'}), 404

        db.session.delete(favorite)
        db.session.commit()

        return jsonify({'message': 'Favorite deleted successfully'}), 200


@main.route('/like', methods=['POST','DELETE'])
def add_like():
    if request.method == 'POST':
        data = request.get_json()
        usuario_id = data.get('usuario_id')
        documento_id = data.get('documento_id')

        if not usuario_id or not documento_id:
            return jsonify({'error': 'Missing usuario_id or documento_id'}), 400

        existing_like = Likes.query.filter_by(usuario_id=usuario_id, documento_id=documento_id).first()
        if existing_like:
            return jsonify({'message': 'Like already exists'})

        new_like = Likes(usuario_id=usuario_id, documento_id=documento_id)
        db.session.add(new_like)
        db.session.commit()

        return jsonify({'message': 'Like added successfully'}), 200
    elif request.method == 'DELETE':
        data = request.get_json()
        usuario_id = data.get('usuario_id')
        documento_id = data.get('documento_id')

        if not usuario_id or not documento_id:
            return jsonify({'error': 'Missing usuario_id or documento_id'}), 400

        like = Likes.query.filter_by(usuario_id=usuario_id, documento_id=documento_id).first()
        if not like:
            return jsonify({'error': 'Like not found'}), 404

        db.session.delete(like)
        db.session.commit()

        return jsonify({'message': 'Like deleted successfully'}), 200


@main.route('/favorites/<documento_id>', methods=['GET'])
def get_favorites(documento_id):
    count = Favoritos.query.filter_by(documento_id=documento_id).count()
    return jsonify({'favorites_count': count}), 200

@main.route('/likes/<documento_id>', methods=['GET'])
def get_likes(documento_id):
    count = Likes.query.filter_by(documento_id=documento_id).count()
    return jsonify({'likes': count}), 200