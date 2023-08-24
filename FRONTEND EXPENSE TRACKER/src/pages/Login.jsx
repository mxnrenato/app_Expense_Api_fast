import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios'

const Login = () => {

  axios.defaults.baseURL = "http://127.0.0.1:5000";
  const [usuarios, setUsuarios] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/usuarios").then(response => {
      setUsuarios(response.data);
    }).catch(error => {
      console.log("ERROR*********", error);
    });
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = usuarios.find(user => user.email === email && user.password === password);
      if (user) {
        localStorage.setItem('user', user.nombres)
        localStorage.setItem('cedula', user.cedula)

        navigate('/menu')
      } else {
        alert('Correo o contraseña incorrectos');
      }
    } catch (error) {
      alert('Correo o contraseña incorrectos');
    }
  }
  return (
    <form onSubmit={handleLogin}>
      <div className="flex w-full h-screen">
        <div className="w-full flex items-center justify-center lg:w-1/2">
          <div className="mt-8">
            <div className=" bg-white px-10 py-20 rounded-xl border-2 border-gray-100 shadow-lg">

              <div className="flex items-center gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-purple-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
                <h1 className=" text-4xl capitalize font-black text-sky-500">Login</h1>
              </div>
              <p className=" p-5 font-medium text-lg text-gray-600 mt text-center">¡Bienvenido al sistema de control de gastos!</p>
              <div>
                <label className="text-lg font-medium">Email</label>
                <input
                  type="email"
                  className=" bg-transparent w-full mt-1 p-4 border-2 border-gray-100 rounded-lg"
                  placeholder="Ingrese su email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="text-lg font-medium">Contraseña</label>
                <input
                  type="password"
                  className=" bg-transparent w-full mt-1 p-4 border-2 border-gray-100 rounded-lg"
                  placeholder="Ingrese su contraseña"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>

              <div className="mt-8">
                <button className=" uppercase text-center p-2
                 bg-purple-500 rounded-xl w-full font-bold text-white
                  hover:bg-violet-600 transition-colors">
                  Iniciar Sesión
                </button>
              </div>
              <Link
                to="registrar"
                className='block text-center my-5 text-slate-500 uppercase text-sm'
              > ¿No tienes una cuenta Registrate?
              </Link>

            </div>
          </div>
        </div>
        <div className="hidden lg:flex bg-blue-200 h-full items-center justify-center w-1/2">
          <img src="/Portada.jpg" alt="" />
        </div>
      </div>
    </form>
  );
};

export default Login;
