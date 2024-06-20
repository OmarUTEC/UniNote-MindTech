from flask import Blueprint, request, jsonify, send_file
from app.models import Documentos
from .. import db
from ..drive_api_connect import *
import datetime
import os
from io import BytesIO
import tempfile
from flask import render_template

document_bp = Blueprint('document', __name__)


@document_bp.route('/upload_file', methods=['GET', 'POST'])
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
            curso = curso,
            ciclo = ciclo,
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


@document_bp.route('/documents', methods=['GET'])
def get_documents():
    documents = Documentos.query.all()
    documents_list = [doc.to_dict() for doc in documents]
    return jsonify(documents_list), 200


@document_bp.route('/documents/user/<int:id>', methods=['GET'])
def get_documents_by_user(id):
    documents = Documentos.query.filter_by(usuario_id=id).all()
    documents_list = [doc.to_dict() for doc in documents]
    return jsonify(documents_list), 200


@document_bp.route('/library/<int:userId>', methods=['GET'])
def get_documents_by_library(userId):
    documents = Documentos.query.filter(Documentos.usuario_id != userId).all()
    documents_list = [doc.to_dict() for doc in documents]
    return jsonify(documents_list), 200


@document_bp.route('/library/<int:userId>/career/<int:careerId>', methods=['GET'])
def get_documents_by_career(userId, careerId):
    documents = Documentos.query.filter(Documentos.usuario_id != userId, Documentos.carrera_id == careerId).all()
    documents_list = [doc.to_dict() for doc in documents]
    return jsonify(documents_list), 200


@document_bp.route('/documents/<id>', methods=['GET','DELETE','PUT'])
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


@document_bp.route('/download/<id>',methods=['GET'])
def download_doc(id):
    document = Documentos.query.get(id)
    if not document:
        return jsonify({'error': 'Document not found'}), 404
    file_id = document.file_id
    temp_file = tempfile.NamedTemporaryFile(delete=False)
    temp_file.close()  
    download_file(file_id, temp_file.name)
    return send_file(temp_file.name, as_attachment=True, download_name=f"{document.titulo}.pdf")

