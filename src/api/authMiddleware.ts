import { isRejectedWithValue, Middleware } from '@reduxjs/toolkit';

interface  RejectedPayload {
  status: number;
}

const authMiddleware: Middleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (isRejectedWithValue(action)) {
      if ((action.payload as RejectedPayload).status === 401) {
        dispatch({ type: 'auth/unauthorized' });
      }
    }

    return next(action);
  };

export default authMiddleware;
