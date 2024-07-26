import { Location } from './Location';
import { ProductDetailType } from './ProductDetail';

export type Stock = {
  product: ProductDetailType;
  location: Location;
  quantity: number;
};
