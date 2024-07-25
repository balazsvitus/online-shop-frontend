import { useNavigate } from 'react-router-dom';
import styles from '../styles/shoppingCart.module.css';
import useShoppingCart from '../../../hooks/useShoppingCart';
import ShoppingCartItem from '../components/ShoppingCartItem';

export default function ShoppingCart() {
  const navigate = useNavigate();
  const loading = false;
  const { shoppingCart, removeFromShoppingCart } = useShoppingCart();

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className={`${styles.centerShoppingCartContainer}`}>
      <div className={`${styles.shoppingCartContainer}`}>
        <div className={`${styles.topRow}`}>
          <h1>Shopping cart</h1>
          <div className={`${styles.topRowButtons}`}>
            <button className={styles.backButton} onClick={handleBack}>
              BACK
            </button>
            <button>CHECKOUT</button>
          </div>
        </div>
        {loading ? (
          <p>Loading products...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th scope="col">Category</th>
                <th scope="col">Product Name</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {shoppingCart.map((shoppingCartItem) => (
                <ShoppingCartItem
                  shoppingCartItem={shoppingCartItem}
                  removeFromShoppingCart={removeFromShoppingCart}
                  key={shoppingCartItem.product.id}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
