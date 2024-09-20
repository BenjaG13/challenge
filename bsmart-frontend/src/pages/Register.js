import React, { useContext, useState } from 'react';
import axios from 'axios';
import Error from '../components/Error';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';


import { AppContext } from '../context/appContext';

const RegisterForm = () => {
  const {setToken} = useContext(AppContext)
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/V1/register', {
        name: username,
        email: email,
        password: password
      });
      const token = response.data.acces_token
      setToken(token)
      navigate('/')
    } catch (err) {
      console.error(err.response.data.errors);
      const firstKey = Object.keys(err.response.data.errors)[0];
      setError(err.response.data.errors[firstKey]);
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
      {error && <Error msg={error}/>}
    </div>
    </>
  );
};

export default RegisterForm;
