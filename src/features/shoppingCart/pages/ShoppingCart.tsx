import { useNavigate } from 'react-router-dom';
import styles from '../styles/shopping-cart.module.css';
import useShoppingCartContext from '../../../hooks/useShoppingCartContext';
import ShoppingCartItem from '../components/ShoppingCartItem';
import { ChangeEvent, useState } from 'react';
import { createOrderDetails } from '../services/shopping-cart';
import useShoppingCart from '../hooks/useShoppingCart';

export default function ShoppingCart() {
  const navigate = useNavigate();
  const [shippedFrom, setShippedFrom] = useState<string>(
    '485229c8-732e-4b0b-bdea-19c249a70b70',
  );
  const { shoppingCart, removeFromShoppingCart, emptyShoppingCart } =
    useShoppingCartContext();
  const { checkout, checkoutLoading } = useShoppingCart();

  const handleBack = () => {
    navigate('/');
  };

  const handleCheckout = () => {
    const order = createOrderDetails(shoppingCart, shippedFrom);
    checkout(order, emptyShoppingCart);
  };

  const handleLocationChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setShippedFrom(event.target.value);
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
            <button
              disabled={shoppingCart.length === 0 || checkoutLoading}
              onClick={handleCheckout}
            >
              CHECKOUT
            </button>
          </div>
        </div>
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
                key={shoppingCartItem.product.id}
                shoppingCartItem={shoppingCartItem}
                removeFromShoppingCart={removeFromShoppingCart}
              />
            ))}
          </tbody>
        </table>
        <h4
          hidden={shoppingCart.length > 0}
          style={{
            marginTop: 0,
            border: '2px solid black',
            borderTop: 0,
            padding: '20px 5px 20px 5px',
            textAlign: 'center',
          }}
        >
          There are no items in your shopping cart!
        </h4>
        <select
          className={styles.locationSelect}
          value={shippedFrom}
          onChange={handleLocationChange}
        >
          <option value="485229c8-732e-4b0b-bdea-19c249a70b70">
            Vivo Cluj-Napoca
          </option>
          <option value="819056fc-ca67-4cbf-9dd3-f3765d4c8719">
            Kaufland Targu Secuiesc
          </option>
        </select>
      </div>
    </div>
  );
}
