import React, { useState } from 'react';
import useTheme from "../theme";

import right_arrow from '../assets/right_arrow.jpg';
import upload_file from '../assets/upload_file.png';

const UploadFile = ({ userId,  handleUploadClick }) => {
  const { darkMode } = useTheme();
  const [formData, setFormData] = useState({
    userId: userId,
    titulo: "",
    carrera: "",
    curso: "",
    ciclo: "",
    descripcion: ""
  });
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    if (file) {
      data.append('file', file);
    }

    fetch('http://127.0.0.1:5000/upload_file', {
      method: 'POST',
      body: data,
    })
      .then(response => {
        response.json()
      })
      .catch(error => { console.error('Error:', error); });
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-cach-l2 text-black'}`}>
      <div className={`w-full h-screen justify-center flex items-center`}>
        <div className={`w-3/5 h-3/5 justify-center flex-col items-center rounded-3xl overflow-hidden bg-white border border-black`}>
          <div className={`w-full h-1/8 p-4 flex justify-end items-center`}>
            <button onClick={handleUploadClick} className={`w-16 h-full flex justify-center items-center`}>
              <img src={right_arrow} alt="Right Arrow" className={`w-full h-12`} />
            </button>
          </div>

          <div className={`w-full h-7/8`}>
            <form onSubmit={handleSubmit} className={`w-full h-full justify-center flex flex-row items-center`} encType="multipart/form-data">
              <div className={`w-3/4 h-full justify-center flex flex-col gap-6 p-8`}>
                <div className="mb-1">
                  <input
                    type="text"
                    id="titulo"
                    name="titulo"
                    required
                    placeholder="TITULO"
                    className="shadow appearance-none border border-blue-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-1">
                  <select
                    id="carrera"
                    name="carrera"
                    required
                    className="shadow appearance-none border border-blue-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    onChange={handleChange}
                  >
                    <option value="">Selecciona una carrera</option>
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
                <div className="mb-1">
                  <input
                    type="text"
                    id="curso"
                    name="curso"
                    required
                    placeholder="CURSO"
                    className="shadow appearance-none border border-blue-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-1">
                  <input
                    type="text"
                    id="ciclo"
                    name="ciclo"
                    required
                    placeholder="CICLO"
                    className="shadow appearance-none border border-blue-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-1">
                  <input
                    type="text"
                    id="descripcion"
                    name="descripcion"
                    required
                    placeholder="DESCRIPCIÓN (MINIMO 5 PALABRAS)"
                    className="shadow appearance-none border border-blue-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-1">
                  <input
                    type="file"
                    id="file"
                    name="file"
                    accept=".pdf"
                    required
                    className="shadow appearance-none border border-blue-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="file" className="block text-gray-700 text-sm font-bold mb-2">
                    El archivo debe ser PDF
                  </label>
                </div>
              </div>
              <div className={`w-1/4 h-full justify-center flex items-center flex-col`}>
                <button type="submit" className="w-full h-full flex flex-col items-center gap-4 p-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  <img src={upload_file} alt="Upload File" className={`w-3/4 h-3/4`} />
                  <p className={`w-full h-1/4 font-bold`}>UPLOAD FILE</p>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadFile;


