import React, { useContext, useState, useEffect } from 'react';
import { Table, Button, Pagination, Form } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Success from '../components/Success';
import Error from '../components/Error';
import Navbar from '../components/Navbar';
import ProductModal from '../components/ProductModal';
import PieChart from '../components/Chart';
import axios from 'axios';
import { AppContext } from '../context/appContext';


const ProductList = () => {
  const {state: { token }} = useContext(AppContext)
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [perPage, setPerPage] = useState(10);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showModal, setShowModal] = useState(false); 
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEdit, setIsEdit] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();


  const getProductsData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/V1/products', {
        params: {
          page,
          sort_by: sortBy,
          sort_order: sortOrder,
          per_page: perPage,
        },
      });
      setProducts(response.data.data);
      setTotalPages(response.data.meta.last_page);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (productId, productName) => {
    if (window.confirm(`¿Seguro que quieres eliminar el producto ${productName}?`)) {
      try {
        await axios.delete(`http://localhost:8000/api/V1/products/${productId}`, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        // Actualizar la lista de productos después de la eliminación
        setProducts(products.filter((product) => product.id !== productId));
        setSuccess(`El producto ${productName} fue eliminado exitosamente`);
        setError('');
      } catch (err) {
        console.error('Error al eliminar el producto', err);
        setError('Ha ocurrido un error');
        setSuccess('')
      }
    }
  };

  const handleCreate = (product) => {
    setIsEdit(false)
    setSelectedProduct(product); 
    setShowModal(true); 
  };
  
  const handleEdit = (product) => {
    setIsEdit(true)
    setSelectedProduct(product); 
    setShowModal(true); 
  }
  const handleCloseModal = () => {
    setShowModal(false); 
    setSelectedProduct(null); 
  };

  useEffect(() => {
    const { successState } = location.state || {};
    if (successState){
      setSuccess(successState)
    }
  }, [] );

  useEffect(() => {
    getProductsData();
  }, [page, sortBy, sortOrder, perPage]);


  const getPaginationItems = () => {
    const visiblePages = 10;
    const startPage = Math.max(1, page - Math.floor(visiblePages / 2));
    const endPage = Math.min(totalPages, startPage + visiblePages - 1);

    const items = [];
    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <Pagination.Item key={i} active={i === page} onClick={() => setPage(i)}>
          {i}
        </Pagination.Item>
      );
    }
    return items;
  };


  return (
    <div>
      <Navbar />
      <PieChart  updateChart={products}/>
      {success && <Success msg={success} />}
      {error && <Error msg={error} />}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="mx-auto">Productos</h1>
        {token && 
          <Button className="ml-3" variant="primary" onClick={handleCreate}>
           Crear Nuevo Producto
          </Button>
        }
          <Button className="ml-3" variant="secondary" onClick={() => navigate("/categories")}>
             Categorías
          </Button>
      
      </div>

      <Form.Group controlId="sortOrder">
        <Form.Label className="fs-4">Filtros</Form.Label>
        <div className="row">
          <div className="col-md-3">
            <Form.Control as="select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="name">Nombre</option>
              <option value="price">Precio</option>
            </Form.Control>
          </div>
          <div className="col-md-3">
            <Form.Control as="select" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
              <option value="asc">Ascendente</option>
              <option value="desc">Descendente</option>
            </Form.Control>
          </div>
        </div>
      </Form.Group>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Categoria</th>
            {token && <th>Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {console.log(products)}
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <Link to={`/products/${product.id}`}>{product.name}</Link>
              </td>
              <td>{product.price}</td>
              <td>{product.category.name}</td> 
              {token && 
                <td>
                  <Button variant="primary" onClick={() => handleEdit(product)}>Editar</Button>{' '}
                  <Button variant="danger" onClick={() => handleDelete(product.id, product.name)}>Eliminar</Button>
                </td>
              }
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination>
        <Pagination.Prev onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} />
        {getPaginationItems()}
        <Pagination.Next onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages} />
      </Pagination>

      <Form.Group controlId="perPage">
        <Form.Label className="fs-5">Items por pagina</Form.Label>
        <Form.Control className="fs-5" as="select" value={perPage} onChange={(e) => setPerPage(e.target.value)}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </Form.Control>
      </Form.Group>
        <ProductModal
          show={showModal}
          handleClose={handleCloseModal}
          product={selectedProduct}
          refreshProducts={getProductsData} 
          setSuccess={setSuccess} 
          setError={setError} 
          isEdit={isEdit}
         />
    </div>
  );
};

export default ProductList;
