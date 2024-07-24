import './App.css';
import Products from './features/products/pages/Products';
import ProductDetails from './features/products/pages/ProductDetails';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Redirect from './components/Redirect';
import ShoppingCart from './features/shoppingCart/pages/ShoppingCart';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Redirect to="/products" />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="*" element={<Redirect to="/products" />} />
      </Routes>
    </Router>
  );
}

export default App;
