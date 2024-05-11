import React from "react";
import useTheme from "../theme";

const Login = () => {
  const { darkMode } = useTheme();

  return (
    <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-cach-l2 text-black'}`}>
      <div className={`shadow-md rounded px-8 pt-6 pb-8 mb-4 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h1 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-black'}`}>Iniciar sesión</h1>
        <form>
          <div className="mb-4">
            <label className={`block text-sm font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-700'}`} htmlFor="username">
              Usuario
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}
              id="username"
              type="text"
              placeholder="Usuario"
            />
          </div>
          <div className="mb-6">
            <label className={`block text-sm font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-700'}`} htmlFor="password">
              Contraseña
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}
              id="password"
              type="password"
              placeholder="******************"
            />
            <p className={`text-red-500 text-xs italic ${darkMode ? 'text-white' : 'text-red-500'}`}>Por favor ingrese su contraseña.</p>
          </div>
          <div className="flex items-center justify-between">
            <button
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-600' : ''}`}
              type="button"
            >
              Iniciar sesión
            </button>
            <button
              className={`inline-block align-baseline font-bold text-sm ${darkMode ? 'text-white' : 'text-blue-500'} hover:text-blue-800`}
              onClick={() => console.log("Haz clic en '¿Olvidaste tu contraseña?'")}
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
