import LandingPage from '../pages/LandingPage';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Inicio from '../dashboard/Inicio';
import Biblioteca from '../dashboard/Biblioteca';
import Carreras from '../dashboard/Carreras';
import Upload from '../dashboard/Upload';
import UploadFile from '../dashboard/UploadFile';
import Network from '../dashboard/Network';
import Dashboard from '../dashboard/Dashboard';

// Importar componentes individuales para cada carrera
import ComputerScience from '../dashboard/FilesCarrera/ComputerScience';


const root = [
  {
    path: '/',
    Element: LandingPage
  },
  {
    path: '/login',
    Element: Login
  },
  {
    path: '/register',
    Element: Register
  },
  {
    path: '/inicio',
    Element: Inicio
  },
  {
    path: '/biblioteca',
    Element: Biblioteca 
  },
  {
    path: '/carreras',
    Element: Carreras
  },
  {
    path: '/carreras/cs',
    Element: ComputerScience
  },
  {
    path: '/upload',
    Element: Upload
  },
  {
    path: '/upload-file',
    Element: UploadFile
  },
  {
    path: '/perfil',
    Element: Network
  },
  {
    path: '/dashboard',
    Element: Dashboard
  }
];

export default root;
