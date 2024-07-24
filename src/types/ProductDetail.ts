export type ProductCategoryType = {
  id: string;
  name: string;
  description: string;
};

export type ProductDetailType = {
  id: string;
  name: string;
  description: string;
  price: number;
  weight: number;
  supplier: string;
  imageUrl: string;
  category: ProductCategoryType;
};
