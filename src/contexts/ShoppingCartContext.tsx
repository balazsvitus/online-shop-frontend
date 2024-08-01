import { createContext, useEffect, useMemo, useState } from 'react';
import { ShoppingCartItemType } from '../types/ShoppingCart';
import { ProductDetailType } from '../types/ProductDetail';
import { LOCALSTORAGE_CART } from '../lib/constants';
import { toast } from 'react-toastify';

type ShoppingCartContextType = {
  shoppingCart: ShoppingCartItemType[];
  addToShoppingCart: (product: ProductDetailType, location: string) => void;
  removeFromShoppingCart: (
    product: ProductDetailType,
    location: string,
  ) => void;
  emptyShoppingCart: () => void;
  modifyShoppingCartItemLocation: (
    product: ProductDetailType,
    oldLocation: string,
    newLocation: string,
  ) => void;
};

const ShoppingCartContext = createContext({} as ShoppingCartContextType);

type ShoppingCartProviderProps = {
  children: React.ReactNode;
};

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [shoppingCart, setShoppingCart] = useState<ShoppingCartItemType[]>([]);

  const modifyShoppingCartItemLocation = (
    product: ProductDetailType,
    oldLocation: string,
    newLocation: string,
  ) => {
    const tempCart = [...shoppingCart];
    const tempCartItem = tempCart.find(
      (t) => t.product.id === product.id && t.location === oldLocation,
    );
    if (tempCartItem) {
      tempCartItem.location = newLocation;
      setShoppingCart(tempCart);
      localStorage.setItem(LOCALSTORAGE_CART, JSON.stringify(tempCart));
      toast.success(
        `${product.name} Successfully modified the location of the shopping cart item!`,
      );
    } else {
      toast.success(
        `${product.name} successfully modified the location of the shopping cart item!`,
      );
    }
  };

  const addToShoppingCart = (product: ProductDetailType, location: string) => {
    const tempCart = [...shoppingCart];
    const tempCartItem = tempCart.find(
      (t) => t.product.id === product.id && t.location === location,
    );
    if (tempCartItem) {
      tempCartItem.quantity += 1;
    } else {
      tempCart.push({
        product,
        location,
        quantity: 1,
      });
    }
    setShoppingCart(tempCart);
    localStorage.setItem(LOCALSTORAGE_CART, JSON.stringify(tempCart));
    toast.success(`${product.name} successfully added to the shopping cart!`);
  };

  const removeFromShoppingCart = (
    product: ProductDetailType,
    location: string,
  ) => {
    if (shoppingCart.length === 0) return;

    const tempCart = [...shoppingCart];
    const tempCartItem = tempCart.find(
      (t) => t.product.id === product.id && t.location === location,
    );
    if (tempCartItem) {
      if (tempCartItem.quantity > 1) {
        tempCartItem.quantity -= 1;
      } else {
        const index = tempCart.indexOf(tempCartItem);
        tempCart.splice(index, 1);
      }
      setShoppingCart(tempCart);
      localStorage.setItem(LOCALSTORAGE_CART, JSON.stringify(tempCart));
      toast.success(
        `${product.name} successfully removed from the shopping cart!`,
      );
    }
  };

  const emptyShoppingCart = () => {
    setShoppingCart([]);
    localStorage.setItem(LOCALSTORAGE_CART, JSON.stringify([]));
  };

  useEffect(() => {
    const cartFromStorage = localStorage.getItem(LOCALSTORAGE_CART);
    if (cartFromStorage) {
      const cart = JSON.parse(cartFromStorage);
      if (cart) {
        setShoppingCart(cart);
      }
    }
  }, []);

  const value = useMemo(
    () => ({
      shoppingCart,
      addToShoppingCart,
      removeFromShoppingCart,
      emptyShoppingCart,
      modifyShoppingCartItemLocation,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [shoppingCart],
  );

  return (
    <ShoppingCartContext.Provider value={value}>
      {children}
    </ShoppingCartContext.Provider>
  );
}

export default ShoppingCartContext;
