import { createApi } from '@reduxjs/toolkit/query/react';
import API_URLS from '../../../lib/apiUrls';
import customFetchBaseQuery from '../../../api/fetchBaseQuery';
import { UserType } from '../../../types/Auth';

type LoginType = {
  username: string;
  password: string;
};

export const loginApiSlice = createApi({
  reducerPath: 'loginApi',
  baseQuery: customFetchBaseQuery(),
  endpoints: (builder) => ({
    loginUser: builder.mutation<UserType, LoginType>({
      query: ({ username, password }) => ({
        url: `${API_URLS.LOGIN}`,
        method: 'POST',
        body: { username, password },
      }),
    }),
  }),
});

export const { useLoginUserMutation } = loginApiSlice;
