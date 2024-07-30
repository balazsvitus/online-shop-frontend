import { AxiosError } from 'axios';
import { useCallback, useState } from 'react';
import useAxiosInstance from '../../../hooks/useAxiosInstance';
import { ProductDetailType, ProductDTO } from '../../../types/ProductDetail';
import API_URLS from '../../../lib/apiUrls';

export default function useProducts() {
  const axiosInstance = useAxiosInstance();

  const [products, setProducts] = useState<ProductDetailType[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    setProductsLoading(true);
    try {
      const products = await axiosInstance.get<ProductDetailType[]>(
        `${API_URLS.PRODUCTS}`,
      );
      setProducts(products.data);
    } catch (error) {
      setProducts([]);
      const axiosError = error as AxiosError;
      throw new Error(axiosError.message);
    } finally {
      setProductsLoading(false);
    }
  }, [axiosInstance, setProducts, setProductsLoading]);

  const [addingProduct, setAddingProduct] = useState<boolean>(false);

  const addProduct = useCallback(
    async (product: ProductDTO, callback: () => void) => {
      setAddingProduct(true);
      try {
        console.log(product);
        const response = await fetch('http://localhost:3000/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(product),
        });
        if (response.ok) {
          callback();
          // navigate to products
        }
      } catch (error) {
        console.error(error);
      } finally {
        setAddingProduct(false);
      }
    },
    [setAddingProduct],
  );

  return {
    fetchProducts,
    products,
    productsLoading,
    addProduct,
    addingProduct,
  };
}
