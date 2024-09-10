import React, { useState, useEffect } from 'react';
import { Table, Button, Pagination, Form } from 'react-bootstrap';
import axios from 'axios';
import CategoryModal from '../components/CategoryModal';
import Success from '../components/Success';
import Error from '../components/Error';
import Navbar from '../components/Navbar';


const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isEdit, setIsEdit] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const getCategoriesData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/V1/categories', {
        params: {
          page,
        },
      });
      setCategories(response.data.data);
      setTotalPages(response.data.meta.last_page);
    } catch (error) {
      setError('Error al cargar las categorías');
    }
  };

  const handleCreate = () => {
    setIsEdit(false);
    setSelectedCategory(null);
    setShowModal(true);
  };

  const handleEdit = (category) => {
    setIsEdit(true);
    setSelectedCategory(category);
    setShowModal(true);
  };

  const handleDelete = async (categoryId, categoryName) => {
    if (window.confirm(`¿Seguro que quieres eliminar la categoría ${categoryName}?`)) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:8000/api/V1/categories/${categoryId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSuccess(`La categoría ${categoryName} ha sido eliminada`);
        setError('');
        setCategories(categories.filter((category) => category.id !== categoryId));
      } catch (err) {
        setError('Error al eliminar la categoría');
        setSuccess('')
      }
    }
  };

  useEffect(() => {
    getCategoriesData();
  }, [page]);

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
        <Navbar/>
      {success && <Success msg={success} />}
      {error && <Error msg={error} />}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="mx-auto">Categorías</h1>
        <Button variant="primary" onClick={handleCreate}>Crear Nueva Categoría</Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.name}</td>
              <td>{category.description}</td>
              <td>
                <Button variant="primary" onClick={() => handleEdit(category)}>Editar</Button>{' '}
                <Button variant="danger" onClick={() => handleDelete(category.id, category.name)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination>
        <Pagination.Prev onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} />
        {getPaginationItems()}
        <Pagination.Next onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages} />
      </Pagination>

      <CategoryModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        category={selectedCategory}
        refreshCategories={getCategoriesData}
        setSuccess={setSuccess}
        setError={setError}
        isEdit={isEdit}
      />
    </div>
  );
};

export default CategoryList;
