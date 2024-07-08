import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Login.css'; 
import Register from './Register';
import logo from '../assets/logo.png';
import googleLogo from '../assets/google.png'; 
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin === "http://127.0.0.1:5000/") {
        const userId = event.data.usuario_id;
        if (userId) {
          navigate('/dashboard', { state: { userId } });
        }
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [navigate]);

  const toggleView = () => {
    setIsLogin(!isLogin);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError("");
  };

  const handleGoogleLogin = () => {
    const width = 500;
    const height = 600;
    const left = (window.innerWidth / 2) - (width / 2);
    const top = (window.innerHeight / 2) - (height / 2);

    const authWindow = window.open(
      'http://127.0.0.1:5000/login-google', 
      'GoogleAuth',
      `width=${width},height=${height},top=${top},left=${left}`
    );

    const timer = setInterval(() => {
      if (authWindow.closed) {
        clearInterval(timer);
        setError("Autenticación de Google cancelada o ventana cerrada.");
      }
    }, 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = formData;

    if (!username || !password) {
      setError("Por favor, rellena todos los campos.");
      return;
    }

    fetch('http://127.0.0.1:5000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 401) {
          setError("Usuario o contraseña incorrecta.");
          throw new Error('Bad Request');
        } else {
          setError("Error inesperado. Por favor, inténtalo de nuevo.");
          throw new Error('Unhandled status code: ' + response.status);
        }
      })
      .then(data => {
        const userId = data.usuario_id;
        navigate('/dashboard', { state: { userId } });
      })
      .catch(error => { console.error('Error:', error); });
  };

  return (
    <div className="login-container">
      <div className="logo-section">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
        <p className="slogan">"Compartir para Aprender"</p>
      </div>
      <div className="login-section">
        <div className="tab-container">
          <button className={`tab ${isLogin ? 'active' : ''}`} onClick={toggleView}>
            Log in
          </button>
          <button className={`tab ${!isLogin ? 'active' : ''}`} onClick={toggleView}>
            Sign up
          </button>
        </div>
        <div className="login-form">
          {isLogin ? (
            <>
              <button className="google-button" onClick={handleGoogleLogin}>
                <img src={googleLogo} alt="Google logo" className="google-logo" />
                Iniciar sesión con Google
              </button>
              <div className="separator">
                <hr />
                <span>OR</span>
                <hr />
              </div>
              <input type="text" name="username" placeholder="Username" className="input-field" onChange={handleChange} />
              <input type="password" name="password" placeholder="Password" className="input-field" onChange={handleChange} />
              {error && <p className="error-message">{error}</p>}
              <button className="login-button" onClick={handleSubmit}>Log in</button>
            </>
          ) : (
            <Register />
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
