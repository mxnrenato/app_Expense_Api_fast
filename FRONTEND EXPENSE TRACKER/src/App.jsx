import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginLayaut from './layouts/LoginLayaut'
import Login from './pages/Login'
import Registrar from './pages/Registrar'
import RutaAcceso from './layouts/RutaAcceso'
import Reportes from './pages/Reportes'
import RegistrarGastos from './pages/RegistrarGastos'
import RegistrarIngresos from './pages/RegistrarIngresos'
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginLayaut />}>
          <Route index element={<Login />} />
          <Route path='registrar' element={<Registrar />} />
        </Route>
        <Route path='/menu' element={<RutaAcceso />}>
          <Route index element={<Reportes />}/>
          <Route path='registro-ingresos' element={<RegistrarIngresos />}/>
          <Route path='registro-gastos' element={<RegistrarGastos />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
