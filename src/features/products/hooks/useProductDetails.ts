import { AxiosError } from 'axios';
import { useCallback, useState } from 'react';
import useAxiosInstance from '../../../hooks/useAxiosInstance';
import { NavigateFunction } from 'react-router-dom';
import { ProductDetailType } from '../../../types/ProductDetail';
import API_URLS from '../../../lib/apiUrls';

export default function useProductDetails(productId: string) {
  const axiosInstance = useAxiosInstance();

  const [productDetails, setProductDetails] = useState<ProductDetailType>();
  const [productDetailsLoading, setProductDetailsLoading] =
    useState<boolean>(true);

  const [productDeleteLoading, setProductDeleteLoading] =
    useState<boolean>(false);

  const fetchProductDetails = useCallback(
    async (navigateToProducts: () => void) => {
      try {
        setProductDetailsLoading(true);
        const response = await axiosInstance.get<ProductDetailType>(
          `${API_URLS.PRODUCTS}/${productId}`,
        );
        setProductDetails(response.data);
      } catch (error) {
        const axiosError = error as AxiosError;
        console.error(axiosError.message);
        navigateToProducts();
      } finally {
        setProductDetailsLoading(false);
      }
    },
    [axiosInstance, productId],
  );

  const setProductFromState = (product: ProductDetailType) => {
    console.log('fuck this');
    setProductDetails(product);
    setProductDetailsLoading(false);
  };

  const deleteProduct = useCallback(
    async (navigate: NavigateFunction) => {
      try {
        setProductDeleteLoading(true);
        await axiosInstance.delete(`${API_URLS.PRODUCTS}/${productId}`);
        navigate('../');
      } catch (error) {
        const axiosError = error as AxiosError;
        const deleteError =
          (axiosError.response?.data as { message: string }).message ||
          axiosError.message;
        alert(
          `An error occured while performing the delete operation: ${deleteError}`,
        );
      } finally {
        setProductDeleteLoading(false);
      }
    },
    [axiosInstance, productId],
  );

  return {
    fetchProductDetails,
    productDetails,
    productDetailsLoading,
    deleteProduct,
    productDeleteLoading,
    setProductFromState,
  };
}
