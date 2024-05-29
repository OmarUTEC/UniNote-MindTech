import React from 'react';
import useTheme from "../theme";

import right_arrow from '../assets/right_arrow.jpg';
import upload_file from '../assets/upload_file.png';


const UploadFile = ({ handleUploadClick }) => {
  const { darkMode } = useTheme();
  return (
    <div className={`min-h-screen flex  items-center justify-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-cach-l2 text-black'}`}>
      
      <div className={`w-full h-screen justify-center flex items-center`}>
        
      <div className={`w-3/5 h-3/5 justify-center flex-col items-center rounded-3xl overflow-hidden bg-white border border-black`} >
        
        <div className={`w-full h-1/8 p-4 flex justify-end items-center`}>
          <button onClick={handleUploadClick} className={`w-16 h-full flex justify-center items-center`}>
            <img src={right_arrow} alt="Right Arrow" className={`w-full h-12`} />
          </button>
        </div>

        <div className={`w-full h-7/8`}>
          <form className={`w-full h-full justify-center flex flex-row items-center`}>
            <div className={`w-3/4 h-full justify-center flex flex-col gap-6 p-8`}>
              <div class="mb-1"> <input type="text" id="title" name="title" required placeholder="TITULO" class="shadow appearance-none border border-blue-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/> </div>
              <div class="mb-1"> <input type="text" id="careerName"   name="careerName"   required placeholder="CARRERA" class="shadow appearance-none border border-blue-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/> </div>
              <div class="mb-1"> <input type="text" id="courseName"   name="courseName"   required placeholder="CURSO" class="shadow appearance-none border border-blue-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/> </div>
              <div class="mb-1"> <input type="text" id="courseNumber" name="courseNumber" required placeholder="CICLO" class="shadow appearance-none border border-blue-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/> </div>
              <div class="mb-1"> <input type="text" id="description"  name="description"  required placeholder="DESCRIPCIÓN (MINIMO 5 PALABRAS)" class="shadow appearance-none border border-blue-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/> </div>
              <div class="mb-1">
                <input type="file" id="pdf-upload" name="pdf-upload" accept=".pdf" required class="shadow appearance-none border border-blue-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                <label for="pdf-upload" class="block text-gray-700 text-sm font-bold mb-2">El archivo debe ser PDF</label>
              </div>
            </div>
            <div className={`w-1/4 h-full justify-center flex items-center flex-col`}>
              <button type="submit" className="w-full h-full flex flex-col items-center gap-4 p-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                <img src={upload_file} alt="Upload File" className={`w-3/4 h-3/4`}/>
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