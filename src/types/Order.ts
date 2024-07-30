export type OrderDetailsInDto = {
  shippedFrom: string;
  productId: string;
  quantity: number;
};

export type OrderDTO = {
  customer: string;
  createdAt: Date;
  country: string;
  city: string;
  county: string;
  streetAddress: string;
  orderDetails: OrderDetailsInDto[];
};
