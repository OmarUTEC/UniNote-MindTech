CREATE TABLE usuarios (
    usuario_id SERIAL PRIMARY KEY,
    foto_perfil_url VARCHAR(255),
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    nombres VARCHAR(255),
    apellidos VARCHAR(255),
    carrera VARCHAR(255),
    ciclo VARCHAR(50)
);

CREATE TABLE carreras (
    carrera_id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL
);

CREATE TABLE documentos (
    documento_id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT,
    curso VARCHAR(255),
    ciclo INTEGER,
    file_id VARCHAR(40) NOT NULL,
    preview_image BYTEA,
    usuario_id INTEGER NOT NULL,
    carrera_id INTEGER NOT NULL,
    hash_doc VARCHAR(64),
    tsvector tsvector,
    text_content_detected TEXT,
    
    fecha_creacion TIMESTAMP WITHOUT TIME ZONE DEFAULT (now() AT TIME ZONE 'utc'),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(usuario_id) ON DELETE CASCADE,
    FOREIGN KEY (carrera_id) REFERENCES carreras(carrera_id)
);


CREATE TABLE favoritos (
    usuario_id INTEGER,
    documento_id INTEGER,
    PRIMARY KEY (usuario_id,documento_id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(usuario_id) ON DELETE CASCADE,
    FOREIGN KEY (documento_id) REFERENCES documentos(documento_id) ON DELETE CASCADE
);

CREATE TABLE likes (
    usuario_id INTEGER,
    documento_id INTEGER,
    PRIMARY KEY (usuario_id,documento_id),
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
    follower_id INTEGER,
    following_id INTEGER,
    PRIMARY KEY (follower_id, following_id),
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


--Creacion de un indice tipo GIN
CREATE INDEX documentos_tsvector_idx 
ON documentos 
USING gin(tsvector);

-- Funcion
CREATE OR REPLACE FUNCTION documentos_tsvector_trigger()
RETURNS trigger AS $$
BEGIN
  NEW.tsvector := to_tsvector('spanish', coalesce(NEW.titulo, '') || ' ' || coalesce(NEW.text_content_detected, '') ||  ' ' || coalesce(NEW.descripcion, '') || ' ' || coalesce(NEW.curso, '') || ' ' || coalesce(NEW.ciclo::text, ''));
  RETURN NEW;
END
$$ LANGUAGE plpgsql;

-- Triger para indexacion automatica
CREATE TRIGGER tsvector_update
BEFORE INSERT OR UPDATE ON documentos
FOR EACH ROW
EXECUTE FUNCTION documentos_tsvector_trigger();


