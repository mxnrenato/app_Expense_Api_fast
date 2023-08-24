import axios from 'axios';


const ListarGastos = ({ gasto }) => {
    axios.defaults.baseURL = "http://127.0.0.1:5000";
    const { valor, idgastos, categoria, fechagasto } = gasto;

    const handleClick= async()=>{
        try {
            if (confirm('Deseas eliminar este registro?')) {
                await axios.delete(`/gastos/${idgastos}`)
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
                        <th className="text-center">Valor</th>
                        <th className="text-center">Categoría</th>
                        <th className="text-center">Fecha Gasto</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="text-center">{idgastos}</td>
                        <td className="text-center">{idgastos}</td>
                        <td className="text-center">{valor}</td>
                        <td className="text-center">{categoria}</td>
                        <td className="text-center">{fechagasto}</td>
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

export default ListarGastos
