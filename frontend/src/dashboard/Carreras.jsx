import React, { useState, useEffect } from 'react';
import useTheme from "../theme";

// Importa todas las imágenes necesarias
import AdminNegociosDigitales from "../assets/images_carreras/admin_negocios_digitales.jpg";
import Bioingenieria from "../assets/images_carreras/bioingenieria.jpg";
import ComputerScience from "../assets/images_carreras/cs.jpg";

import CienciaDatos from "../assets/images_carreras/ciencia_datos.jpg";
import IngenieriaAmbiental from "../assets/images_carreras/ingenieria_ambiental.jpg";
import IngenieriaCivil from "../assets/images_carreras/ingenieria_civil.jpg";

import IngenieriaEnergia from "../assets/images_carreras/ingenieria_energia.jpg";
import IngenieriaElectronica from "../assets/images_carreras/ingenieria_electronica.jpg";
import IngenieriaIndustrial from "../assets/images_carreras/IngenieriaIndustrial.jpg";

import IngenieriaMecanica from "../assets/images_carreras/IngenieriaMecanica.jpg";
import IngenieriaMecatronica from "../assets/images_carreras/ingenieria_mecatronica.jpeg";
import IngenieriaQuimica from "../assets/images_carreras/ingenieria_quimica.jpeg";

const Carreras = ({ setCareerId, handleClick }) => {
  const { darkMode } = useTheme();
  const [careerList, setCareerList] = useState([]);

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const response = await fetch(`http://34.239.210.249:5000/carreras`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCareerList(data);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };
    fetchCareers();
  }, []);

  const handleTabClick = (id) => {
    setCareerId(id);
    handleClick();
  };

  const careerImages = {
    'Administración y Negocios Digitales': AdminNegociosDigitales,
    'Bioingeniería': Bioingenieria,
    'Ciencia de la Computación': ComputerScience,
    'Ciencia de Datos': CienciaDatos,
    'Ingeniería Ambiental': IngenieriaAmbiental,
    'Ingeniería Civil': IngenieriaCivil,
    'Ingeniería de la Energía': IngenieriaEnergia,
    'Ingeniería Electrónica': IngenieriaElectronica,
    'Ingeniería Industrial': IngenieriaIndustrial,
    'Ingeniería Mecánica': IngenieriaMecanica,
    'Ingeniería Mecatrónica': IngenieriaMecatronica,
    'Ingeniería Química': IngenieriaQuimica,
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <div className="ml-4 p-6 flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {careerList.map((career, index) => (
            <button
              key={index} onClick={() => handleTabClick(career.careerId)}
              className={`relative block rounded-lg overflow-hidden shadow-lg transform transition-transform hover:scale-105 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
            >
              <img src={careerImages[career.careerName]} alt={career.careerName} className="w-4/6 h-70 object-cover mx-auto" />
              <div className={`absolute bottom-0 left-0 w-full p-2 text-center ${darkMode ? 'bg-gray-800 bg-opacity-75 text-white' : 'bg-white bg-opacity-75 text-black'}`}>
                <p className="font-semibold">{career.careerName}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Carreras;
