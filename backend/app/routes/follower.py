from flask import Blueprint, request, jsonify
from app.models import Usuarios, Carreras, Follows
from .. import db

follower_bp = Blueprint('follower', __name__)

@follower_bp.route('/follow', methods=['POST'])
def follow():
    data = request.get_json()
    follower_id = data['follower_id']
    following_id = data['following_id']
    
    if not follower_id or not following_id:
        return jsonify({'message': 'Follower ID and Following ID are required'}), 400

    new_follow = Follows(follower_id=follower_id, following_id=following_id)
    db.session.add(new_follow)
    db.session.commit()
    return jsonify({'message': 'Follow created successfully', 'follower_id': follower_id, 'following_id': following_id}), 201

@follower_bp.route('/followers/<int:usuario_id>', methods=['GET'])
def get_followers(usuario_id):
    usuario = Usuarios.query.get(usuario_id)
    if not usuario:
        return jsonify({'message': 'Usuario no encontrado'}), 404
    
    seguidores = db.session.query(Usuarios, Carreras).join(Follows, Usuarios.usuario_id == Follows.follower_id).join(Carreras, Usuarios.carrera == db.cast(Carreras.carrera_id, db.String)).filter(Follows.following_id == usuario_id).all()
    lista_seguidores = [{'id': seguidor.Usuarios.usuario_id, 'username': seguidor.Usuarios.username, 'career': seguidor.Carreras.nombre} for seguidor in seguidores]
    return jsonify(lista_seguidores), 200

@follower_bp.route('/unfollow', methods=['POST'])
def unfollow():
    data = request.get_json()
    follower_id = data['follower_id']
    following_id = data['following_id']
    
    follow = Follows.query.filter_by(follower_id=follower_id, following_id=following_id).first()
    if follow:
        db.session.delete(follow)
        db.session.commit()
        return jsonify({'message': 'Unfollowed successfully'}), 200
    return jsonify({'message': 'Follow relationship not found'}), 404

@follower_bp.route('/following/<int:usuario_id>', methods=['GET'])
def get_following(usuario_id):
    usuario = Usuarios.query.get(usuario_id)
    if not usuario:
        return jsonify({'message': 'User not found'}), 404
    
    following = db.session.query(Usuarios, Carreras).join(Follows, Usuarios.usuario_id == Follows.following_id).join(Carreras, Usuarios.carrera == db.cast(Carreras.carrera_id, db.String)).filter(Follows.follower_id == usuario_id).all()
    lista = [{'id': follow.Usuarios.usuario_id, 'username': follow.Usuarios.username, 'career': follow.Carreras.nombre} for follow in following]
    return jsonify(lista), 200

@follower_bp.route('/followers_count/<int:usuario_id>', methods=['GET'])
def get_followers_count(usuario_id):
    count = db.session.query(Follows).filter(Follows.following_id == usuario_id).count()
    return jsonify({'count': count}), 200

@follower_bp.route('/following_count/<int:usuario_id>', methods=['GET'])
def get_following_count(usuario_id):
    count = db.session.query(Follows).filter(Follows.follower_id == usuario_id).count()
    return jsonify({'count': count}), 200

@follower_bp.route('/follow/find/<int:userId>/<int:authorId>', methods=['GET'])
def find_follow(userId, authorId):
    answer = False
    like = Follows.query.filter(Follows.follower_id == userId, Follows.following_id == authorId).first()
    if like:
        answer = True
    return jsonify({'answer': answer}), 200
