import { Link } from 'react-router-dom';
import useTheme from '../theme';
import { darkTheme, lightTheme } from '../theme';
import logo from '../assets/logo.png';
import userstudent from '../assets/userstudent.jpeg';
import meta1 from '../assets/meta1.png';
import meta2 from '../assets/meta2.png';
import meta3 from '../assets/meta3.png';

const LandingPage = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const theme = darkMode ? darkTheme : lightTheme;

  const metas = [
    {
      title: 'Meta 1',
      description: 'Fomentar una mayor participación y colaboración entre estudiantes en el proceso de aprendizaje a través del uso de la plataforma.',
      image: meta1,
    },
    {
      title: 'Meta 2',
      description: ' Ayudar a los estudiantes a obtener una comprensión más profunda de los cursos superiores, incluyendo su metodología, dificultad y contenido, para una mejor preparación académica.',
      image: meta2,
    },
    {
      title: 'Meta 3',
      description: 'Crear una cultura de colaboración y compartición de conocimientos entre los estudiantes, promoviendo la reciprocidad y el apoyo mutuo.',
      image: meta3,
    },
  ];
  const handleMetasClick = () => {
    const metasSection = document.getElementById('metas');
    metasSection.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <div className={`min-h-screen ${theme.backgroundColor}`}>
      
      <header className={`${theme.navColor} ${theme.navShadow}`}>
        
        <div className="container mx-auto py-2 px-8 flex justify-between items-center">
          
          <div className="flex items-center">
            <img src={logo} alt="UniNote" className="h-12" />
            <span className={`ml-2 text-lg font-bold ${theme.navTextColor}`}>UniNote</span>
          </div>

          <nav className="flex items-center">
            <Link to="/" className={`ml-2 mr-4 text-lg font-bold ${theme.navTextColor}`}>
              Inicio
            </Link>
            <a
              href="#metas"
              className={`ml-2 mr-4 text-lg font-bold ${theme.navTextColor}`}
              onClick={handleMetasClick}
            >
              Metas
            </a>
            <Link to="/login" className={`ml-2 text-lg font-bold ${theme.navTextColor}`}>
              Iniciar sesión
            </Link>
            <button
              onClick={toggleDarkMode}
              className={`ml-2 px-4 py-2 rounded-md ${
                darkMode ? 'text-white bg-transparent' : 'text-blue-500 '
              }`}
            >
              {darkMode ? (
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"
                  />
                </svg>
              ) : (
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/>
                </svg>
              )}
            </button>
          </nav>
        </div>
      </header>
    <main className="container mx-auto py-8 px-8 flex flex-col md:flex-row items-center">
    <div className="w-full md:w-1/2 pr-4 mb-8 md:mb-0">
      <h1 className={`text-5xl font-bold mb-4 ${theme.textColor}`}>"COMPARTIR PARA APRENDER"</h1>
      <h2 className={`text-3xl font-semibold mb-2 ${theme.textColor}`}>Te ofrecemos publicar y descubrir papers y apuntes de guía académica</h2>
      <p className={`text-3xl mb-4 ${theme.textColor}`}>Una plataforma dirigida a los estudiantes que quieren aprender y compartir sus aprendizajes</p>
    </div>
    <div className="w-full md:w-1/2 relative">
      <div className={`absolute top-0 left-0 w-full h-full ${darkMode ? 'bg-gradient-to-r from-gray-900' : 'bg-gradient-to-r from-cach-l2'}`}></div>
      <img src={userstudent} alt="Usuario estudiante" className="rounded-lg shadow-md w-full" />
    </div>
  </main>
  <section id="metas" className="container mx-auto py-8 px-8">
    <h2 className={`text-4xl font-bold mb-8 ${theme.textColor}`}>Nuestras Metas</h2>
    <div className="flex flex-wrap justify-center">
      {metas.map((meta, index) => (
        <div key={index} className={`w-full md:w-1/4 p-4`}>
          <div className={`rounded-lg shadow-md p-4 ${darkMode ? 'bg-black-800' : 'bg-gray-100'}`}>
            <div className="flex items-center mb-2">
              <h3 className={`text-lg font-bold ${theme.textColor}`}>{meta.title}</h3>
            </div>
            <img src={meta.image} alt={meta.title} className="mb-2 w-full h-32 object-cover" />
            <p className={`text-sm ${theme.textColor}`}>{meta.description}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
</div>
);
};

export default LandingPage;
