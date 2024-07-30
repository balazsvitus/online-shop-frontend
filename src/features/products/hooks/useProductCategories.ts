import { useEffect, useState } from 'react';
import { ProductCategoryType } from '../../../types/ProductDetail';
import API_URLS, { API_BASE_URL } from '../../../lib/apiUrls';
import useAuthContext from '../../../hooks/useAuthContext';

export default function useProductCategories() {
  const [productCategories, setProductCategories] = useState<
    ProductCategoryType[]
  >([]);
  const [productCategoriesLoading, setProductCategoriesLoading] =
    useState<boolean>(true);
  const { authData, logout } = useAuthContext();

  useEffect(() => {
    const fetchProductCategories = async () => {
      try {
        setProductCategoriesLoading(true);
        const response = await fetch(
          `${API_BASE_URL}${API_URLS.PRODUCT_CATEGORIES}`,
          {
            headers: {
              Authorization: `Bearer ${authData.accessToken}`,
            },
          },
        );
        if (!response.ok) {
          if (response.status === 401) {
            logout();
          }
          throw new Error(
            'An error occured while fetching product categories!',
          );
        }
        const data: ProductCategoryType[] = await response.json();
        setProductCategories(data);
      } catch (error) {
        console.error(error);
      } finally {
        setProductCategoriesLoading(false);
      }
    };

    fetchProductCategories();
  }, [
    authData.accessToken,
    logout,
    setProductCategories,
    setProductCategoriesLoading,
  ]);

  return {
    productCategories,
    productCategoriesLoading,
  };
}
