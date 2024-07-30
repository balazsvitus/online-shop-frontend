import './App.css';
import Products from './features/products/pages/Products';
import ProductDetails from './features/products/pages/ProductDetails';
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import ShoppingCart from './features/shoppingCart/pages/ShoppingCart';
import AddProduct from './features/products/pages/AddProduct';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/products" replace={true} />} />
        <Route path="/products" element={<Products />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
