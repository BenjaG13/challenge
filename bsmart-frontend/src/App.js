import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductDetail from './pages/ProductDetail';
import Register from './pages/Register';
import Login from './pages/Login';

import 'bootstrap/dist/css/bootstrap.min.css';
import CategoryList from "./pages/CategoryList";
import ProductList from "./pages/Dashboard";
import { AppProvider } from "./context/appContext";


function App() {
  return (
    <div>
      <AppProvider>
        <Router>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/categories" element={<CategoryList />} />
          </Routes>
        </Router>
        </AppProvider>
    </div>
  );
}

export default App;
