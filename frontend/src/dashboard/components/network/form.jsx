import React, { useState, useEffect } from 'react';
import useTheme from "../../../theme";

import right_arrow from '../icons/right_arrow.jpg';
import perfil from '../icons/unlike.jpg'

const UpdateUserData = ({ userId,  handleClick }) => {
  const { darkMode } = useTheme();
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/usuarios/${userId}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setFormData({
            nombres: data.name,
            apellidos: data.surname,
            carrera: data.idCareer,
            username: data.username,
            ciclo: data.cycle,
            email: data.email
          });
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };
    fetchDocuments();
  }, [userId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = JSON.stringify(formData);
    fetch(`http://127.0.0.1:5000//usuarios/${userId}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: data
    })
    .then(response => { response.json() })
    .then(data => {
      console.log('Success:', data);
      handleClick();
    })
    .catch(error => { console.error('Error:', error); });
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-cach-l2 text-black'}`}>
    <div className={`w-full h-screen justify-center flex items-center`}>
    <div className={`w-3/5 h-3/5 justify-center flex-col items-center rounded-3xl overflow-hidden bg-white border-2 border-black`}>
          
      <div className={`w-full h-1/6 p-4 flex justify-end items-center`}>
        <button onClick={handleClick} className={`w-16 h-full flex justify-center items-center`}>
          <img src={right_arrow} alt="Right Arrow" className={`w-full h-12`} />
        </button>
      </div>
          
      <form onSubmit={handleSubmit} className='w-full h-5/6 flex flex-col lg:flex-row items-center justify-center p-6'>
            
        <div className="w-full lg:w-2/5 flex flex-col items-center justify-center gap-4">
          <img src={perfil} alt="Profile" className='profile-image w-60 h-60 rounded-full object-cover border-4 border-black' />
          <button type="submit" className="w-3/5 h-16 bg-yellow-500"> <p>ACTUALIZAR PERFIL</p> </button>
        </div>
            
        <div className='w-full lg:w-3/5 h-full flex flex-col gap-8'>
            
          <div className='flex items-center'>
            <div className="w-1/5 bg-gray-700 text-white rounded-full flex items-center justify-center px-4 py-2 mr-4">
            <p className="text-lg font-semibold">Nombre</p>
            </div>
            <div className="bg-gray-200 text-black rounded-full flex-grow px-4 py-2">
            <input
                type="text"
                id="nombres"
                name="nombres"
                value={formData.nombres}
                onChange={handleChange}
                required
                className="shadow appearance-none border border-blue-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            </div>
          </div>

          <div className='flex items-center'>
            <div className="w-1/5 bg-gray-700 text-white rounded-full flex items-center justify-center px-4 py-2 mr-4">
            <p className="text-lg font-semibold">Apellido</p>
            </div>
            <div className="bg-gray-200 text-black rounded-full flex-grow px-4 py-2">
            <input
                type="text"
                id="apellidos"
                name="apellidos"
                value={formData.apellidos}
                onChange={handleChange}
                required
                className="shadow appearance-none border border-blue-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            </div>
          </div>

          <div className='flex items-center'>
            <div className="w-1/5 bg-gray-700 text-white rounded-full flex items-center justify-center px-4 py-2 mr-4">
            <p className="text-lg font-semibold">Carrera</p>
            </div>
            <div className="bg-gray-200 text-black rounded-full flex-grow px-4 py-2">
            <select
                id="carrera"
                name="carrera"
                onChange={handleChange}
                value={formData.carrera}
                required
                className="shadow appearance-none border border-blue-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
                <option value="1">Administración y Negocios Digitales</option>
                <option value="2">Bioingeniería</option>
                <option value="3">Ciencia de la Computación</option>
                <option value="4">Ciencia de Datos</option>
                <option value="5">Ingeniería Ambiental</option>
                <option value="6">Ingeniería Civil</option>
                <option value="7">Ingeniería de la Energía</option>
                <option value="8">Ingeniería Electrónica</option>
                <option value="9">Ingeniería Industrial</option>
                <option value="10">Ingeniería Mecánica</option>
                <option value="11">Ingeniería Mecatrónica</option>
                <option value="12">Ingeniería Química</option>
            </select>
            </div>
          </div>
        
          <div className='w-full flex items-center'>
            <div className="w-1/5 bg-gray-700 text-white rounded-full flex items-center justify-center px-4 py-2 mr-4">
            <p className="text-lg font-semibold">Usuario</p>
            </div>
            <div className="w-2/5 bg-gray-200 text-black rounded-full px-4 py-2 mr-4">
            <input
                type="text"
                id="username"
                name="username"
                onChange={handleChange}
                value={formData.username}
                required
                className="shadow appearance-none border border-blue-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            </div>
            
            <div className="w-1/5 bg-gray-700 text-white rounded-full flex items-center justify-center px-4 py-2 mr-4">
            <p className="text-lg font-semibold">Ciclo</p>
            </div>
            <div className="w-1/6 bg-gray-200 text-black rounded-full flex items-center justify-center px-4 py-2">
            <input
                type="text"
                id="ciclo"
                name="ciclo"
                onChange={handleChange}
                value={formData.ciclo}
                required
                className="shadow appearance-none border border-blue-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            </div>
          </div>

          <div className='flex items-center'>
            <div className="w-1/5 bg-gray-700 text-white rounded-full flex items-center justify-center px-4 py-2 mr-4">
            <p className="text-lg font-semibold">Email</p>
            </div>
            <div className="bg-gray-200 text-black rounded-full w-4/5 px-4 py-2">
            <input
                type="text"
                id="email"
                name="email"
                onChange={handleChange}
                value={formData.email}
                required
                className="shadow appearance-none border border-blue-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            </div>
          </div>
        </div>
      </form>
    </div>
    </div>
    </div>
  );
};

export default UpdateUserData;