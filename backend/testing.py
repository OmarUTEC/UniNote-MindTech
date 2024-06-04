import requests

# URL de la ruta a la que deseas llamar
url = 'http://127.0.0.1:5000/documents'

# Realiza la solicitud GET a la ruta
response = requests.get(url)

# Verifica si la solicitud fue exitosa (código de estado 200)
if response.status_code == 200:
    # Imprime la respuesta en formato JSON
    data = response.json()
    # print(response.json())
    print(data[0])
else:
    # Imprime un mensaje de error si la solicitud no fue exitosa
    print(f'Error al llamar a la ruta. Código de estado: {response.status_code}')
