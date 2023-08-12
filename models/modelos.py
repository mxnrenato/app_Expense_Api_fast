from config.database import Base
from sqlalchemy import Column, Integer, String

class Usuarios(Base):
    __tablename__ = "usuarios"

    nombres = Column(Integer)
    apellidos = Column(String)
    cedula = Column(Integer, primary_key = True)
    email = Column(String)
    password = Column(String)
    fechanacimiento = Column(String)
    direccion = Column(String)
    telefono = Column(Integer)

