import { useContext } from "react"
import VerificacionContext from "../context/Verificacion"
const usuarioVerificacion = () => {
  return (
    useContext(VerificacionContext)
  )
}

export default usuarioVerificacion
