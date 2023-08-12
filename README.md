## 1.- Clonar el Repositorio
git clone 'rutaalrepositorio'

## 2.- Crear el entorno virtual
python -m venv nombredelentorno

## 3.- Activar el entorno virtual
- source nombredelentorno/Scripts/activate (Windows)
- source nombredelentorno/bin/activate (Linux)

## 4.- Instalar los paquetes desde requirements.txt
python -m pip install -r requirements.txt

## 5.- Ejecutar la app
uvicorn main:app --reload --port 5000

## 6.- Se ejecuta en el entorno local
- http://127.0.0.1:5000/docs
- http://127.0.0.1:5000/usuarios

## Herramientas:
SQLite PyCharm Python 3.10.x
