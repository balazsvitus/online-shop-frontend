import { ProductDetailType } from './ProductDetail';

export type ShoppingCartLocation = {
  id: string;
  name: string;
};

export type ShoppingCartItemType = {
  product: ProductDetailType;
  location: string;
  quantity: number;
};
