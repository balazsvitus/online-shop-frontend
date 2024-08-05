import { createApi } from '@reduxjs/toolkit/query/react';
import API_URLS from '../../../lib/apiUrls';
import { ProductCategoryType } from '../../../types/ProductDetail';
import customFetchBaseQuery from '../../../api/fetchBaseQuery';

export const productCategoriesApiSlice = createApi({
  reducerPath: 'productCategoriesApi',
  baseQuery: customFetchBaseQuery(),
  endpoints: (builder) => ({
    getProductCategories: builder.query<ProductCategoryType[], void>({
      query: () => `${API_URLS.PRODUCT_CATEGORIES}`,
    }),
  }),
});

export const { useGetProductCategoriesQuery } = productCategoriesApiSlice;
