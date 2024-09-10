// import React, { useState } from 'react';
// import { Modal, Button, Form } from 'react-bootstrap';

// const RegisterModal = ({ show, handleClose }) => {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Aquí podrías manejar el registro, por ejemplo, llamando a una API
//     console.log('Usuario:', username);
//     console.log('Email:', email);
//     console.log('Contraseña:', password);

//     // Limpiar el formulario y cerrar el modal después del registro
//     setUsername('');
//     setEmail('');
//     setPassword('');
//     handleClose();
//   };

//   return (
//     <Modal show={show} onHide={handleClose}>
//       <Modal.Header closeButton>
//         <Modal.Title>Register</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form onSubmit={handleSubmit}>
//           <Form.Group controlId="formUsername">
//             <Form.Label>Username</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//             />
//           </Form.Group>

//           <Form.Group controlId="formEmail">
//             <Form.Label>Email address</Form.Label>
//             <Form.Control
//               type="email"
//               placeholder="Enter email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </Form.Group>

//           <Form.Group controlId="formPassword">
//             <Form.Label>Password</Form.Label>
//             <Form.Control
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </Form.Group>

//           <Button variant="primary" type="submit">
//             Register
//           </Button>
//         </Form>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={handleClose}>
//           Close
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default RegisterModal;
