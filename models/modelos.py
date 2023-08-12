from config.database import Base
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, Date, ForeignKey

class Usuarios(Base):
    __tablename__ = "usuarios"

    nombres = Column(Integer)
    apellidos = Column(String)
    cedula = Column(Integer, primary_key = True)
    email = Column(String)
    password = Column(String)
    fechanacimiento = Column(Date)
    direccion = Column(String)
    telefono = Column(Integer)

    ingresos = relationship("Ingresos", back_populates="usuario")

class Ingresos(Base):
    __tablename__ = "Ingresos"

    idingresos = Column(Integer, primary_key = True)
    idusuario = Column(Integer, ForeignKey("usuarios.cedula"))
    concepto = Column(String)
    descripcion = Column(String)
    periodicidad = Column(String)
    fechaingreso = Column(Date)

    usuario = relationship("Usuarios", back_populates="ingresos")
    
