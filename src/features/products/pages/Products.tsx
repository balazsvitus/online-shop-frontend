import { Link } from 'react-router-dom';
import ProductsTableItem from '../components/ProductsTableItem';
import '../styles/Products.module.css';
import useAuthContext from '../../../hooks/useAuthContext';
import { useGetProductsQuery } from '../api/productApiSlice';

export default function Products() {
  const { authData } = useAuthContext();

  const { data, isLoading } = useGetProductsQuery();

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
        {isLoading || !data ? (
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
              {data.map((product) => (
                <ProductsTableItem key={product.id} product={product} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
