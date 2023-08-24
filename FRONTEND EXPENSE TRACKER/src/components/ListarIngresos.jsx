import axios from 'axios';


const ListarIngresos = ({ ingreso }) => {
    axios.defaults.baseURL = "http://127.0.0.1:5000";
    const { monto, idingresos, periodicidad, descripcion, concepto, fechaingreso } = ingreso;

    const handleClick= async()=>{
        try {
            if (confirm('Deseas eliminar este proyecto?')) {
                await axios.delete(`/ingresos/${idingresos}`)
            }
        } catch (error) {
            console.log('Eroor', error)
        }
        
      }
    return (
        <div className="bg-primaryBackground pt-2 mx-2 my-4  w-full">
            {/* Tabla de datos */}
            <table className="w-full shadow table-fixed">
                <thead>
                    <tr>
                        <th className="text-center">ID</th>
                        <th className="text-center">Periodicidad</th>
                        <th className="text-center">Monto</th>
                        <th className="text-center">Descripción</th>
                        <th className="text-center">concepto</th>
                        <th className="text-center">Fecha Ingreso</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="text-center">{idingresos}</td>
                        <td style={{ wordWrap: 'break-word' }} className="text-center">
                            {periodicidad}
                        </td>
                        <td className="text-center">{monto}</td>
                        <td className="text-center">{descripcion}</td>
                        <td className="text-center">{concepto}</td>
                        <td className="text-center">{fechaingreso}</td>
                        <td>
                            <div className=' grid grid-cols-1 my-5'>
                                <div>
                                    <input className=" uppercase text-center p-2 mb-2
                                     bg-purple-500 rounded-xl w-full font-bold text-white
                                     hover:bg-violet-600 transition-colors"
                                        type='submit'
                                        value='Borrar'
                                        onClick={handleClick}
                                    />
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default ListarIngresos
