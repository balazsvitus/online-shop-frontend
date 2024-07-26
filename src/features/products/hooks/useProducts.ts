import { AxiosError } from 'axios';
import { useEffect, useRef, useState } from 'react';
import useAxiosInstance from '../../../hooks/useAxiosInstance';
import { Stock } from '../../../types/Stock';

export default function useProducts() {
  const axiosInstance = useAxiosInstance();

  const [products, setProducts] = useState<Stock[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);

  const hasFetchedProducts = useRef(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setProductsLoading(true);
      try {
        const stocks = await axiosInstance.get<Stock[]>('/stocks');
        setProducts(stocks.data);
      } catch (error) {
        setProducts([]);
        const axiosError = error as AxiosError;
        throw new Error(axiosError.message);
      } finally {
        setProductsLoading(false);
      }
    };

    if (!hasFetchedProducts.current) {
      fetchProducts();
      hasFetchedProducts.current = true;
    }
  }, [axiosInstance, setProducts, setProductsLoading]);

  return { products, productsLoading };
}
