from flask import Blueprint, request, jsonify
from app.models import Likes
from .. import db
from ..drive_api_connect import *

like_bp = Blueprint('like', __name__)


@like_bp.route('/like', methods=['POST', 'DELETE'])
def manage_like():
    data = request.get_json()
    usuario_id = data.get('usuario_id')
    documento_id = data.get('documento_id')
    if not usuario_id or not documento_id:
        return jsonify({'error':'Missing usuario_id or documento_id'}), 400
    itemFound = Likes.query.filter_by(usuario_id=usuario_id, documento_id=documento_id).first()
    if request.method == 'POST':
        if itemFound:
            return jsonify({'message':'Like already exists'}), 400
        new_like = Likes(usuario_id=usuario_id, documento_id=documento_id)
        db.session.add(new_like)
        db.session.commit()
        return jsonify({'message':'Like added successfully'}), 200
    elif request.method == 'DELETE':
        if not itemFound:
            return jsonify({'error':'Like not found'}), 404
        db.session.delete(itemFound)
        db.session.commit()
        return jsonify({'message':'Like deleted successfully'}), 200


@like_bp.route('/likes/find/<int:userId>/<int:documentId>', methods=['GET'])
def find_like(userId, documentId):
    answer = False
    like = Likes.query.filter(Likes.documento_id == documentId, Likes.usuario_id == userId).first()
    if like:
        answer = True
    return jsonify({'answer': answer}), 200


@like_bp.route('/likes/<documento_id>', methods=['GET'])
def get_likes(documento_id):
    count = Likes.query.filter_by(documento_id=documento_id).count()
    return jsonify({'likes': count}), 200

