from flask import Blueprint, request, jsonify
from app.models import Usuarios, Follows
from .. import db
from ..drive_api_connect import *

follower_bp = Blueprint('follower', __name__)


@follower_bp.route('/follow', methods=['POST'])
def follows():
    data = request.get_json()
    follower = data['follower_id']
    following = data['following_id']
    new_follows = Follows(follower_id=follower, following_id = following)
    db.session.add(new_follows)
    db.session.commit()
    return jsonify({'message': 'Success'}), 200


@follower_bp.route('/followers/<usuario_id>', methods=['GET','DELETE'])
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


@follower_bp.route('/following/<usuario_id>', methods=['GET','DELETE'])
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

@follower_bp.route('/follow/find/<int:userId>/<int:authorId>', methods=['GET'])
def find_like(userId, authorId):
    answer = False
    like = Follows.query.filter(Follows.follower_id == userId, Follows.following_id == authorId).first()
    if like:
        answer = True
    return jsonify({'answer': answer}), 200