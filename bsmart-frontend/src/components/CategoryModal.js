import React, { useContext, useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Error from '../components/Error';
import axios from 'axios';

import { AppContext } from '../context/appContext';


const CategoryModal = ({ show, handleClose, category, refreshCategories, setSuccess, isEdit }) => {
  const {state: { token }} = useContext(AppContext)
  const [name, setName] = useState(category ? category.name : '');
  const [description, setDescription] = useState(category ? category.name : '');
  const [error, setError] = useState('');

  useEffect(() => {
    if (show) {
      setError('');  
    }
  }, [show]);


  useEffect(() => {
    if (category) {
      setName(category.name);
      setDescription(category.description);
    } else {
      setName('');
      setDescription('');
    }
    setError('')
  }, [category]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      if (isEdit) {
        await axios.put(`http://localhost:8000/api/V1/categories/${category.id}`, { name, description }, config);
        setSuccess(`Categoría ${name} actualizada exitosamente`);
      } else {
        await axios.post('http://localhost:8000/api/V1/categories', { name, description }, config);
        setSuccess(`Categoría ${name} creada exitosamente`);
      }
      refreshCategories();
      handleClose();
    } catch (error) {
      console.error(error);
      const firstKey = Object.keys(error.response.data.errors)[0];
      setError(error.response.data.errors[firstKey]);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{isEdit ? 'Editar Categoría' : 'Crear Nueva Categoría'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      {error && <Error msg={error}/>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formCategoryName">
            <Form.Label>Nombre de la Categoría</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              // required
            />
          </Form.Group>
          <Form.Group controlId="formCategoryDescription">
            <Form.Label>descripcion de la Categoría</Form.Label>
            <Form.Control
              type="text"
              placeholder="Descripcion"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            {isEdit ? 'Actualizar' : 'Crear'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CategoryModal;
