import { createContext, useState } from 'react';
import { ProductDetailType } from '../types/ProductDetail';
import { ShoppingCartItemType } from '../types/ShoppingCart';

type ShoppingCartContextType = {
  shoppingCart: ShoppingCartItemType[];
  addToShoppingCart: (product: ProductDetailType) => void;
  removeFromShoppingCart: (product: ProductDetailType) => void;
};

const ShoppingCartContext = createContext({} as ShoppingCartContextType);

type ShoppingCartProviderProps = {
  children: React.ReactNode;
};

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [shoppingCart, setShoppingCart] = useState<ShoppingCartItemType[]>([]);

  const addToShoppingCart = (product: ProductDetailType) => {
    const tempCart = shoppingCart;
    const tempCartItem = tempCart.find((t) => t.product.id === product.id);
    if (tempCartItem) {
      tempCartItem.quantity += 1;
    } else {
      tempCart.push({
        product,
        quantity: 1,
      });
    }
    setShoppingCart(tempCart);
    alert(`${product.name} successfully added to the shopping cart!`);
  };

  const removeFromShoppingCart = (product: ProductDetailType) => {
    const tempCart = shoppingCart;
    const tempCartItem = tempCart.find((t) => t.product.id === product.id);
    if (tempCartItem) {
      if (tempCartItem.quantity > 1) {
        tempCartItem.quantity -= 1;
      } else {
        delete tempCart[tempCart.indexOf(tempCartItem!)];
      }
      setShoppingCart(tempCart);
      alert(`${product.name} successfully removed from the shopping cart!`);
    }
  };

  return (
    <ShoppingCartContext.Provider
      value={{ shoppingCart, addToShoppingCart, removeFromShoppingCart }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}

export default ShoppingCartContext;
