import { createApi } from '@reduxjs/toolkit/query/react';
import API_URLS from '../../../lib/apiUrls';
import customFetchBaseQuery from '../../../api/fetchBaseQuery';
import { Statistics } from '../../../types/Order';

export const orderDetailsApiSlice = createApi({
  reducerPath: 'orderDetailsApi',
  baseQuery: customFetchBaseQuery(),
  endpoints: (builder) => ({
    getStatistics: builder.query<Statistics[], void>({
      query: () => `${API_URLS.ORDER_DETAILS}/statistics`,
    }),
  }),
});

export const { useGetStatisticsQuery } = orderDetailsApiSlice;
