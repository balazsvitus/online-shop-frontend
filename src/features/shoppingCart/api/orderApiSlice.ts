import { createApi } from '@reduxjs/toolkit/query/react';
import API_URLS from '../../../lib/apiUrls';
import customFetchBaseQuery from '../../../api/fetchBaseQuery';
import { OrderDTO } from '../../../types/Order';

export const orderApiSlice = createApi({
  reducerPath: 'orderApi',
  baseQuery: customFetchBaseQuery(),
  endpoints: (builder) => ({
    addOrder: builder.mutation<void, OrderDTO>({
      query: (order) => ({
        url: API_URLS.ORDERS,
        method: 'POST',
        body: order,
      }),
    }),
  }),
});

export const { useAddOrderMutation } = orderApiSlice;
