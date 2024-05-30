# Backend de UniNote

Este directorio contiene el backend de la aplicación UniNote

## Configuración del Entorno

Antes de iniciar el servidor, asegúrate de tener Python y todas las dependencias necesarias instaladas. Las dependencias se pueden instalar utilizando el siguiente comando:

```bash
pip install -r requirements.txt
```
## Ejecutar el Servidor
### 1) Cambiar de directorio (en caso lo requiera):
```bash
    cd backend
```
### 2) Ejecutar el servidor:
```bash
    python run.py
```
El servidor se iniciará en [http://127.0.0.1:5000](http://127.0.0.1:5000), donde se podrá acceder a distintas rutas de la API

## Rutas de la API
A continuación se describen las rutas disponibles en la API y sus funciones

### Autenticación
- **POST /signup :** Registra un nuevo usuario. Espera recibir un JSON con _**username**_, _**email**_, _**password**_.
- **POST /login:** Autentica a un usuario para iniciar sesión. Espera recibir un JSON con _**email**_, _**password**_.

### Usuarios
- **GET /usuarios:** Devuelve una lista de todos los usuarios en formato JSON.
- **GET /usuarios/<usuario_id>:** Obtiene información detallada de un usuario específico en formato JSON.
- **PUT /usuarios/<usuario_id>:** Actualiza la información de un usuario específico. Espera recibir un JSON con los datos a actualizar (por ejemplo _**username**_ o _**password**_)
- **DELETE /usuarios/<usuario_id>:** Elimina un usuario en específico de la base de datos.

### Carreras
- **GET /usuarios:** Devuelve en una lista todas las carreras disponibles en formato JSON.

### Seguimientos de usuarios
- **GET /followers/<usuario_id>:** Lista todos los seguidores de un usuario en específico, devolviendo una lista en formato JSON.
- **GET /following/<usuario_id>:** Lista todos los usuarios a los que sigue un usuario en específico, devolviendo una lista en formato JSON.



