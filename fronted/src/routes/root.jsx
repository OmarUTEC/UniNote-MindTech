import LandingPage from '../pages/LandingPage';
import Login from '../pages/Login';
import Register from '../pages/Register';

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
  }
];

export default root;
