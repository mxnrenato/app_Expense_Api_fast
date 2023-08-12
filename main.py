from fastapi import FastAPI
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
from typing import Optional, List
from config.database import Session, engine, Base
from models.modelos import Usuarios as UsuariosModel
#from models.modelos import Ingresos as IngresosModel
from fastapi.encoders import jsonable_encoder

app = FastAPI()
app.title = 'APP EXPENSE TRACKER API'
app.version = '0.0.1'

Base.metadata.create_all(bind=engine)

class Usuario(BaseModel):
        
    nombres: str = Field(min_length=0, max_length=100)
    apellidos: str = Field(min_length=0, max_length=100)
    cedula: int 
    email:str = Field(min_length=0, max_length=100)
    password: str = Field(min_length=0, max_length=100)
    fechanacimiento: str = Field(min_length=0, max_length=100)
    direccion: str = Field(min_length=0, max_length=100)
    telefono: int 
    class Config:
        schema_extra = {
            "example": {
                "nombres":"Jessica",
                "apellidos": "Yandun",
                "cedula": 1459856256,
                "email": "jessica@email.com",
                "password": "jessica",
                "fechanacimiento": "2003-08-09",
                "direccion": "CIUDADELA UNIVERSITARIOS",
                "telefono": 983652147
            }
        }

usuario = [
    {
    "nombres":"Jessica",
    "apellidos": "Yandun",
    "cedula": 1459856256,
    "email": "jessica@email.com",
    "password": "jessica",
    "fechanacimiento": "2003-08-09",
    "direccion": "CIUDADELA UNIVERSITARIOS",
    "telefono": 983652147
    }
]

@app.get('/', tags=['home'])
def message():
    return "Hello world!"

@app.get('/usuarios', tags=['usuarios'], response_model=List[Usuario], status_code=200)
def get_usuarios() -> List[Usuario]:
    db = Session()
    result = db.query(UsuariosModel).all()
    return JSONResponse(status_code=200, content = jsonable_encoder(result))

@app.post('/usuarios', tags=['usuarios'], response_model=dict, status_code=201)
def create_usuarios(usuarios: Usuario) -> dict:
    db = Session()
    new_usuarios = UsuariosModel(**usuarios.dict())
    db.add(new_usuarios)
    db.commit()
    return JSONResponse(status_code=201, content={"message": "Se ha registrado el usuario"})

@app.put('/usuarios/{cedula}', tags=['usuarios'], response_model=dict, status_code=200)
def update_usuarios(cedula: int, usuario: Usuario)-> dict:
    db = Session()
    result = db.query(UsuariosModel).filter(UsuariosModel.cedula == cedula).first()
    if not result:
        return JSONResponse(status_code=404, content={'message': "No encontrado"})
    result.nombres = usuario.nombres
    result.apellidos= usuario.apellidos
    result.email = usuario.email
    result.fechanacimiento = usuario.fechanacimiento
    result.direccion = usuario.direccion
    result.telefono = usuario.telefono
    db.commit()
    return JSONResponse(status_code=200, content={"message": "Se ha modificado el usuario"})

@app.delete('/usuarios/{cedula}', tags=['usuarios'], response_model=dict, status_code=200)
def delete_usuarios(cedula: int)-> dict:
    db = Session()
    result = db.query(UsuariosModel).filter(UsuariosModel.cedula == cedula).first()
    if not result:
        return JSONResponse(status_code=404, content={'message': "No encontrado"})
    db.delete(result)
    db.commit()
    return JSONResponse(status_code=200, content={"message": "Se ha eliminado el usuario"})