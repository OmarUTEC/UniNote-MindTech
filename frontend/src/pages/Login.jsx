import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useTheme from "../theme";
import { Link } from "react-router-dom";

const Login = () => {  
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: ""
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
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    fetch('http://127.0.0.1:5000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 400) {
          navigate('/');
          throw new Error('Bad Request');
        } else {
          throw new Error('Unhandled status code: ' + response.status);
        }
      })
      .then(data => {
        const userId = data.usuario_id;
        navigate('/dashboard', { state: { userId } });
      })
      .catch(error => { console.error('Error:', error); });
  };

  return (  
    <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-cach-l2 text-black'}`}>
      <div className={`shadow-md rounded px-8 pt-6 pb-8 mb-4 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h1 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-black'}`}>Iniciar sesión</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className={`block text-sm font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-700'}`} htmlFor="username">Usuario </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}
              id="username"
              name="username"
              type="text"
              placeholder="Usuario"
              onChange={handleChange} />
          </div>

          <div className="mb-6 relative">
            <label className={`block text-sm font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-700'}`} htmlFor="password">Contraseña</label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}
              id="password"
              name="password"
              type="password"
              placeholder="******************"
              onChange={handleChange}/>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`h-6 w-6 ${darkMode ? "text-white" : "text-gray-600"}`} >
                <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd" />
              </svg>
            </div>
            <p className={`text-red-500 text-xs italic ${darkMode ? 'text-white' : 'text-red-500'}`}>Por favor ingrese su contraseña.</p>
          </div>

          <div className="flex flex-col space-y-2">
            <a href="http://127.0.0.1:5000/login-google" className="w-full">
              <button 
                className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-600' : ''}`}
                type="button">
                Iniciar sesión con Google
              </button>
            </a>

            <button
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-600' : ''}`}
              type="submit"
            >Iniciar sesión</button>
            
            <button className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-600' : ''}`} type="button">
              <Link to="/register" className={`inline-block align-baseline font-bold ${darkMode ? 'text-white' : 'text-white'}`} >Registrarse</Link>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default Login;