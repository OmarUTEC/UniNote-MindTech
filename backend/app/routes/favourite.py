from flask import Blueprint, request, jsonify
from app.models import Favoritos
from .. import db
from ..drive_api_connect import *

favourite_bp = Blueprint('favourite', __name__)


@favourite_bp.route('/favourite', methods=['POST','DELETE'])
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

@favourite_bp.route('/favorites/<documento_id>', methods=['GET'])
def get_favorites(documento_id):
    count = Favoritos.query.filter_by(documento_id=documento_id).count()
    return jsonify({'favorites_count': count}), 200