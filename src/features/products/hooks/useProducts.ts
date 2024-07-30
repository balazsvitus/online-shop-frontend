import { AxiosError } from 'axios';
import { useCallback, useState } from 'react';
import useAxiosInstance from '../../../hooks/useAxiosInstance';
import { ProductDetailType, ProductDTO } from '../../../types/ProductDetail';
import API_URLS, { API_BASE_URL } from '../../../lib/apiUrls';
import useAuthContext from '../../../hooks/useAuthContext';

export default function useProducts() {
  const axiosInstance = useAxiosInstance();
  const { authData } = useAuthContext();

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
        const response = await fetch(`${API_BASE_URL}${API_URLS.PRODUCTS}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authData.accessToken}`,
          },
          body: JSON.stringify(product),
        });
        if (response.ok) {
          callback();
        }
      } catch (error) {
        console.error(error);
      } finally {
        setAddingProduct(false);
      }
    },
    [authData.accessToken],
  );

  const [updatingProduct, setUpdatingProduct] = useState<boolean>(false);

  const updateProduct = useCallback(
    async (productId: string, product: ProductDTO, callback: () => void) => {
      setUpdatingProduct(true);
      try {
        const response = await fetch(
          `${API_BASE_URL}${API_URLS.PRODUCTS}/${productId}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${authData.accessToken}`,
            },
            body: JSON.stringify(product),
          },
        );
        if (response.ok) {
          callback();
        }
      } catch (error) {
        console.error(error);
      } finally {
        setUpdatingProduct(false);
      }
    },
    [authData.accessToken],
  );

  return {
    fetchProducts,
    products,
    productsLoading,
    addProduct,
    addingProduct,
    updateProduct,
    updatingProduct,
  };
}
