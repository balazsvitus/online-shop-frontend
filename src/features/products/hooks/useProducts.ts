import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import useAxiosInstance from '../../../hooks/useAxiosInstance';
import { ProductDetailType } from '../../../types/ProductDetail';

export default function useProducts() {
  const axiosInstance = useAxiosInstance();

  const [products, setProducts] = useState<ProductDetailType[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);

  useEffect(() => {
    setProductsLoading(true);
    const response = axiosInstance.get<ProductDetailType[]>(`/products`);
    response
      .then((resp) => {
        setProducts(resp.data);
      })
      .catch((error) => {
        const axiosError = error as AxiosError;
        throw new Error(axiosError.message);
      })
      .finally(() => {
        setProductsLoading(false);
      });
  }, [axiosInstance]);

  return { products, productsLoading };
}
