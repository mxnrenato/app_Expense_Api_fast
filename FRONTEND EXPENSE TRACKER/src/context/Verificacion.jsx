import { useState, useEffect, createContext } from "react";
//import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";

const VerificacionContext = createContext();
const Verificacion = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [cargando, setCargando] = useState(true);

    const navigate = useNavigate()
    useEffect(() => {
        const autenticarUsuario = async () => {
            try {
                setAuth({ nombre:"Juan"})
                navigate('/proyectos')
            } catch (error) {
                setAuth({})
            } finally {
                setCargando(false)
            }
        }
        autenticarUsuario()
    }, [])
    return (
        <AuthContext.Provider
            value={{
                setAuth,
                auth,
                cargando
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
export {
    Verificacion
}
export default VerificacionContext
