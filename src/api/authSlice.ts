import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserType } from '../types/Auth';

type AuthState = {
  authData: UserType | null;
  isUnauthorized: boolean;
};

const initialState: AuthState = {
  authData: null,
  isUnauthorized: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<UserType>) {
      state.authData = action.payload;
    },
    clearAuth(state) {
      state.authData = null;
    },
    unauthorized: (state) => {
      state.isUnauthorized = true;
    },
    resetUnauthorized: (state) => {
      state.isUnauthorized = false;
    },
  },
});

export const { setAuth, clearAuth, unauthorized, resetUnauthorized } =
  authSlice.actions;
export default authSlice.reducer;
