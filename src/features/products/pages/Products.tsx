import { useNavigate } from 'react-router-dom';
import ProductsTableItem from '../components/ProductsTableItem';
import useProducts from '../hooks/useProducts';
import styles from '../styles/Products.module.css';

export default function Products() {
  const { products, productsLoading } = useProducts();
  const navigate = useNavigate();

  const handleNavigateCart = () => {
    navigate('/cart');
  };

  return (
    <div className="center-table-container">
      <div className="table-container">
        <div className="top-row">
          <h1>Products</h1>
          <div className={`${styles.topRowButtons}`}>
            <button onClick={handleNavigateCart}>CART</button>
            <button>ADD</button>
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
