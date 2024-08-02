import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import { productApiSlice } from '../features/products/api/productApiSlice';
import { productCategoriesApiSlice } from '../features/products/api/productCategoriesApiSlice';
import { orderApiSlice } from '../features/shoppingCart/api/orderApiSlice';
import authMiddleware from './authMiddleware';

export const store = configureStore({
  reducer: {
    [productApiSlice.reducerPath]: productApiSlice.reducer,
    [productCategoriesApiSlice.reducerPath]: productCategoriesApiSlice.reducer,
    [orderApiSlice.reducerPath]: orderApiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productApiSlice.middleware,
      productCategoriesApiSlice.middleware,
      orderApiSlice.middleware,
      authMiddleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
