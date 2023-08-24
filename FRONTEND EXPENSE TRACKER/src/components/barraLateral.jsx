import { Link,useNavigate  } from "react-router-dom";
import usuarioVerificacion from "../hooks/usuarioVerificacion";
import { useState, useEffect } from "react";

const barraLateral = () => {
    const [open, setOpen] = useState(true);
    const [ user, setUser ] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        const user = localStorage.getItem('user')
        setUser(user)
      }, []);

      const handleSalir = () => {
        localStorage.clear('user')
        navigate('/')
      }
    return (

        <div className="flex">
            <div className={`${open ? "w-72" : "w-20"} bg-sky-500 relative`}>
                <div className="flex items-center p-5 gap-2 text-white text-2xl border-b-2">
                    <svg xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className={`${!open ? "w-10 h-10" : "w-7 h-7"}`}>
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                    </svg>
                    <p className={` ${!open ? "hidden" : "font-bold"}`}>Hola:</p>
                    <span className={`${!open ? "hidden" : "font-semibold"}`}>{user}</span>


                </div>
                <Link
                    to="registro-ingresos"
                    className='flex items-center gap-2 hover:bg-sky-700 text-white w-full p-5 hover:border-t-2 hover:border-b-2  uppercase font-bold mt-5 text-center transition-colors'
                >
                    <svg xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className={`${!open ? "w-10 h-10" : "w-7 h-7"}`}>
                        <path strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                    </svg>

                    <p className={`${!open && "hidden"}`}>Registrar Ingresos</p>
                </Link>
                <Link
                    to="registro-gastos"
                    className='flex items-center gap-2 hover:bg-sky-700 text-white w-full p-5 hover:border-t-2 hover:border-b-2  uppercase font-bold mt-5 text-center transition-colors'
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                        className={`${!open ? "w-10 h-10" : "w-7 h-7"}`}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
                    </svg>


                    <p className={`${!open && "hidden"}`}>Registrar Gastos</p>
                </Link>
                <Link
                    to="/menu"
                    className='flex items-center gap-2 hover:bg-sky-700 text-white w-full p-5 hover:border-t-2 hover:border-b-2  uppercase font-bold mt-5 text-center transition-colors'
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                        stroke="currentColor" className={`${!open ? "w-10 h-10" : "w-7 h-7"}`}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                    </svg>


                    <p className={`${!open && "hidden"}`}>Proyección</p>
                </Link>
                <Link
                    to="/menu"
                    className='flex items-center gap-2 hover:bg-sky-700 text-white w-full p-5 hover:border-t-2 hover:border-b-2  uppercase font-bold mt-5 text-center transition-colors'
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                        stroke="currentColor" className={`${!open ? "w-10 h-10" : "w-7 h-7"}`}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z" />
                    </svg>


                    <p className={`${!open && "hidden"}`}>Reportes</p>
                </Link>

                {/* Salir */}
                <div onClick={handleSalir} className="flex items-center gap-2 hover:bg-sky-700 text-white w-full p-5 hover:border-t-2 hover:border-b-2  uppercase font-bold mt-5 text-center transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`${!open ? "w-10 h-10" : "w-7 h-7"}`}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                    </svg>

                    <input

                        type="submit"
                        value="Salir"
                        className={`${!open && "hidden"}`}
                    />
                </div>

            </div>
            <div
                onClick={() => setOpen(!open)}
            >
                {open ?
                    <svg xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24" strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 absolute cursor-pointer">
                        <path strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"

                        />
                    </svg>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 absolute cursor-pointer">
                        <path strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
                        />
                    </svg>

                }

            </div>
        </div>
    )
}

export default barraLateral
