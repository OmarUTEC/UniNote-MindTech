import React from "react";
import useTheme from "../theme";
import { Link } from "react-router-dom";

// Importar las imágenes
import ComputerScience from "../assets/images_carreras/cs.jpg";
import electronica from "../assets/images_carreras/electronica.jpg";
import mecatronica from "../assets/images_carreras/mecatronica.jpg";
import civil from "../assets/images_carreras/civil.jpg";
import telecomunicaciones from "../assets/userstudent.jpeg";
import malware from "../assets/userstudent.jpeg";

const Carreras = () => {
  const { darkMode } = useTheme();

  const carreras = [
    { id: 1, name: "Computer Science", image: ComputerScience, path: "cs" },
    { id: 2, name: "Ingeniería en Electrónica", image: electronica, path: "electronica" },
    { id: 3, name: "Ingeniería en Mecatrónica", image: mecatronica, path: "mecatronica" },
    { id: 4, name: "Ingeniería Civil", image: civil, path: "informatica" },
    { id: 5, name: "Ingeniería en Telecomunicaciones", image: telecomunicaciones, path: "telecomunicaciones" },
    { id: 6, name: "Seguridad Informática", image: malware, path: "seguridadinformatica" },
  ];

  return (
    <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {carreras.map((carrera) => (
          <Link
            key={carrera.id}
            to={`/carreras/${carrera.path}`}
            className={`relative block rounded-lg overflow-hidden shadow-lg transform transition-transform hover:scale-105 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
          >
            <img src={carrera.image} alt={carrera.name} className="w-4/6 h-70 object-cover mx-auto" />
            <div className={`absolute bottom-0 left-0 w-full p-2 text-center ${darkMode ? 'bg-gray-800 bg-opacity-75 text-white' : 'bg-white bg-opacity-75 text-black'}`}>
              <p className="font-semibold">{carrera.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Carreras;
