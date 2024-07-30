import { ProductDetailType } from '../../../types/ProductDetail';
import { ShoppingCartItemType } from '../../../types/ShoppingCart';
import styles from '../styles/ShoppingCart.module.css';

type ShoppingCartItemProps = {
  shoppingCartItem: ShoppingCartItemType;
  removeFromShoppingCart: (product: ProductDetailType) => void;
};

export default function ShoppingCartItem({
  shoppingCartItem,
  removeFromShoppingCart,
}: ShoppingCartItemProps) {
  const handleDelete = (product: ProductDetailType) => {
    removeFromShoppingCart(product);
  };

  return (
    <tr>
      <td>{shoppingCartItem.product.category.name}</td>
      <td>{shoppingCartItem.product.name}</td>
      <td>{shoppingCartItem.product.price}</td>
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
