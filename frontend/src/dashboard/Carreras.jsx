import React, { useState, useEffect } from 'react';
import useTheme from "../theme";
// import { Link } from "react-router-dom";

// Importar las imágenes
import ComputerScience from "../assets/images_carreras/cs.jpg";
// import electronica from "../assets/images_carreras/electronica.jpg";
// import mecatronica from "../assets/images_carreras/mecatronica.jpg";
// import civil from "../assets/images_carreras/civil.jpg";
// import telecomunicaciones from "../assets/userstudent.jpeg";
// import malware from "../assets/userstudent.jpeg";

const Carreras = ({setCareerId, handleClick}) => {
  const { darkMode } = useTheme();
  const [careerList, setCareerList] = useState([]);

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/carreras`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCareerList(data);
      } catch (error) { console.error('There was a problem with the fetch operation:', error); }
    };
    fetchCareers();
  }, []);

  const handleTabClick = (id) => {
    setCareerId(id);
    handleClick();
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {careerList.map((career, index) => (
          <button
            key={index} onClick={() => handleTabClick(career.careerId)}
            className={`relative block rounded-lg overflow-hidden shadow-lg transform transition-transform hover:scale-105 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
          >
            <img src={ComputerScience} alt={"CS"} className="w-4/6 h-70 object-cover mx-auto" />
            <div className={`absolute bottom-0 left-0 w-full p-2 text-center ${darkMode ? 'bg-gray-800 bg-opacity-75 text-white' : 'bg-white bg-opacity-75 text-black'}`}>
              <p className="font-semibold">{career.careerName}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Carreras;
