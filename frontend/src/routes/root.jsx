import LandingPage from '../pages/LandingPage';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Inicio from '../dashboard/Inicio';
import Library from '../dashboard/Library';
import Carreras from '../dashboard/Carreras';
import Upload from '../dashboard/Upload';
import UploadFile from '../dashboard/components/upload/form';
import Network from '../dashboard/Network';
import UpdateUserData from '../dashboard/components/network/form';
import Dashboard from '../dashboard/Dashboard';
import Followers from '../dashboard/components/network/followers';
import Following from '../dashboard/components/network/following';

const root = [{
    path: '/',
    Element: LandingPage
  }, {
    path: '/login',
    Element: Login
  }, {
    path: '/register',
    Element: Register
  }, {
    path: '/inicio',
    Element: Inicio
  }, {
    path: '/biblioteca',
    Element: Library
  }, {
    path: '/career',
    Element: Carreras
  }, {
    path: '/career/library',
    Element: Library
  }, {
    path: '/upload',
    Element: Upload
  }, {
    path: '/upload/file_upload',
    Element: UploadFile
  }, {
    path: '/network',
    Element: Network
  }, {
    path: '/network/user_data_update',
    Element: UpdateUserData
  },
  {
    path: '/network/followers/:userId',
    Element: Followers
  },
  {
    path: '/network/following/:userId',
    Element: Following
  },
   {
    path: '/dashboard',
    Element: Dashboard
}];

export default root;
