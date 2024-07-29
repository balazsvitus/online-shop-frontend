import { AxiosError } from 'axios';
import { useEffect, useRef, useState } from 'react';
import useAxiosInstance from '../../../hooks/useAxiosInstance';
import { ProductDetailType } from '../../../types/ProductDetail';

export default function useProducts() {
  const axiosInstance = useAxiosInstance();

  const [products, setProducts] = useState<ProductDetailType[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);

  const hasFetchedProducts = useRef(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setProductsLoading(true);
      try {
        const products = await axiosInstance.get<ProductDetailType[]>(
          '/products',
        );
        setProducts(products.data);
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
