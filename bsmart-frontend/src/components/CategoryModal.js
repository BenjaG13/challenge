import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const CategoryModal = ({ show, handleClose, category, refreshCategories, setSuccess, setError, isEdit }) => {
  const [name, setName] = useState(category ? category.name : '');
  const [description, setDescription] = useState(category ? category.name : '');


  useEffect(() => {
    if (category) {
      setName(category.name);
      setDescription(category.description);
    } else {
      setName('');
      setDescription('');
    }
  }, [category]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
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
      setError('Error al guardar la categoría');
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{isEdit ? 'Editar Categoría' : 'Crear Nueva Categoría'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formCategoryName">
            <Form.Label>Nombre de la Categoría</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
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
