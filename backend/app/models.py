from app import db
from werkzeug.security import generate_password_hash, check_password_hash
import base64
class Usuarios(db.Model):
    __tablename__ = 'usuarios'
    usuario_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), unique=True, nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    foto_perfil_url = db.Column(db.String(255))
    password_hash = db.Column(db.String(255))
    nombres = db.Column(db.String(255))
    apellidos = db.Column(db.String(255))
    carrera = db.Column(db.String(255))
    ciclo = db.Column(db.String(50))

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def get_usuario_id(self):
        return {'usuario_id': self.usuario_id}

    documentos = db.relationship('Documentos', backref='autor', lazy=True)
    comentarios = db.relationship('Comentarios', backref='usuario', lazy=True)

    def __repr__(self):
        return f'<Usuario {self.username}>'
    
class Carreras(db.Model):
    __tablename__ = 'carreras'
    carrera_id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(255), nullable=False)

    documentos = db.relationship('Documentos', backref='carrera', lazy=True)

class Documentos(db.Model):
    __tablename__ = 'documentos'
    documento_id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(255), nullable=False)
    descripcion = db.Column(db.Text)
    file_id = db.Column(db.String(40), nullable=False)
    preview_image = db.Column(db.LargeBinary)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuarios.usuario_id'), nullable=False)
    carrera_id = db.Column(db.Integer, db.ForeignKey('carreras.carrera_id'), nullable=False)
    fecha_creacion = db.Column(db.DateTime, server_default=db.func.now())

    favoritos = db.relationship('Favoritos', backref='documento', lazy=True)
    likes = db.relationship('Likes', backref='documento', lazy=True)
    foros = db.relationship('Foros', backref='documento', lazy=True)
    def to_dict(self):
        return {
            'id': self.usuario_id,
            'titulo': self.titulo,
            'descripcion': self.descripcion,
            'file_id': self.file_id,
            'preview_image': base64.b64encode(self.preview_image).decode('utf-8') if self.preview_image else None,
            'usuario_id': self.usuario_id,
            'carrera_id': self.carrera_id,
            'fecha_creacion': self.fecha_creacion.strftime('%Y-%m-%d %H:%M:%S')
        }
class Favoritos(db.Model):
    __tablename__ = 'favoritos'
    favorito_id = db.Column(db.Integer, primary_key=True)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuarios.usuario_id'), nullable=False)
    documento_id = db.Column(db.Integer, db.ForeignKey('documentos.documento_id'), nullable=False)

class Likes(db.Model):
    __tablename__ = 'likes'
    like_id = db.Column(db.Integer, primary_key=True)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuarios.usuario_id'), nullable=False)
    documento_id = db.Column(db.Integer, db.ForeignKey('documentos.documento_id'), nullable=False)

class Foros(db.Model):
    __tablename__ = 'foros'
    foro_id = db.Column(db.Integer, primary_key=True)
    documento_id = db.Column(db.Integer, db.ForeignKey('documentos.documento_id'), nullable=False)
    comentarios = db.relationship('Comentarios', backref='foro', lazy=True)

class Comentarios(db.Model):
    __tablename__ = 'comentarios'
    comentario_id = db.Column(db.Integer, primary_key=True)
    foro_id = db.Column(db.Integer, db.ForeignKey('foros.foro_id'), nullable=False)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuarios.usuario_id'), nullable=False)
    contenido = db.Column(db.Text, nullable=False)
    fecha_creacion = db.Column(db.DateTime, server_default=db.func.now())

class Follows(db.Model):
    __tablename__ = 'follows'
    id = db.Column(db.Integer, primary_key=True)
    follower_id = db.Column(db.Integer, db.ForeignKey('usuarios.usuario_id'), nullable=False)
    following_id = db.Column(db.Integer, db.ForeignKey('usuarios.usuario_id'), nullable=False)
