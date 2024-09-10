import React, { useState } from 'react';
import axios from 'axios';
import Success from '../components/Success';
import Error from '../components/Error';
import Navbar from '../components/Navbar';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Realizar la petición POST al endpoint de registro
      const response = await axios.post('http://localhost:8000/api/V1/register', {
        name: username,
        email: email,
        password: password
      });
      // Guardar el token de acceso en el local storage si es necesario
      localStorage.setItem('token', response.data.access_token);

       // Limpiar el formulario después del registro exitoso
      setUsername('');
      setEmail('');
      setPassword('');
      setSuccess('Register exitoso');
      setError('');
    } catch (err) {
      // Manejar errores (como validaciones fallidas)
      console.error()
      setError('A ocurrido un error');
      setSuccess('');
      }
  };

  return (
    <>
    <Navbar />
    <div className="container mb-5">
      <h2 className="text-center mt-5 mb-4">Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="row d-flex justify-content-center">
          <div className="col-md-6">
            <input
              type="text"
              id="formUsername"
              value={username}
              placeholder="username"
              className="form-control text-center"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="email"
              id="formEmail"
              value={email}
              placeholder="email"
              className="form-control text-center mt-3"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              id="formPassword"
              value={password}
              placeholder="Password"
              className="form-control text-center mt-3"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary mt-4">
              Registrarme
            </button>
          </div>
        </div>
      </form>
      {success && <Success msg={success}/>}
      {error && <Error msg={error}/>}
    </div>
    </>
  );
};

export default RegisterForm;
