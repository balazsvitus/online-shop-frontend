import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import API_URLS, { API_BASE_URL } from '../../../lib/apiUrls';
import { ProductDetailType, ProductDTO } from '../../../types/ProductDetail';
import { RootState } from '../../../lib/redux/store';

const customFetchBaseQuery = () => {
  console.log('Setting up fetch base query');
  return fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.auth?.authData?.accessToken;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  });
};

export const productApiSlice = createApi({
  reducerPath: 'productApi',
  // baseQuery: fetchBaseQuery({
  //   baseUrl: API_BASE_URL,
  //   headers: {
  //     Authorization: `Bearer ${'asd'}`,
  //   },
  // }),
  baseQuery: customFetchBaseQuery(),
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    getProducts: builder.query<ProductDetailType[], void>({
      query: () => API_URLS.PRODUCTS,
      providesTags: ['Products'],
    }),
    addProduct: builder.mutation({
      query: (product: ProductDTO) => ({
        url: API_URLS.PRODUCTS,
        method: 'POST',
        body: product,
      }),
      invalidatesTags: ['Products'],
    }),
  }),
});

export const { useGetProductsQuery } = productApiSlice;
