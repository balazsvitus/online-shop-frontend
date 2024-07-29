import { useEffect, useState } from 'react';
import { ProductCategoryType } from '../../../types/ProductDetail';

export default function useProductCategories() {
  const [productCategories, setProductCategories] = useState<
    ProductCategoryType[]
  >([]);
  const [productCategoriesLoading, setProductCategoriesLoading] =
    useState<boolean>(true);

  useEffect(() => {
    const fetchProductCategories = async () => {
      try {
        setProductCategoriesLoading(true);
        const response = await fetch(
          'http://localhost:3000/product-categories',
        );
        if (!response.ok) {
          throw new Error(
            'An error occures while fetching product categories!',
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
  }, [setProductCategories, setProductCategoriesLoading]);

  return {
    productCategories,
    productCategoriesLoading,
  };
}
