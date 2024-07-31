import { createApi } from '@reduxjs/toolkit/query/react';
import API_URLS from '../../../lib/apiUrls';
import { ProductDetailType, ProductDTO } from '../../../types/ProductDetail';
import customFetchBaseQuery from '../../../api/fetchBaseQuery';

export const productApiSlice = createApi({
  reducerPath: 'productApi',
  baseQuery: customFetchBaseQuery(),
  tagTypes: ['Products', 'Product'],
  endpoints: (builder) => ({
    getProducts: builder.query<ProductDetailType[], void>({
      query: () => API_URLS.PRODUCTS,
      providesTags: ['Products'],
    }),

    getProduct: builder.query<ProductDetailType, string>({
      query: (id) => `${API_URLS.PRODUCTS}/${id}`,
      providesTags: ['Product'],
    }),

    addProduct: builder.mutation<ProductDetailType, ProductDTO>({
      query: (product) => ({
        url: API_URLS.PRODUCTS,
        method: 'POST',
        body: product,
      }),
      invalidatesTags: ['Products', 'Product'],
    }),

    updateProduct: builder.mutation<
      ProductDetailType,
      { id: string; product: ProductDTO }
    >({
      query: ({ id, product }) => ({
        url: `${API_URLS.PRODUCTS}/${id}`,
        method: 'PUT',
        body: product,
      }),
      invalidatesTags: ['Products', 'Product'],
    }),

    deleteProduct: builder.mutation<void, string>({
      query: (id) => ({
        url: `${API_URLS.PRODUCTS}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products', 'Product'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useLazyGetProductQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApiSlice;
