from flask import Blueprint, request, jsonify
from app import db
from app.models import Usuarios, Carreras, Documentos, Follows

main = Blueprint('main', __name__)

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
def login():
    data = request.get_json()
    user = Usuarios.query.filter_by(username=data['username']).first()
    if user and user.check_password(data['password']):
        return jsonify({'message': 'Logged in successfully'}), 200
    return jsonify({'message': 'Invalid username or password'}), 400

@main.route('/usuarios/<usuario_id>', methods=['GET'])
def get_user(usuario_id):
    user = Usuarios.query.filter_by(usuario_id=usuario_id).first()
    if user:
        return jsonify({
            'username': user.username,
            'email': user.email
        }), 200
    return jsonify({'message': 'User not found'}), 404

@main.route('/usuarios/<usuario_id>', methods=['PUT'])
def update_user(usuario_id):
    user = Usuarios.query.filter_by(usuario_id=usuario_id).first()
    if user:
        data = request.get_json()
        if 'username' in data:
            user.username = data['username']
        db.session.commit()
        return jsonify({'message': 'User updated successfully'}), 200
    return jsonify({'message': 'User not found'}), 404

@main.route('/usuarios/<usuario_id>', methods=['DELETE'])
def delete_user(usuario_id):
    user = Usuarios.query.filter_by(usuario_id=usuario_id).first()
    if user:
        db.session.delete(user)
        db.session.commit()
        return jsonify({'message': 'User deleted successfully'}), 200
    return jsonify({'message': 'User not found'}), 404

@main.route('/usuarios', methods=['GET'])
def get_users():
    users = Usuarios.query.all()
    users_list = [{
        'username': user.username,
        'email': user.email
    } for user in users]
    
    return jsonify(users_list), 200

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
    