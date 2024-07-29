import { AxiosError } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import useAxiosInstance from '../../../hooks/useAxiosInstance';
import { NavigateFunction } from 'react-router-dom';
import { ProductDetailType } from '../../../types/ProductDetail';

export default function useProductDetails(productId: string) {
  const axiosInstance = useAxiosInstance();

  const [productDetails, setProductDetails] = useState<ProductDetailType>();
  const [productDetailsLoading, setProductDetailsLoading] =
    useState<boolean>(true);

  const [productDeleteLoading, setProductDeleteLoading] =
    useState<boolean>(false);
  const [productDeleteError, setProductDeleteError] = useState<string>('');

  useEffect(() => {
    setProductDetailsLoading(true);
    const response = axiosInstance.get<ProductDetailType>(
      `/products/${productId}`,
    );
    response
      .then((resp) => {
        setProductDetails(resp.data);
      })
      .catch((error) => {
        const axiosError = error as AxiosError;
        throw new Error(axiosError.message);
      })
      .finally(() => {
        setProductDetailsLoading(false);
      });
  }, [axiosInstance, productId]);

  const deleteProduct = useCallback(
    async (navigate: NavigateFunction) => {
      setProductDeleteLoading(true);
      try {
        await axiosInstance.delete(`/products/${productId}`);
        navigate('../');
      } catch (error) {
        const axiosError = error as AxiosError;
        setProductDeleteError(
          (axiosError.response?.data as { message: string }).message ||
            axiosError.message,
        );
        throw axiosError.message;
      } finally {
        setProductDeleteLoading(false);
      }
    },
    [axiosInstance, productId],
  );

  return {
    productDetails,
    productDetailsLoading,
    deleteProduct,
    productDeleteLoading,
    productDeleteError,
  };
}
