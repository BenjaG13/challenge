import React ,{ useContext }from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { useNavigate ,Link } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../context/appContext';


const AppNavbar = () => {
  const navigate = useNavigate();
  const {state: { token }} = useContext(AppContext)


  const handleLogout = async () => {
    if (window.confirm('¿Seguro que quieres cerrar sesion?')) {
      try {
        await axios.post('http://localhost:8000/api/V1/logout', {}, {
          headers: {
            Authorization: `Bearer ${token}` // Pasar el token en los headers
          }
        });
        localStorage.removeItem('token'); // Eliminar el token del localStorage
        navigate(0)
      } catch (error) {
        console.error('Error al cerrar sesión', error);
        alert("Error al cerrar sesión")
      }
    }
  };

        return (
          <Navbar bg="light" expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link className="fs-4" as={Link} to="/">
                  Home
                </Nav.Link>
              </Nav>
              <Nav className="ms-auto">
                {!token &&
                <>
                  <Nav.Link as={Link} to="/login">
                    <Button variant="outline-primary">Login</Button>
                  </Nav.Link>
                  <Nav.Link as={Link} to="/register">
                    <Button variant="primary">Register</Button>
                  </Nav.Link>
                </>
                }
                {console.log(localStorage.getItem('token'))}    
                {console.log(token)}    
                {token &&
                  <Nav.Link onClick={handleLogout}>
                    <Button variant="danger">Logout</Button>
                  </Nav.Link>
                }
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        );
};

export default AppNavbar;
