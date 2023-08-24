import React from 'react'
import { Link } from 'react-router-dom'
const Registrar = () => {
    return (
        <div className='md:mt-2 p-5 md:flex md:justify-center'>
            <form
                className=' bg-white shadow-lg rounded-xl border-2  px-10 py-16 border-gray-100'
            >
                <h1 className=" text-5xl capitalize font-black text-sky-500 text-center">Registrate</h1>
                <p className=" p-3 font-medium text-lg text-gray-600 mt text-center">Ingresa tus datos personales y crea tu cuenta con
                    
                </p>
                <h2 className='text-purple-500 font-black text-2xl text-center'>ExpenseTrack</h2>
                <div className='my-2'>
                    <label className="text-lg font-medium block uppercase" htmlFor='nombre'>Nombre</label>
                    <input
                        type="text"
                        id='nombre'
                        className=" bg-transparent w-full mt-3 p-2 border-2 border-gray-100 rounded-lg"
                        placeholder="Ingrese su nombre"
                    />
                </div>
                <div className='my-5'>
                    <label className="text-lg font-medium block uppercase" htmlFor='apellido'>Apellido</label>
                    <input
                        id='apellido'
                        type="text"
                        className=" bg-transparent w-full mt-3 p-2 border-2 border-gray-100 rounded-lg"
                        placeholder="Ingrese su apellido"
                    />
                </div>
                <div className='my-5'>
                    <label className="text-lg font-medium block uppercase" htmlFor='direccion'>Dirección</label>
                    <input
                        id='direccion'
                        type="text"
                        className=" bg-transparent w-full mt-3 p-2 border-2 border-gray-100 rounded-lg"
                        placeholder="Ingrese su apellido"
                    />
                </div>
                <div className='my-5'>
                    <label className="text-lg font-medium block uppercase" htmlFor='email'>Correo</label>
                    <input
                        id='email'
                        type="email"
                        className=" bg-transparent w-full mt-3 p-2 border-2 border-gray-100 rounded-lg"
                        placeholder="correo@espe.com"
                    />
                </div>
                <div className='my-5'>
                    <label className="text-lg font-medium block uppercase" htmlFor='password'>Contraseña</label>
                    <input
                        id='password'
                        type="password"
                        placeholder="Contraseña"
                        className=" bg-transparent w-full mt-3 p-2 border-2 border-gray-100 rounded-lg"
                    />
                </div>
                <div className='my-5'>
                    <label className="text-lg font-medium block uppercase" htmlFor='password2'>Confirma la contraseña</label>
                    <input
                        id='password2'
                        type="password"
                        placeholder="Contraseña"
                        className=" bg-transparent w-full mt-3 p-2 border-2 border-gray-100 rounded-lg"
                    />
                </div>
                <input
                    type="submit"
                    value="Crear Cuenta"
                    className="bg-purple-500 w-full py-3 text-white uppercase font-bold rounded-xl 
                                 hover:cursor-pointer hover:bg-violet-600 transition-colors mb-5 mt-2"
                />
                <nav className=" lg:flex lg:justify-between">
                    <Link
                        to="/"
                        className='block text-center my-5 text-slate-500 uppercase text-sm'
                    > ¿Ya tienes una cuenta? Inicia sesión
                    </Link>
                </nav>
            </form>
        </div>
    )
}

export default Registrar
