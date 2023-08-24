import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import ListarGastos from '../components/ListaGastos';
const RegistrarGastos = () => {
    axios.defaults.baseURL = "http://127.0.0.1:5000";
    const [gastos, setGastos] = useState([]);
    const [valor, setValor] = useState('');
    const [idgastos, setIdgastos] = useState('');
    const [categoria, setCategoria] = useState('');
    const [idusuariogastos, setIdusuariogastos] = useState('');
    const [fechagasto, setFechagasto] = useState('');

    const [refrescar, setRefrescar] =  useState(false);
    const navigate = useNavigate();
    const CATEGORIA = ['Vivienda', 'Alimentación', 'Vestimenta', 'Educación', 'Turismo', 'Salud']
    
    useEffect(() => {

        const user = localStorage.getItem('user')
        const id = localStorage.getItem('cedula')
        if (!user) {
            navigate('/')
        }
        const obtenerGastos = async () => {
            setIdusuariogastos(id)
            await axios.get("/gastos").then(response => {
                setGastos(response.data);
            }).catch(error => {
                console.log("ERROR*********", error);
            });
        }
        obtenerGastos()
    }, []);

    const handleSubmitGastos = async (e) => {
        e.preventDefault();
        if ([gastos, valor, idgastos, categoria, idusuariogastos, fechagasto].includes('')) { //si las siguientes variables incluyen string vacios 
            console.log(gastos, valor, idgastos, categoria, idusuariogastos, fechagasto)
            alert('Complete todos los campos')
            return
        }
        try {
            axios.post('/gastos', { gastos, valor, idgastos, categoria, idusuariogastos, fechagasto })
            alert('Datos Guardados Correctamente')
            setRefrescar(true)
        } catch (error) {
            alert('Error al guardar el registro, verifique el codigo de la factura o recibo')
        }

        setCategoria('')
        setIdgastos('')
        setValor('')

    }
    return (
        <div className=' container'>
            <h1 className=" text-5xl capitalize mb-7 font-black text-sky-500 text-center">Registro de <span className=' text-purple-500'>Gastos</span></h1>
            <form
                className=' bg-white shadow-lg rounded-xl border-2  px-10 py-16 border-gray-100 m-auto'
                onSubmit={handleSubmitGastos}
            >
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                    <div className='my-2'>
                        <label className="text-lg font-medium block uppercase" htmlFor='categoria'>Categoria</label>
                        <select
                            id='categoria'
                            className='border-2 w-full p-2 mt-3 placeholder-gray-400 rounded-md'
                            onChange={e => setCategoria(e.target.value)}
                        >
                            <option value="">-- Seleccionar --</option>
                            {CATEGORIA.map(opcion => (
                                <option key={opcion}>{opcion}</option>
                            ))}

                        </select>
                    </div>
                    <div className='my-2'>
                        <label className="text-lg font-medium block uppercase" htmlFor='monto'>Valor</label>
                        <input
                            type="text"
                            id='monto'
                            className=" bg-transparent w-full mt-3 p-2 border-2 border-gray-100 rounded-lg"
                            placeholder="Valor del gasto $"
                            value={valor}
                            onChange={e => setValor(e.target.value)}
                        />
                    </div>
                    <div className='my-2'>
                        <label className="text-lg font-medium block uppercase" htmlFor='idgasto'>Número de factura o recibo</label>
                        <input
                            type="text"
                            id='idgasto'
                            className=" bg-transparent w-full mt-3 p-2 border-2 border-gray-100 rounded-lg"
                            placeholder="Valor del gasto $"
                            value={idgastos}
                            onChange={e => setIdgastos(e.target.value)}
                        />
                    </div>
                    <div className='my-2'>
                        <label className="text-lg font-medium block uppercase" htmlFor='fechagasto'>Fecha del Gasto</label>
                        <input
                            type="date"
                            id='fechagasto'
                            className=" bg-transparent w-full mt-3 p-2 border-2 border-gray-100 rounded-lg"
                            onChange={e => setFechagasto(e.target.value)}

                        />
                    </div>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 my-5'>
                    <div>
                        <input className=" uppercase text-center p-2
                           bg-purple-500 rounded-xl w-full font-bold text-white
                           hover:bg-violet-600 transition-colors"
                            type='submit'
                            value='Guardar'
                        />
                    </div>
                </div>
            </form>
            {/* <ListarIngresos/> */}
            <div className=" bg-white shadow-lg rounded-xl mt-5 border-2 px-10 py-10 border-gray-100 mx-auto' overflow-y-scroll">
                <div className=" pb-10">
                    {gastos ? gastos.map((gasto) => (<ListarGastos key={gasto.idgastos} gasto={gasto} />)) : <h1>No existen datos</h1>}
                </div>
            </div>
        </div>
    )
}

export default RegistrarGastos
