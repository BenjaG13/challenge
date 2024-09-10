import React, { useState } from 'react';
import axios from 'axios';
import Success from '../components/Success';
import Error from '../components/Error';
import Navbar from '../components/Navbar';


const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Realizar la petición POST al endpoint de registro
      const response = await axios.post('http://localhost:8000/api/V1/login', {
        email: email,
        password: password
      });
      // Guardar el token de acceso en el local storage 
      console.log(response.data.accesstoken)
      localStorage.setItem('token', response.data.accesstoken);

       // Limpiar el formulario después del registro exitoso
      setEmail('');
      setPassword('');
      setSuccess('Login exitoso');
      setError('');
    } catch (err) {
      console.error()
      setError('Ha ocurrido un error');
      setSuccess('');
      }
  };

  return (
    <>
     <Navbar />
    <div className="container mb-5">
      <h2 className="text-center mt-5 mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="row d-flex justify-content-center">
          <div className="col-md-6">
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
              placeholder="password"
              className="form-control text-center mt-3"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary mt-4">
              Ingresar
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

export default LoginForm;
