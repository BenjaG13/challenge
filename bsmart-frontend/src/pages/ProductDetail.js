import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import Success from '../components/Success';
import Error from '../components/Error';
import ProductModal from '../components/ProductModal';
import { AppContext } from '../context/appContext';


const ProductDetail = () => {
  const {state: { token }} = useContext(AppContext)
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
    fetchProduct(product)
  }

  const handleDelete = async () => {
    if (window.confirm(`¿Seguro que quieres eliminar el producto ${product.name}?`)) {
      try {
        await axios.delete(`http://localhost:8000/api/V1/products/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        navigate('/', { state: { successState: `el producto ${product.name} fue eliminado exitosamente` } }); // Redirigir a la lista de productos después de eliminar
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
      {token && 
          <Button variant="primary" onClick={handleCreate}>Crear Nuevo Producto</Button>
      }
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
                {token && 
                <>
                  <Button variant="primary" onClick={() => handleEdit(product)}>
                    Editar
                  </Button>
                  <Button variant="danger" onClick={handleDelete}>
                    Eliminar
                  </Button>
                </>
                }
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
          isEdit={isEdit}
        />
    </>
  );
};

export default ProductDetail;
