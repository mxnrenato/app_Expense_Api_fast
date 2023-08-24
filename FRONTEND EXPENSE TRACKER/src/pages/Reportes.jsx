import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
const Reportes = () => {
  axios.defaults.baseURL = "http://127.0.0.1:5000";
  const [gastos, setGastos] = useState([]);

  const [gastoFecha, setGastoFecha] = useState('');

  const navigate = useNavigate();
  useEffect(() => {

    const user = localStorage.getItem('user')
    const id = localStorage.getItem('cedula')
    if (!user) {
      navigate('/')
    }
    const obtenerGastos = async () => {
      await axios.get("/gastos").then(response => {
        setGastos(response.data);
      }).catch(error => {
        console.log("ERROR*********", error);
      });
    }
    obtenerGastos()
  }, []);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleFilterAndSum = () => {
    const filteredGastos = gastos.filter(gasto => {
      const gastoDate = new Date(gasto.fechagasto);
      return gastoDate >= new Date(startDate) && gastoDate <= new Date(endDate);
    });

    const totalAmount = filteredGastos.reduce((total, gasto) => total + gasto.valor, 0);
    setGastoFecha(totalAmount)
  };

  return (


    <div className='container'>
      <h1 className=" text-5xl capitalize mb-5 font-black text-sky-500 text-center">Reportes <span className=' text-purple-500'>Generales</span></h1>
      <div className=' bg-white shadow-lg rounded-xl border-2  px-10 py-10 border-gray-100 mx-auto'>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
          <div className='my-2'>
            <label className="text-lg font-medium block uppercase">Fecha de inicio:</label>
            <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
            <label className="text-lg font-medium block uppercase">Fecha de fin:</label>
            <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 my-5'>
            <input onClick={handleFilterAndSum} className=" uppercase text-center p-2
                           bg-purple-500 rounded-xl w-full font-bold text-white
                           hover:bg-violet-600 transition-colors "
              value='FILTRAR'
              type='submit' />
          </div>
          </div>
          <div className='my-2 bg-white shadow-lg rounded-xl mt-5 border-2 px-10 py-10 border-gray-100  overflow-y-scroll'>
            {gastos.map(gasto => (
              <div key={gasto.idgastos}>
                <p>Valor: {gasto.valor}</p>
                <p>Categoría: {gasto.categoria}</p>
                <p>Fecha de gasto: {gasto.fechagasto}</p>
              </div>
            ))}
          </div>

        </div>
        <h2 className='text-4xl capitalize mb-5 font-black text-sky-500 text-center'>
          Gastos filtrados por fecha: <span className='text-purple-500'>{gastoFecha}</span> Dolares
        </h2>
      </div>

    </div>
  )
}

export default Reportes
