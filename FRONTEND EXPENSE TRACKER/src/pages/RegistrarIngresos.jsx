import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import ListarIngresos from '../components/ListarIngresos';
const RegistrarIngresos = () => {

    axios.defaults.baseURL = "http://127.0.0.1:5000";
    const [ingresos, setIngresos] = useState([]);

    const [ idusuario, setId] = useState('');
    const [ concepto, setConcepto] = useState('');
    const [ descripcion, setDescripcion] = useState('');
    const [ fechaingreso, setFechaingreso] = useState('');
    const [ monto, setMonto] = useState('');
    const [ idingresos, setIdingresos] = useState('');
    const [ periodicidad, setPeriodicidad] = useState('');

    const PERIODOS = ['Mensual', 'Quincenal', 'Anual']


    const navigate = useNavigate();

    useEffect(() => {

        const user = localStorage.getItem('user')
        const id = localStorage.getItem('cedula')
        if (!user) {
            navigate('/')
        }
        const obtenerIngresos = async () => {
            setId(id)
            await axios.get("/ingresos").then(response => {
                setIngresos(response.data);
            }).catch(error => {
                console.log("ERROR*********", error);
            });
        }
        obtenerIngresos()
    }, []);
    const handleSubmit = async (e) =>{
        e.preventDefault();
        if ([concepto, descripcion, fechaingreso, monto, idingresos, periodicidad ].includes('')) { //si las siguientes variables incluyen string vacios 
            alert('Complete todos los campos')
            return
        }
        try {
            axios.post('/ingresos', {idusuario,concepto, descripcion, fechaingreso, monto, idingresos, periodicidad})
            alert('Datos Guardados Correctamente')
        } catch (error) {
            alert('Error al guardar el registro, verifique el codigo del ingreso')
        }
        setId('');
        setConcepto('');
        setDescripcion('');
        setMonto('');
        setIdingresos('');
    }


    return (
        <div className=' container'>
            <h1 className=" text-5xl capitalize mb-5 font-black text-sky-500 text-center">Registro de <span className=' text-purple-500'>Ingresos</span></h1>
            <form
                className=' bg-white shadow-lg rounded-xl border-2  px-10 py-10 border-gray-100 mx-auto'
                onSubmit={handleSubmit}
            >
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                    <div className='my-2'>
                        <label className="text-lg font-medium block uppercase" htmlFor='concepto'>Concepto</label>
                        <input
                            type="text"
                            id='concepto'
                            className=" bg-transparent w-full mt-3 p-2 border-2 border-gray-100 rounded-lg"
                            placeholder="Ingrese el concepto"
                            value={concepto}
                            onChange={e => setConcepto(e.target.value)}
                        />
                    </div>
                    <div className='my-2'>
                        <label className="text-lg font-medium block uppercase" htmlFor='valor'>Monto</label>
                        <input
                            type="text"
                            id='monto'
                            className=" bg-transparent w-full mt-3 p-2 border-2 border-gray-100 rounded-lg"
                            placeholder="Valor del ingreso $"
                            value={monto}
                            onChange={e => setMonto(e.target.value)}
                        />
                    </div>
                    <div className='my-2'>
                        <label className="text-lg font-medium block uppercase" htmlFor='valor'>Factura o identificador de ingreso</label>
                        <input
                            type="text"
                            id='ingreso-id'
                            className=" bg-transparent w-full mt-3 p-2 border-2 border-gray-100 rounded-lg"
                            placeholder="Número de factura o numero del rol"
                            value={idingresos}
                            onChange={e => setIdingresos(e.target.value)}
                        />
                    </div>
                    <div className='my-2'>
                        <label className="text-lg font-medium block uppercase" htmlFor='nombre'>Fecha de Ingreso</label>
                        <input
                            type="date"
                            id='nombre'
                            className=" bg-transparent w-full mt-3 p-2 border-2 border-gray-100 rounded-lg"
                            placeholder="Ingrese su nombre"
                            onChange={e => setFechaingreso(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="text-lg font-medium block uppercase" htmlFor='decripcion'>Descripción</label>
                        <textarea
                            id="decripcion"
                            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                            placeholder="Descripción del proyecto"
                            value={descripcion}
                            onChange={e => setDescripcion(e.target.value)}
                        />
                    </div>
                    {/* Campo de la periodicidad */}
                    <div className='mb-5'>
                                            <label
                                                className=' text-lg font-medium block uppercase'
                                                htmlFor='periodo'
                                            >
                                                    Prioridad
                                            </label>
                                            <select 
                                                id='periodo'
                                                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                                                value={periodicidad}
                                                onChange={e => setPeriodicidad(e.target.value)}
                                            >
                                                <option value="">-- Seleccionar --</option>
                                                {PERIODOS.map(opcion =>(
                                                    <option key={opcion}>{opcion}</option>
                                                ))}

                                            </select>
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
                    {ingresos ? ingresos.map((ingreso) => (<ListarIngresos key={ingreso.idingresos} ingreso={ingreso} />)) : <h1>No existen datos</h1>}
                </div>
            </div>
        </div>
    )
}

export default RegistrarIngresos;
