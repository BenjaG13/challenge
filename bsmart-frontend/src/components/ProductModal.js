import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Error from '../components/Error';
import axios from 'axios';


const ProductModal = ({ show, handleClose, product, refreshProducts, setSuccess, isEdit }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [code, setCode] = useState('');
  const [categories, setCategories] = useState([])
  const [error, setError] = useState('');


  useEffect(() => {
    if (show) {
      setError('');  
    }
  }, [show]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/V1/categories'); 
        setCategories(response.data.data); 
      } catch (err) {
        console.error('Error al obtener categorías', err);
      }
    };
    fetchCategories();
  }, []);

  // rellenar el formulario si el producto existe (en modo de edición)
  useEffect(() => {
    if (product) {
      setName(product.name || '');
      setPrice(product.price || '');
      setCategory(product.category?.id || '');
      setDescription(product.description || '');
      setCode(product.code || '');
    }
  }, [product]);

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    try {
      const productData = { name, price, category_id: category, description, code };

      if (isEdit && product?.id) {
        // Actualizar producto si estamos en modo edición
        await axios.patch(`http://localhost:8000/api/V1/products/${product.id}`, productData, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        refreshProducts();
        setSuccess('Producto actualizado exitosamente');
        handleClose();
      } else {
        // Crear un nuevo producto si no estamos en modo edición
        await axios.post(`http://localhost:8000/api/V1/products`, productData, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        setSuccess('Producto creado exitosamente');
        refreshProducts();
      }
      handleClose(); // Cerrar el modal
    } catch (error) {
      console.error(error);
      const firstKey = Object.keys(error.response.data.errors)[0];
      setError(error.response.data.errors[firstKey]);
      setSuccess('')
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{isEdit ? 'Actualizar Producto' : 'Crear Producto'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Error msg={error}/>}
        <Form>
          <Form.Group controlId="productName">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="productPrice">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="productCategory">
            <Form.Label>Categoria</Form.Label>
            <Form.Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Selecciona una categoría</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="productDescription">
            <Form.Label>Descripcion</Form.Label>
            <Form.Control
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="productCode">
            <Form.Label>Codigo</Form.Label>
            <Form.Control
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleSave}>
          {isEdit ? 'Actualizar' : 'Crear'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductModal;
