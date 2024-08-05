import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { API_BASE_URL } from '../lib/apiUrls';
import { RootState } from './store';

const customFetchBaseQuery = () => {
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

export default customFetchBaseQuery;
