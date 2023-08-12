
from fastapi import FastAPI
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
from typing import Optional, List
from config.database import Session, engine, Base
from models.modelos import Usuarios as UsuariosModel, Gastos as GastosModel,Ingresos as IngresosModel
#from models.modelos import Ingresos as IngresosModel
from fastapi.encoders import jsonable_encoder
from fastapi import Path
from fastapi import HTTPException
from datetime import date

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

class Gasto(BaseModel):
        
    idgastos: int 
    idusuariogastos: int
    categoria: str = Field(min_length=0, max_length=100)
    valor: float
    fechagasto: str = Field(min_length=0, max_length=100)
    class Config:
        schema_extra = {
            "example": {
                "idgastos": 1,
                "idusuariogastos": 1751112839,
                "categoria": "Sueldo",
                "valor": 454.32,
                "fechagasto": "2023-01-01"
            }
        }

#----------------------------------Clase Ingresos
class Ingreso(BaseModel):
        
    idingresos: int 
    idusuario: int
    concepto: str = Field(min_length=0, max_length=100)
    monto:float
    descripcion: str = Field(min_length=0, max_length=100)
    periodicidad:str = Field(min_length=0, max_length=100)
    fechaingreso: date 
    class Config:
        schema_extra = {
            "example": {
                "idingresos": 1,
                "idusuario": 1751112839,
                "concepto": "Gano rifa",
                "monto": 455.36,
                "descripcion": "dinero rifa",
                "periodicidad": "anual",
                "fechaingreso": "2023-01-01"
            }
        }



@app.get('/', tags=['home'])
def message():
    return "Hello world!"

#--------------------------------------------------------------------------------------------------------
#Tabla usuarios------------------------------------------------------------------
#Método get--------

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
    #----------------------------------------------------------------------------------------------
#-------------Gastos---------------------------------------------------------------
#Método post Gastos----------------------
@app.post('/gastos', tags=['gastos'], response_model=dict, status_code=201)
def create_gastos(gastos: Gasto) -> dict:
    db = Session()
    new_gastos = GastosModel(**gastos.dict())
    db.add(new_gastos)
    db.commit()
    return JSONResponse(status_code=201, content={"message": "Se ha registrado el gasto"})

#Método get de gastos----------------
@app.get('/gastos', tags=['gastos'], response_model=List[Gasto], status_code=200)
def get_gastos() -> List[Gasto]:
    db = Session()
    result = db.query(GastosModel).all()
    return JSONResponse(status_code=200, content = jsonable_encoder(result))

#Método put de gastos------------------

@app.put('/gastos/{idgastos}', tags=['gastos'], response_model=dict, status_code=200)
def update_gastos(idgastos: int, gasto: Gasto)-> dict:
    db = Session()
    result = db.query(GastosModel).filter(GastosModel.idgastos == idgastos).first()
    if not result:
        return JSONResponse(status_code=404, content={'message': "No encontrado"})
   # result.idgastos=Gasto.idgastos
    #result.idusuariogastos=Gasto.idusuariogastos
    result.categoria= gasto.categoria
    result.valor = gasto.valor
    result.fechagasto = gasto.fechagasto
    db.commit()
    return JSONResponse(status_code=200, content={"message": "Se ha modificado los gastos"})
#-----------------------------------------
#Método DELETE de gastos
@app.delete('/gastos/{idgastos}', tags=['gastos'], response_model=dict, status_code=200)
def delete_gastos(idgastos: int)-> dict:
    db = Session()
    result = db.query(GastosModel).filter(GastosModel.idgastos == idgastos).first()
    if not result:
        return JSONResponse(status_code=404, content={'message': "No encontrado"})
    db.delete(result)
    db.commit()
    return JSONResponse(status_code=200, content={"message": "Se ha eliminado el gasto"})

#----------------------------------------------------------------------------

@app.get('/gastos/{categoria}', tags=['gastos'], response_model=List[Gasto], status_code=200)
def get_gastos_por_categoria(categoria: str) -> List[Gasto]:
    db = Session()
    result = db.query(GastosModel).filter(GastosModel.categoria == categoria).all()
    
    if not result:
        raise HTTPException(status_code=404, detail='No se encontraron gastos en esa categoría')

    return JSONResponse(status_code=200, content=jsonable_encoder(result))
#-----------------------------------------------------------------------------------------------

#Metodos de ingresos-----------------------------------------------------------

#Método Post de ingresos
@app.post('/ingresos', tags=['ingresos'], response_model=dict, status_code=201)
def create_ingresos(ingreso: Ingreso) -> dict:
    db = Session()
    new_ingresos = IngresosModel(**ingreso.dict())
    db.add(new_ingresos)
    db.commit()
    return JSONResponse(status_code=201, content={"message": "Se ha registrado el ingreso"})

#------------------------------
#Método Get de ingresos
@app.get('/ingresos', tags=['ingresos'], response_model=List[Ingreso], status_code=200)
def get_ingresos() -> List[Ingreso]:
    db = Session()
    result = db.query(IngresosModel).all()
    return JSONResponse(status_code=200, content = jsonable_encoder(result))

#Método PUT de ingresos
@app.put('/ingresos/{idingresos}', tags=['ingresos'], response_model=dict, status_code=200)
def update_ingresos(idingresos: int, ingreso: Ingreso)-> dict:
    db = Session()
    result = db.query(IngresosModel).filter(IngresosModel.idingresos == idingresos).first()
    if not result:
        return JSONResponse(status_code=404, content={'message': "No encontrado"})
   # result.idgastos=Gasto.idgastos
    #result.idusuariogastos=Gasto.idusuariogastos
    result.concepto= ingreso.concepto
    result.monto=ingreso.monto
    result.descripcion= ingreso.descripcion
    result.periodicidad=ingreso.periodicidad
    result.fechaingreso = ingreso.fechaingreso
    

    db.commit()
    return JSONResponse(status_code=200, content={"message": "Se ha modificado los gastos"})

#-------------------------------
#método DELETE de ingresos

@app.delete('/ingresos/{idingresos}', tags=['ingresos'], response_model=dict, status_code=200)
def delete_ingresos(idingresos: int)-> dict:
    db = Session()
    result = db.query(IngresosModel).filter(IngresosModel.idingresos == idingresos).first()
    if not result:
        return JSONResponse(status_code=404, content={'message': "No encontrado"})
    db.delete(result)
    db.commit()
    return JSONResponse(status_code=200, content={"message": "Se ha eliminado el ingreso"})
