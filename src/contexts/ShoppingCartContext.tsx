import { createContext, useState } from 'react';
import { ShoppingCartItemType } from '../types/ShoppingCart';
import { ProductDetailType } from '../types/ProductDetail';

type ShoppingCartContextType = {
  shoppingCart: ShoppingCartItemType[];
  addToShoppingCart: (product: ProductDetailType) => void;
  removeFromShoppingCart: (product: ProductDetailType) => void;
  emptyShoppingCart: () => void;
};

const ShoppingCartContext = createContext({} as ShoppingCartContextType);

type ShoppingCartProviderProps = {
  children: React.ReactNode;
};

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [shoppingCart, setShoppingCart] = useState<ShoppingCartItemType[]>([]);

  const addToShoppingCart = (product: ProductDetailType) => {
    const tempCart = [...shoppingCart];
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
    if (shoppingCart.length === 0) return;

    const tempCart = [...shoppingCart];
    const tempCartItem = tempCart.find((t) => t.product.id === product.id);
    if (tempCartItem) {
      if (tempCartItem.quantity > 1) {
        tempCartItem.quantity -= 1;
      } else {
        const index = tempCart.indexOf(tempCartItem);
        tempCart.splice(index, 1);
      }
      setShoppingCart(tempCart);
      alert(`${product.name} successfully removed from the shopping cart!`);
    }
  };

  const emptyShoppingCart = () => {
    setShoppingCart([]);
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        shoppingCart,
        addToShoppingCart,
        removeFromShoppingCart,
        emptyShoppingCart,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}

export default ShoppingCartContext;
