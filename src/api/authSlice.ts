import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserType } from '../types/Auth';

type AuthState = {
  authData: UserType | null;
};

const initialState: AuthState = {
  authData: null,
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
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
