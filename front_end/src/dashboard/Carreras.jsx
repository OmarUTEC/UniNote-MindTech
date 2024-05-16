import React from "react";
import useTheme from "../theme";
import { Link } from "react-router-dom";

const Carreras = () => {

    const { darkMode } = useTheme();
    
    return (
        <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-cach-l2 text-black'}`}>
        <div className={`shadow-md rounded px-8 pt-6 pb-8 mb-4 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h1 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-black'}`}>Carreras</h1>
            <div className="grid grid-cols-2 gap-4">
            <Link to="/carreras/1" className="block bg-white shadow-md rounded-lg p-4">
                <h2 className="text-xl font-bold">Ingeniería de Sistemas</h2>
                <p className="text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, quos?</p>
            </Link>
            <Link to="/carreras/2" className="block bg-white shadow-md rounded-lg p-4">
                <h2 className="text-xl font-bold">Ingeniería de Software</h2>
                <p className="text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, quos?</p>
            </Link>
            <Link to="/carreras/3" className="block bg-white shadow-md rounded-lg p-4">
                <h2 className="text-xl font-bold">Ingeniería de Redes</h2>
                <p className="text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, quos?</p>
            </Link>
            <Link to="/carreras/4" className="block bg-white shadow-md rounded-lg p-4">
                <h2 className="text-xl font-bold">Ingeniería de Hardware</h2>
                <p className="text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, quos?</p>
            </Link>
            </div>
        </div>
        </div>
    );
}

export default Carreras;