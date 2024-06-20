from flask import Blueprint, request, jsonify
from app.models import Favoritos
from .. import db
from ..drive_api_connect import *

favourite_bp = Blueprint('favourite', __name__)

@favourite_bp.route('/favourite', methods=['POST', 'DELETE'])
def manage_favourite():
    data = request.get_json()
    usuario_id = data.get('usuario_id')
    documento_id = data.get('documento_id')
    if not usuario_id or not documento_id:
        return jsonify({'error':'Missing usuario_id or documento_id'}), 400
    itemFound = Favoritos.query.filter_by(usuario_id=usuario_id, documento_id=documento_id).first()
    if request.method == 'POST':
        if itemFound:
            return jsonify({'message':'Favorite already exists'}), 400
        new_favorite = Favoritos(usuario_id=usuario_id, documento_id=documento_id)
        db.session.add(new_favorite)
        db.session.commit()
        return jsonify({'message':'Favorite added successfully'}), 200
    elif request.method == 'DELETE':
        if not itemFound:
            return jsonify({'error':'Favorite not found'}), 404
        db.session.delete(itemFound)
        db.session.commit()
        return jsonify({'message':'Favorite deleted successfully'}), 200

@favourite_bp.route('/favourite/find/<int:userId>/<int:documentId>', methods=['GET'])
def find_favourite(userId, documentId):
    answer = False
    favourite = Favoritos.query.filter(Favoritos.documento_id == documentId, Favoritos.usuario_id == userId).first()
    if favourite:
        answer = True
    return jsonify({'answer': answer}), 200

@favourite_bp.route('/favourite/<int:documentId>', methods=['GET'])
def count_favourite(documentId):
    count = Favoritos.query.filter_by(documento_id=documentId).count()
    return jsonify({'answer': count}), 200
