import { useContext } from 'react';
import ShoppingCartContext from '../contexts/ShoppingCartContext';

export default function useShoppingCart() {
  const context = useContext(ShoppingCartContext);

  if (!context) {
    throw new Error(
      'You can only use the shopping cart context inside a context provider!',
    );
  }

  return context;
}
