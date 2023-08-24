import { Outlet, Navigate } from "react-router-dom"
import usuarioVerificacion from "../hooks/usuarioVerificacion"
import BarraLateral from "../components/barraLateral"

const RutaAcceso = () => {
    //const { auth, cargando} = usuarioVerificacion()
    //console.log(auth)
    return (
        <>
            <div className="bg-gray-100">
                <div className="md:flex md:min-h-screen">
                    <BarraLateral />
                    <main className="flex-1 bg-blue-50 p-10">
                        <Outlet />
                    </main>
                </div>
            </div>
        </>
    )
}

export default RutaAcceso
