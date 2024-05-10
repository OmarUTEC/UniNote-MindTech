import React from "react";

const Login = () => {
  return (
    <div className="bg-cach-l2 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-2xl font-bold text-cach-l4 mb-4">Iniciar sesión</h1>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Usuario
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Usuario"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Contraseña
            </label>
            <input
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
            />
            <p className="text-red-500 text-xs italic">Por favor ingrese su contraseña.</p>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-cach-l2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Iniciar sesión
            </button>
            <button
                className="inline-block align-baseline font-bold text-sm text-cach-l2 hover:text-blue-800"
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
