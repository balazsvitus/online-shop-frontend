import { createContext, useEffect, useMemo, useState } from 'react';
import { LOCALSTORAGE_USER } from '../lib/constants';

type UserType = {
  username: string;
  role: string;
  accessToken: string;
};

type AuthContextType = {
  authData: UserType;
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
  const [authData, setAuthData] = useState<UserType>({} as UserType);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const storeAuthData = (data: UserType) => {
    setAuthData(data);
    localStorage.setItem(LOCALSTORAGE_USER, JSON.stringify(data));
    setIsAdmin(data.role === 'admin');
  };

  const clearAuthData = () => {
    setAuthData({ username: '', role: '', accessToken: '' });
    localStorage.removeItem(LOCALSTORAGE_USER);
    setIsAdmin(false);
  };

  useEffect(() => {
    const userFromStorage = localStorage.getItem(LOCALSTORAGE_USER);
    if (userFromStorage) {
      const user = JSON.parse(userFromStorage) as UserType;
      if (user) {
        setAuthData({
          username: user.username,
          role: user.role,
          accessToken: user.accessToken,
        });
        setIsAdmin(user.role === 'admin');
      }
    }
  }, []);

  const value = useMemo(
    () => ({
      authData,
      isAdmin,
      storeAuthData,
      clearAuthData,
    }),
    [authData, isAdmin],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
