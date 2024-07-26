import { ShoppingCartItemType } from '../../../types/ShoppingCart';
import { Stock } from '../../../types/Stock';
import styles from '../styles/shopping-cart.module.css';

type ShoppingCartItemProps = {
  shoppingCartItem: ShoppingCartItemType;
  removeFromShoppingCart: (product: Stock) => void;
};

export default function ShoppingCartItem({
  shoppingCartItem,
  removeFromShoppingCart,
}: ShoppingCartItemProps) {
  const handleDelete = (product: Stock) => {
    removeFromShoppingCart(product);
  };

  return (
    <tr>
      <td>{shoppingCartItem.product.product.category.name}</td>
      <td>{shoppingCartItem.product.product.name}</td>
      <td>{shoppingCartItem.product.product.price}</td>
      <td>{shoppingCartItem.quantity}</td>
      <td
        className={`${styles.rowDeleteButton}`}
        onClick={() => handleDelete(shoppingCartItem.product)}
      >
        {'X'}
      </td>
    </tr>
  );
}
