from flask import Blueprint, request, jsonify

from app.models import Usuarios, Carreras
from .. import db
from ..drive_api_connect import *
import os
from sqlalchemy import and_

UPLOAD_FOLDER = '/temp/folder'

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

user_bp = Blueprint('user', __name__)


@user_bp.route('/usuarios', methods=['GET'])
def get_users():
    all_users = Usuarios.query.all()
    lista_users = [{'usuario_id':users.usuario_id,'username': users.username, 'email': users.email} for users in all_users]
    return jsonify(lista_users), 200


@user_bp.route('/usuarios/<int:usuario_id>', methods=['GET','PUT','DELETE'])
def route_user_id(usuario_id):
    if request.method == 'GET':
        user = Usuarios.query.filter_by(usuario_id=usuario_id).first()
        if user:
            if user.carrera == " ":
                return jsonify({
                'name': user.nombres,
                'surname': user.apellidos,
                'career': " ",
                'idCareer': " ",
                'cycle': user.ciclo,
                'username': user.username,
                'email': user.email
            }), 200
            career = Carreras.query.filter_by(carrera_id=user.carrera).first()
            return jsonify({
                'name': user.nombres,
                'surname': user.apellidos,
                'career': career.nombre,
                'idCareer': user.carrera,
                'cycle': user.ciclo,
                'username': user.username,
                'email': user.email
            }), 200
        return jsonify({'message': 'User not found'}), 404
    elif request.method == 'PUT':
        user = Usuarios.query.filter_by(usuario_id=usuario_id).first()
        if user:
            data = request.get_json()
            if 'username' in data:
                existing_user = Usuarios.query.filter(
                    and_(
                        Usuarios.username == data['username'],
                        Usuarios.usuario_id != usuario_id
                    )
                ).first()
                if existing_user:
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


@user_bp.route('/carreras', methods=['GET'])
def get_carreras():
    todas_carreras = Carreras.query.all()
    lista_carreras = [{'careerId': carrera.carrera_id, 'careerName': carrera.nombre} for carrera in todas_carreras]
    return jsonify(lista_carreras), 200

