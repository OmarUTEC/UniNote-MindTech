CREATE TABLE usuarios (
    usuario_id SERIAL PRIMARY KEY,
    foto_perfil_url VARCHAR(255),
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) 
);

CREATE TABLE carreras (
    carrera_id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL
);

CREATE TABLE documentos (
    documento_id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT,
    archivo_url VARCHAR(255) NOT NULL,
    usuario_id INTEGER NOT NULL,
    carrera_id INTEGER NOT NULL,
    fecha_creacion TIMESTAMP WITHOUT TIME ZONE DEFAULT (now() AT TIME ZONE 'utc'),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(usuario_id) ON DELETE CASCADE,
    FOREIGN KEY (carrera_id) REFERENCES carreras(carrera_id)
);

CREATE TABLE favoritos (
    favorito_id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL,
    documento_id INTEGER NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(usuario_id) ON DELETE CASCADE,
    FOREIGN KEY (documento_id) REFERENCES documentos(documento_id) ON DELETE CASCADE
);

CREATE TABLE likes (
    like_id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL,
    documento_id INTEGER NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(usuario_id) ON DELETE CASCADE,
    FOREIGN KEY (documento_id) REFERENCES documentos(documento_id) ON DELETE CASCADE
);

CREATE TABLE foros (
    foro_id SERIAL PRIMARY KEY,
    documento_id INTEGER NOT NULL,
    FOREIGN KEY (documento_id) REFERENCES documentos(documento_id)
);

CREATE TABLE comentarios (
    comentario_id SERIAL PRIMARY KEY,
    foro_id INTEGER NOT NULL,
    usuario_id INTEGER NOT NULL,
    contenido TEXT NOT NULL,
    fecha_creacion TIMESTAMP WITHOUT TIME ZONE DEFAULT (now() AT TIME ZONE 'utc'),
    FOREIGN KEY (foro_id) REFERENCES foros(foro_id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(usuario_id) ON DELETE CASCADE
);

CREATE TABLE follows(
    id SERIAL PRIMARY KEY,
    follower_id INTEGER NOT NULL,
    following_id INTEGER NOT NULL,
    FOREIGN KEY (follower_id) REFERENCES usuarios(usuario_id) ON DELETE CASCADE,
    FOREIGN KEY (following_id) REFERENCES usuarios(usuario_id) ON DELETE CASCADE
);


INSERT INTO carreras(nombre) VALUES 
    ('Administración y Negocios Digitales'),
    ('Bioingeniería'),
    ('Ciencia de la Computación'),
    ('Ciencia de Datos'),
    ('Ingeniería Ambiental'),
    ('Ingeniería Civil'),
    ('Ingeniería de la Energía'),
    ('Ingeniería Electrónica'),
    ('Ingeniería Industrial'),
    ('Ingeniería Mecánica'),
    ('Ingeniería Mecatrónica'),
    ('Ingeniería Química');