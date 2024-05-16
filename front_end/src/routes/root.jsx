import LandingPage from '../pages/LandingPage';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Inicio from '../dashboard/Inicio';
import Biblioteca from '../dashboard/Biblioteca';
import Carreras from '../dashboard/Carreras';
import Upload from '../dashboard/Upload';
import Network from '../dashboard/Network';
import Dashboard from '../dashboard/Dashboard';

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
    path: '/upload',
    Element: Upload
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
