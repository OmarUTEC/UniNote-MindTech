import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    nombres: "",
    apellidos: "",
    carrera: "",
    ciclo: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password, nombres, apellidos, carrera, ciclo } = formData;

    if (!username || !email || !password || !nombres || !apellidos || !carrera || !ciclo) {
      setError("Por favor, rellena todos los campos.");
      return;
    }

    fetch('http://127.0.0.1:5000/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (response.status === 200) {
        alert("Usuario registrado correctamente")
        navigate('/login');
      }
      else if(response.status === 401){
        setError("El correo ingresado ya existe, por favor escoja otro.")
      } 
      else if(response.status === 402){
        setError("El nombre de usuario ya existe, por favor escoja otro.")
      } 
      else {
        setError("Error al registrarse. Por favor, inténtalo de nuevo.");
      }
    })
    .catch(error => {
      console.error('Error:', error);
      setError("Error al registrarse. Por favor, inténtalo de nuevo.");
    });
  };

  return (
    <div className="register-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username"></label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Usuario"
            value={formData.username}
            onChange={handleChange}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email"></label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Correo"
            value={formData.email}
            onChange={handleChange}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password"></label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="nombres"></label>
          <input
            id="nombres"
            name="nombres"
            type="text"
            placeholder="Nombres"
            value={formData.nombres}
            onChange={handleChange}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="apellidos"></label>
          <input
            id="apellidos"
            name="apellidos"
            type="text"
            placeholder="Apellidos"
            value={formData.apellidos}
            onChange={handleChange}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="carrera"></label>
          <select
            id="carrera"
            name="carrera"
            value={formData.carrera}
            onChange={handleChange}
            className="input-field"
          >
            <option value="">Selecciona una carrera</option>
            <option value="1">Administración y Negocios Digitales</option>
            <option value="2">Bioingeniería</option>
            <option value="3">Ciencia de la Computación</option>
            <option value="4">Ciencia de Datos</option>
            <option value="5">Ingeniería Ambiental</option>
            <option value="6">Ingeniería Civil</option>
            <option value="7">Ingeniería de la Energía</option>
            <option value="8">Ingeniería Electrónica</option>
            <option value="9">Ingeniería Industrial</option>
            <option value="10">Ingeniería Mecánica</option>
            <option value="11">Ingeniería Mecatrónica</option>
            <option value="12">Ingeniería Química</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="ciclo"></label>
          <select
            id="ciclo"
            name="ciclo"
            value={formData.ciclo}
            onChange={handleChange}
            className="input-field"
          >
            <option value="">Selecciona ciclo</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>
        {error && <p className="error-message">{error}</p>}
        <div className="form-actions">
          <button type="submit" className="login-button">Registrarse</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
