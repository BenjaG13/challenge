import React, { useContext, useState } from 'react';
import axios from 'axios';
import Error from '../components/Error';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/appContext';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const {setToken} = useContext(AppContext)
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/V1/login', {
        email: email,
        password: password
      });
      const token = response.data.accesstoken
      setToken(token)
      navigate(-1)
    } catch (err) {
      console.error(err)
      setError(err.response.data.message);
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
      {error && <Error msg={error}/>}
    </div>
    </>
  );
};

export default LoginForm;
