from flask import Blueprint, request, jsonify, send_file
from app.models import Usuarios, Documentos, Likes
from .. import db
from ..drive_api_connect import *
import datetime
import os
from io import BytesIO
import tempfile
from flask import render_template
from sqlalchemy import func

document_bp = Blueprint('document', __name__)


@document_bp.route('/upload_file', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        #Recepcion de parametros de formulacion front-end
        userId = request.form.get('userId')
        titulo = request.form.get('titulo')
        carrera = request.form.get('carrera')
        curso = request.form.get('curso')
        ciclo = request.form.get('ciclo')
        descripcion = request.form.get('descripcion')
        file = request.files['file']


        #Busqueda de archivos con el mismo nombre
        documentos = Documentos.query.filter_by(titulo=str(titulo)).all()
        resultado = [documento.to_dict() for documento in documentos]

        print("Resultado", resultado, "for ", titulo)
        #Catch de errores en el formulario
        if 'file' not in request.files:
            return jsonify({'error': 'No file agregaste ningun archivo'}), 400
        if file.filename == '':
            return jsonify({'error': 'Archivo no seleccionado'}), 400
        if resultado:
            return jsonify({'error': 'Ya se subio un archivo con el mismo nombre, elige otro mejor'}), 400
                
        #Guardado de archivo temporal
        file_path = os.path.join("", file.filename)
        file.save(file_path)

        file_id = upload_file_basic("1E8cQZY3fUnBg2d7wpIl0F1Q98bwGTWJq", file.filename)
        fecha_actual = datetime.datetime.utcnow()

        #Obtencion de pre-imagen con la libreria Fitz
        doc = fitz.open(file.filename)
        _pixmap = doc.load_page(0).get_pixmap()
        doc.close()
        Image.frombytes("RGB", [_pixmap.width, _pixmap.height], _pixmap.samples).crop((10, 10, 580, 280)).save(BytesIO(), format="JPEG")

        #Inicializacion de nueva transaccion en la base de datos
        new_file = Documentos(
            titulo = titulo,
            descripcion = descripcion,
            curso = curso,
            ciclo = ciclo,
            file_id = file_id,
            preview_image = BytesIO().getvalue(),
            usuario_id = userId,
            carrera_id = int(carrera),
            fecha_creacion = fecha_actual.strftime("%Y-%m-%d %H:%M:%S")
        )
        db.session.add(new_file)
        db.session.commit()
        os.remove(file_path)
        return jsonify({'message': 'Archivo subido exitosamente!', 'drive_message': "Gaaaaaaaaaa!"}), 200
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


@document_bp.route('/document/general-search', methods=['GET'])
def get_user_documents():
    try:
        results = db.session.query(Usuarios.username, Documentos).join(Documentos, Usuarios.usuario_id == Documentos.usuario_id).all()
        user_documents = []
        for username, doc in results:
            data = doc.to_dict()
            data['username'] = username
            user_documents.append(data)
        return jsonify(user_documents)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@document_bp.route('/search/documents', methods=['GET'])
def search_documents():
    try:
        query = Documentos.query
        documents = query.order_by(Documentos.fecha_creacion.desc()).all()
        sorted_documents = [doc.to_dict() for doc in documents]
        return jsonify(sorted_documents), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@document_bp.route('/search/most_liked', methods=['GET'])
def search_documents_by_likes():
    try:
        documents = db.session.query(
            Documentos,
            func.count(Likes.documento_id).label('like_count')
        ).outerjoin(Likes, Documentos.documento_id == Likes.documento_id)\
        .group_by(Documentos.documento_id)\
        .order_by(func.count(Likes.documento_id).desc(), Documentos.fecha_creacion.desc()).all()

        sorted_documents = [doc.to_dict() for doc in documents]
        return jsonify(sorted_documents), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500