import { Link } from 'react-router-dom';
import ProductsTableItem from '../components/ProductsTableItem';
import useProducts from '../hooks/useProducts';
import { useEffect } from 'react';
import '../styles/Products.module.css';
import useAuthContext from '../../../hooks/useAuthContext';

export default function Products() {
  const { fetchProducts, products, productsLoading } = useProducts();
  const { authData } = useAuthContext();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="center-table-container">
      <div className="table-container">
        <div className="top-row">
          <h1>Products</h1>
          <div className="top-row-buttons">
            <Link to="/cart">
              <button className="top-row-button">CART</button>
            </Link>
            <Link to="/add-product">
              <button disabled={authData.role !== 'admin'}>ADD</button>
            </Link>
          </div>
        </div>
        {productsLoading || products.length === 0 ? (
          <p>Loading products...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th scope="col">Category</th>
                <th scope="col">Product Name</th>
                <th scope="col">Price</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <ProductsTableItem key={product.id} product={product} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
