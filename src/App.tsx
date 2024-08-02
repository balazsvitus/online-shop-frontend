import './App.css';
import 'react-toastify/dist/ReactToastify.css';
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
import NotFound from './features/not-found/pages/NotFound';
import EditProduct from './features/products/pages/EditProduct';
import ProtectedLayout from './layouts/ProtectedLayout';
import Login from './features/login/pages/Login';
import useAuthContext from './hooks/useAuthContext';
import { CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material';
import { darkTheme, lightTheme } from './lib/theme';
import { ToastContainer } from 'react-toastify';
import AuthHandler from './components/AuthHandler';
import CategoryChart from './features/chart/pages/CategoryChart';

function App() {
  const { authLoading } = useAuthContext();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  if (authLoading) return <h1>Loading...</h1>;

  return (
    <>
      <ToastContainer
        theme={prefersDarkMode ? 'dark' : 'light'}
        autoClose={2000}
        position="bottom-right"
        closeButton={true}
      />
      <ThemeProvider theme={prefersDarkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        <Router>
          <AuthHandler />
          <Routes>
            <Route
              path="/"
              element={<Navigate to="/products" replace={true} />}
            />
            <Route element={<ProtectedLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/products" element={<Products />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/charts" element={<CategoryChart />} />
              <Route
                path="/edit-product/:productId"
                element={<EditProduct />}
              />
              <Route path="/products/:productId" element={<ProductDetails />} />
              <Route path="/cart" element={<ShoppingCart />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
