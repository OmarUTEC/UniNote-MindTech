from flask import Blueprint, request, jsonify, send_file
from app.models import Usuarios, Documentos, Likes
from .. import db
from ..drive_api_connect import *
import datetime
import os
from io import BytesIO
import tempfile
from flask import render_template
from sqlalchemy import func,text
from sqlalchemy import or_
from sqlalchemy.sql import text
import nltk
import json
import base64
from sqlalchemy.orm import sessionmaker


document_bp = Blueprint('document', __name__)
nltk.download('stopwords')


def serializacion_qanswer(query_result):
    serialized_resultados = []
    for each_item in query_result:
        serialized_resultados.append(
            {
                'documento_id': each_item[0],
                'titulo': each_item[1],
                'descripcion': each_item[2],
                'file_id': each_item[3],
                'curso':each_item[4],
                'ciclo':each_item[5],
                'preview_image': base64.b64encode(each_item[6]).decode('utf-8') if each_item[6] else None,
                'usuario_id': each_item[7],
                'carrera_id': each_item[8],
                'fecha_creacion': each_item[9]
            })
    return serialized_resultados


def buscar_documentos(palabra_clave):
    Session = sessionmaker(bind=db.engine)
    session = Session()
    query = session.query(
        Documentos.documento_id,
        Documentos.titulo,
        Documentos.descripcion,
        Documentos.file_id,
        Documentos.curso,
        Documentos.ciclo,
        Documentos.preview_image,
        Documentos.usuario_id,
        Documentos.carrera_id,
        Documentos.fecha_creacion,
        func.ts_rank_cd(Documentos.tsvector, func.to_tsquery('spanish', palabra_clave)).label('rank')
    ).filter(
        Documentos.tsvector.op('@@')(func.to_tsquery('spanish', palabra_clave))
    ).order_by(
        text('rank DESC')
    )

    resultados = query.all()
    session.close()
    return resultados

@document_bp.route('/search_document', methods=['GET', 'POST'])
def search_document():
    search_request = request.form.get('key_words')
    # Filtro de stopwords
    stopwords = set(nltk.corpus.stopwords.words('spanish')) 
    palabras_filtradas = []
    for palabra in search_request.split():
        if palabra not in stopwords and (len(palabra) > 1):
            palabras_filtradas.append(palabra)
    search_request = " | ".join(palabras_filtradas)
    
    #Busqueda
    resultados = buscar_documentos(search_request)
    document_list = serializacion_qanswer(resultados)
    return jsonify({
        'message': f'Se han encontrado {len(resultados)} resultados para tu busqueda',
        'resultados': document_list
    }), 200

@document_bp.route('/upload_file', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        # Recepción de parámetros del formulario front-end
        userId = request.form.get('userId')
        titulo = request.form.get('titulo')
        carrera = request.form.get('carrera')
        curso = request.form.get('curso')
        ciclo = request.form.get('ciclo')
        descripcion = request.form.get('descripcion')
        if 'file' not in request.files:
            return jsonify({'error': 'No agregaste ningún archivo'}), 400
        
        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'Archivo no seleccionado'}), 401

        filename = file.filename
        file.save(filename)

        with open(filename, 'rb') as f:
            # Lectura del archivo y cálculo del hash
            contenido_archivo = f.read()
            hash_sha256 = hashlib.sha256(contenido_archivo).hexdigest()
            # Verificación de existencia de documento similar
            documentos = Documentos.query.with_entities((Documentos.file_id)).filter(or_(Documentos.titulo == titulo, Documentos.hash_doc == hash_sha256)).all()
            if documentos:
                return jsonify({'error': 'Ya se subió un archivo con el mismo nombre o existe otro similar. Elige otro mejor.'}), 402
        print("Hash:  ",hash_sha256)
        #Extraccion de contenido del pdf
        text_from_file = ""
        doc = fitz.open("pdf", contenido_archivo)
        for page_num in range(len(doc)):
            page = doc.load_page(page_num)
            text_from_file += page.get_text()
            if len(text_from_file.split()) >= 300:break

        #Eliminacion de stopwords:
        stopwords = set(nltk.corpus.stopwords.words('spanish')) 
        palabras_filtradas = []
        for palabra in text_from_file.split():
            if palabra not in stopwords and (len(palabra) > 1):
                palabras_filtradas.append(palabra)
        text_from_file = " ".join(palabras_filtradas)


        # Generar imagen previa del archivo sin guardarlo en disco
        _pixmap = doc.load_page(0).get_pixmap()
        doc.close()
        buffered = BytesIO()
        image = Image.frombytes("RGB", [_pixmap.width, _pixmap.height], _pixmap.samples)
        image.resize((600,300))
        image.crop((10, 10, 580, 280)).save(buffered, format="JPEG")
        preview_image = buffered.getvalue()
        

        
        #return jsonify({'message': 'Archivo subido exitosamente!', 'drive_message': "Gaaaaaaaaaa!"}), 201
        #Inicializacion de nueva transaccion en la base de datos
        file_id = upload_file_basic("13q3dIpl95zRzZnS4gpoQf3bCHADA_nAm", file.filename)
        fecha_actual = datetime.datetime.utcnow()
        new_file = Documentos(
            titulo = titulo,
            descripcion = descripcion,
            curso = curso,
            ciclo = ciclo,      
            file_id = file_id,
            preview_image = preview_image,
            usuario_id = userId,
            text_content_detected = text_from_file,
            carrera_id = int(carrera),
            fecha_creacion = fecha_actual.strftime("%Y-%m-%d %H:%M:%S"),
            hash_doc = hash_sha256
        )
        
        db.session.add(new_file)
        db.session.commit()
        os.remove(file.filename)
        return jsonify({'message': 'Archivo subido exitosamente!', 'drive_message': "Gaaaaaaaaaa!"}), 200
    else:
        return render_template('from.html')


@document_bp.route('/documents', methods=['GET'])
def get_documents():
    documents = Documentos.query.with_entities(Documentos.documento_id,Documentos.titulo,Documentos.descripcion,Documentos.file_id,
                                            Documentos.curso,Documentos.ciclo,Documentos.preview_image,Documentos.usuario_id,Documentos.carrera_id,Documentos.fecha_creacion
                                    ).all()
    documents_list = serializacion_qanswer(documents)
    return jsonify(documents_list), 200

@document_bp.route('/documents/user/<int:id>', methods=['GET'])
def get_documents_by_user(id):
    documents = Documentos.query.with_entities(Documentos.documento_id,Documentos.titulo,Documentos.descripcion,Documentos.file_id,
                                            Documentos.curso,Documentos.ciclo,Documentos.preview_image,Documentos.usuario_id,Documentos.carrera_id,Documentos.fecha_creacion
                                    ).filter_by(usuario_id=id).all()
    documents_list = serializacion_qanswer(documents)
    return jsonify(documents_list), 200


@document_bp.route('/library/<int:userId>', methods=['GET'])
def get_documents_by_library(userId):
    documents = Documentos.query.with_entities(Documentos.documento_id,Documentos.titulo,Documentos.descripcion,Documentos.file_id,
                                            Documentos.curso,Documentos.ciclo,Documentos.preview_image,Documentos.usuario_id,Documentos.carrera_id,Documentos.fecha_creacion
                                    ).filter(Documentos.usuario_id != userId).all()
    documents_list = serializacion_qanswer(documents)
    return jsonify(documents_list), 200


@document_bp.route('/library/<int:userId>/career/<int:careerId>', methods=['GET'])
def get_documents_by_career(userId, careerId):
    documents = Documentos.query.with_entities(Documentos.documento_id,Documentos.titulo,Documentos.descripcion,Documentos.file_id,
                                            Documentos.curso,Documentos.ciclo,Documentos.preview_image,Documentos.usuario_id,Documentos.carrera_id,Documentos.fecha_creacion
                                    ).filter(Documentos.usuario_id != userId, Documentos.carrera_id == careerId).all()
    documents_list = serializacion_qanswer(documents)
    return jsonify(documents_list), 200


@document_bp.route('/documents/<id>', methods=['GET','DELETE','PUT'])
def route_documents(id):
    documento = Documentos.query.with_entities(Documentos.documento_id,Documentos.titulo,Documentos.descripcion,Documentos.file_id,
                                                Documentos.curso,Documentos.ciclo,Documentos.preview_image,Documentos.usuario_id,Documentos.carrera_id,Documentos.fecha_creacion
                                                ).filter(Documentos.documento_id == id).first()
    if request.method =='DELETE':
        if not documento:
            return jsonify({"Error":"Document not found"}), 404
        delete_files(documento[3]) #documento[3] es el file_id

        db.session.delete(documento)
        db.session.commit()
        return jsonify({'message': 'Document deleted successfully'}), 200
    elif request.method == 'GET':
        doc = serializacion_qanswer([documento])[0]
        return jsonify(doc), 200
    elif request.method == 'PUT':
        print("Method PUT is not available yet")
        return jsonify({'message': 'We cannot update it'}), 200


@document_bp.route('/download/<id>',methods=['GET'])
def download_doc(id):
    documento = Documentos.query.with_entities(Documentos.titulo,Documentos.file_id).filter(Documentos.documento_id == id).first()
    if not documento:
        return jsonify({'error': 'Document not found'}), 404
    file_id = documento[1] #documento[1] es el file_id
    temp_file = tempfile.NamedTemporaryFile(delete=False)
    temp_file.close()  
    download_file(file_id, temp_file.name)
    return send_file(temp_file.name, as_attachment=True, download_name=f"{documento[0]}.pdf") #documento[0] es el titulo


@document_bp.route('/document/general-search', methods=['GET'])
def get_user_documents():
    try:
        resultados = db.session.query(Usuarios.username,Documentos.documento_id,Documentos.titulo,Documentos.descripcion,Documentos.file_id,
                                      Documentos.curso,Documentos.ciclo,Documentos.preview_image,Documentos.usuario_id,Documentos.carrera_id,Documentos.fecha_creacion
                                    ).select_from(Documentos).join(Usuarios,Usuarios.usuario_id == Documentos.usuario_id).all()
        
        user_documents = []
        for each_item in resultados:
            user_documents.append({
                'documento_id': each_item[1],
                'titulo': each_item[2],
                'descripcion': each_item[3],
                'file_id': each_item[4],
                'curso':each_item[5],
                'ciclo':each_item[6],
                'preview_image': base64.b64encode(each_item[7]).decode('utf-8') if each_item[7] else None,
                'usuario_id': each_item[8],
                'username': each_item[0],
                'carrera_id': each_item[9],
                'fecha_creacion': each_item[10]
            })
        return jsonify(user_documents), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@document_bp.route('/search/documents', methods=['GET'])
def search_documents():
    try:
        documents = Documentos.query.with_entities(Documentos.documento_id,Documentos.titulo,Documentos.descripcion,Documentos.file_id,
                                            Documentos.curso,Documentos.ciclo,Documentos.preview_image,Documentos.usuario_id,Documentos.carrera_id,Documentos.fecha_creacion
                                    ).order_by(Documentos.fecha_creacion.desc()).all()
        sorted_documents = serializacion_qanswer(documents)
        return jsonify(sorted_documents), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@document_bp.route('/search/most_liked', methods=['GET'])
def search_documents_by_likes():
    try:
        documents = db.session.query(Documentos.documento_id,Documentos.titulo,Documentos.descripcion,Documentos.file_id,
                                      Documentos.curso,Documentos.ciclo,Documentos.preview_image,Documentos.usuario_id,Documentos.carrera_id,Documentos.fecha_creacion
                                    ,func.count(Likes.documento_id).label('like_count')).outerjoin(Likes, Documentos.documento_id == Likes.documento_id)\
        .group_by(Documentos.documento_id)\
        .order_by(func.count(Likes.documento_id).desc(), Documentos.fecha_creacion.desc()).all()

        sorted_documents = serializacion_qanswer(documents)
        return jsonify(sorted_documents), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
