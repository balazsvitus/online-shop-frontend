import { createContext, useState } from 'react';
import { ShoppingCartItemType } from '../types/ShoppingCart';
import { Stock } from '../types/Stock';

type ShoppingCartContextType = {
  shoppingCart: ShoppingCartItemType[];
  addToShoppingCart: (stock: Stock) => void;
  removeFromShoppingCart: (stock: Stock) => void;
};

const ShoppingCartContext = createContext({} as ShoppingCartContextType);

type ShoppingCartProviderProps = {
  children: React.ReactNode;
};

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [shoppingCart, setShoppingCart] = useState<ShoppingCartItemType[]>([]);

  const addToShoppingCart = (stock: Stock) => {
    const tempCart = shoppingCart;
    const tempCartItem = tempCart.find(
      (t) =>
        t.product.product.id === stock.product.id &&
        t.product.location.id === stock.location.id,
    );
    if (tempCartItem) {
      tempCartItem.quantity += 1;
    } else {
      tempCart.push({
        product: stock,
        quantity: 1,
      });
    }
    setShoppingCart(tempCart);
    alert(`${stock.product.name} successfully added to the shopping cart!`);
  };

  const removeFromShoppingCart = (stock: Stock) => {
    if (shoppingCart.length === 0) return;

    const tempCart = shoppingCart;
    const tempCartItem = tempCart.find(
      (t) =>
        t.product.product.id === stock.product.id &&
        t.product.location.id === stock.location.id,
    );
    if (tempCartItem) {
      if (tempCartItem.quantity > 1) {
        tempCartItem.quantity -= 1;
      } else {
        const index = tempCart.indexOf(tempCartItem);
        tempCart.splice(index, 1);
      }
      setShoppingCart(tempCart);
      alert(
        `${stock.product.name} successfully removed from the shopping cart!`,
      );
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
