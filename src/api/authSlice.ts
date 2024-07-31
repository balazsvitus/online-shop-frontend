import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserType = {
  username: string;
  role: string;
  accessToken: string;
};

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
