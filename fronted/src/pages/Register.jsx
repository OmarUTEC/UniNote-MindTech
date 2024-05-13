import React, { useState } from "react";
import useTheme from "../theme";
import { Link } from "react-router-dom";

const Register = () => {
  const { darkMode } = useTheme();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    nombre: "",
    apellido: "",
    carrera: "",
    ciclo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes enviar los datos del formulario a tu servidor o realizar alguna acción
    console.log(formData);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-cach-l2 text-black'}`}>
      <div className={`shadow-md rounded px-8 pt-6 pb-8 mb-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} w-96`}>
        <h1 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-black'}`}>Registro</h1>
        <form onSubmit={handleSubmit}>
        <div className="mb-4">
            <label className={`block text-sm font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-700'}`} htmlFor="username">
              Usuario
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}
              id="username"
              name="username"
              type="text"
              placeholder="Usuario"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className={`block text-sm font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-700'}`} htmlFor="password">
              Contraseña
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}
              id="password"
              name="password"
              type="password"
              placeholder="******************"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className={`block text-sm font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-700'}`} htmlFor="nombre">
              Nombre
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}
              id="nombre"
              name="nombre"
              type="text"
              placeholder="Nombre"
              value={formData.nombre}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className={`block text-sm font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-700'}`} htmlFor="apellido">
              Apellido
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}
              id="apellido"
              name="apellido"
              type="text"
              placeholder="Apellido"
              value={formData.apellido}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="carrera" className={`block text-sm font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-700'}`}>Carrera</label>
            <select
              id="carrera"
              name="carrera"
              value={formData.carrera}
              onChange={handleChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}
            >
              <option value="">Selecciona una carrera</option>
              <option value="Quimica">Quimica</option>
              <option value="Data Science">Data Science</option>
              <option value="Ingenieria Civil">Ingenieria Civil</option>
              <option value="Ingenieria Ambiental">Ingenieria Ambiental</option>
              <option value="CS">CS</option>
              <option value="Ingenieria Mecatronica">Ingenieria Mecatronica</option>
              {/* Agrega más opciones según sea necesario */}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="ciclo" className={`block text-sm font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-700'}`}>Ciclo</label>
            <select
              id="ciclo"
              name="ciclo"
              value={formData.ciclo}
              onChange={handleChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}
            >
              <option value="">Selecciona ciclo</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              {/* Agrega más opciones según sea necesario */}
            </select>
          </div>
          <div className="flex items-center justify-between">
            <button
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-600' : ''}`}
              type="submit"
            >
              Registrarse
            </button>
            <Link
              to="/login"
              className={`inline-block align-baseline font-bold text-sm ${darkMode ? 'text-white' : 'text-blue-500'} hover:text-blue-800`}
            >
              Regresar al login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
