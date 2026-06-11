# PORTAFOLIO PARA ESTUDIANTES DE ADMINISTRACION DE SO.
Este proyecto en react es un portafolio para estudiantes de primer semestre en el cual lograran mostrar los productos realizados en su avanze.
# Agregar portafolio
Para agregar un portafolio nuevo se debe crear un archivo json en la carpeta `students` con el formato nombre: `nombre_nombre_apellido_apellido.json`. 
Nota: Evitar caracteres acentuados o no compatibles como `ñ` usar `n` en su lugar.
El archivo debe contener el siguiente formato: 
```json
{
    "fullname": "Jhon Doe",
    "image_profile": "",
    "social_media": [
        {
            "id": 1,
            "title": "Linkedin",
            "url": "https://www.linkedin.com/in/jhon-doe/,"
        },
        {
            "id": 1,
            "title": "Github",
            "url": "https://www.github.com/jhon-doe,"
        }
    ],
    "comment": "Soy Jhon Doe, la materia de Adm. De SO me ayudo a comprender conceptos claves.",
    "portfolio": [
        {
            "id": 1,
            "title": "Maquina virtual",
            "description": " Es la installacion de una maquina virtual linux debian, la cual me ayude a comprender el proceso de instalacion de un SO.",
            "image_url": ""
        },
        {
            "id": 2,
            "title": "Maquina virtual",
            "description": " Es la installacion de una maquina virtual linux debian, la cual me ayude a comprender el proceso de instalacion de un SO.",
            "image_url": ""
        }
    ]
}
```