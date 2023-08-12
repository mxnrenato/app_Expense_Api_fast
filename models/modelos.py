from config.database import Base
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, Date, ForeignKey, Float

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

    ingresos = relationship("Ingresos", back_populates="usuarios")
    gastos = relationship("Gastos", back_populates="usuarios")

class Ingresos(Base):
    __tablename__ = "ingresos"

    idingresos = Column(Integer, primary_key = True)
    idusuario = Column(Integer, ForeignKey("usuarios.cedula"))
    concepto = Column(String)
    monto = Column(Float)
    descripcion = Column(String)
    periodicidad = Column(String)
    fechaingreso = Column(Date)

    usuarios = relationship("Usuarios", back_populates="ingresos")
    
class Gastos(Base):
    __tablename__ = "gastos"

    idgastos = Column(Integer, primary_key = True)
    idusuariogastos = Column(Integer, ForeignKey("usuarios.cedula"))
    categoria = Column(String)
    valor = Column(Float)
    fechagasto = Column(String)

    usuarios = relationship("Usuarios", back_populates="gastos")
    