import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../api/store';
import useAuthContext from '../hooks/useAuthContext';

export default function AuthHandler() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { clearAuthData } = useAuthContext();

  const isUnauthorized = useSelector(
    (state: RootState) => state.auth.isUnauthorized,
  );

  useEffect(() => {
    if (isUnauthorized) {
      clearAuthData();
      navigate('/login');
      dispatch({ type: 'auth/resetUnauthorized' });
    }
  }, [isUnauthorized, navigate, dispatch, clearAuthData]);

  return null;
}
