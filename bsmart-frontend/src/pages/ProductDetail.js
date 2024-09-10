import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import Success from '../components/Success';
import Error from '../components/Error';
import ProductModal from '../components/ProductModal';


const ProductDetail = () => {
  const { id } = useParams(); // Obtener el ID del producto desde la URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showModal, setShowModal] = useState(false); 
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEdit, setIsEdit] = useState(null);
  const navigate = useNavigate(); 

  
  const fetchProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/V1/products/${id}`);
      setProduct(response.data.data);
      setLoading(false); 
    } catch (error) {
      console.error('Error al obtener el producto:', error);
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleEdit = (product) => {
    setIsEdit(true)
    setSelectedProduct(product); 
    setShowModal(true); 
  };

  const handleCreate = (product) => {
    setIsEdit(false)
    setSelectedProduct(product); 
    setShowModal(true); 
  };

  const handleCloseModal = () => {
    setShowModal(false); 
    setSelectedProduct(null); 
  };

  const refresh = (product) => {
    console.log(product)
    navigate('/', { replace: true }); // Navegar a la página raíz
    setTimeout(() => {
    navigate(`/products/${id}`, { replace: true }); // Redirigir nuevamente a la URL actual
  }, 0); // Pue
  }

  const handleDelete = async () => {
    if (window.confirm(`¿Seguro que quieres eliminar el producto ${product.name}?`)) {
      try {
        const token = localStorage.getItem('token'); 
        await axios.delete(`http://localhost:8000/api/V1/products/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        navigate('/'); // Redirigir a la lista de productos después de eliminar
      } catch (err) {
        console.error('Error al eliminar el producto', err);
        setError('Ha ocurrido un error al eliminar el producto');
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>No se pudo cargar el producto</div>;
  }

  return (
    <>
      <Navbar />
      {success && <Success msg={success} />}
      {error && <Error msg={error} />}
      <Container className="my-5">
      <Button variant="primary" onClick={handleCreate}>Crear Nuevo Producto</Button>
        <Row className="justify-content-center">
          <Col md={6}>
            <Card>
              <Card.Header>
                <h2>{product.name}</h2>
              </Card.Header>
              <Card.Body>
                <Card.Text>
                  <strong>Precio:</strong> ${product.price}
                </Card.Text>
                <Card.Text>
                  <strong>Descripcion:</strong> {product.description}
                </Card.Text>
                <Card.Text>
                  <strong>Codigo:</strong> {product.code}
                </Card.Text>
                <Card.Text>
                  <strong>Categoria:</strong> {product.category.name}
                </Card.Text>
                <div className="d-flex justify-content-between">
                  <Button variant="primary" onClick={() => handleEdit(product)}>
                    Editar
                  </Button>
                  <Button variant="danger" onClick={handleDelete}>
                    Eliminar
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <ProductModal
          show={showModal}
          handleClose={handleCloseModal}
          product={selectedProduct}
          refreshProducts={refresh} // funcion para refrescar los productos
          setSuccess={setSuccess} 
          setError={setError} 
          isEdit={isEdit}
        />
    </>
  );
};

export default ProductDetail;
