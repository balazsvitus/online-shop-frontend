import { createContext, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearAuth, setAuth } from '../api/authSlice';
import { LOCALSTORAGE_USER } from '../lib/constants';
import { UserType } from '../types/Auth';
import useShoppingCartContext from '../hooks/useShoppingCartContext';

type AuthContextType = {
  authData: UserType;
  authLoading: boolean;
  isAdmin: boolean;
  storeAuthData: (user: UserType) => void;
  clearAuthData: () => void;
};

export const AuthContext = createContext({} as AuthContextType);

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const [authData, setAuthData] = useState<UserType>({} as UserType);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const { emptyShoppingCart } = useShoppingCartContext();

  const storeAuthData = (data: UserType) => {
    setAuthData(data);
    localStorage.setItem(LOCALSTORAGE_USER, JSON.stringify(data));
    dispatch(setAuth(data));
    setIsAdmin(data.role === 'admin');
  };

  const clearAuthData = () => {
    setAuthData({} as UserType);
    localStorage.removeItem(LOCALSTORAGE_USER);
    emptyShoppingCart();
    dispatch(clearAuth());
    setIsAdmin(false);
  };

  useEffect(() => {
    const userFromStorage = localStorage.getItem(LOCALSTORAGE_USER);
    if (userFromStorage) {
      const user = JSON.parse(userFromStorage) as UserType;
      if (user) {
        setAuthData({
          id: user.id,
          username: user.username,
          role: user.role,
          accessToken: user.accessToken,
        });
        setIsAdmin(user.role === 'admin');
        dispatch(setAuth(user));
      }
    }
    setAuthLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(
    () => ({
      authData,
      authLoading,
      isAdmin,
      storeAuthData,
      clearAuthData,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [authData, authLoading, isAdmin],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
