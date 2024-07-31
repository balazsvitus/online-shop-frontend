import { createContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearAuth, setAuth } from '../api/authSlice';

type UserType = {
  username: string;
  role: string;
  accessToken: string;
};

type AuthContextType = {
  authData: UserType;
  authLoading: boolean;
  storeAuthData: (user: UserType) => void;
  logout: () => void;
};

export const AuthContext = createContext({} as AuthContextType);

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const [authData, setAuthData] = useState<UserType>({
    username: '',
    role: '',
    accessToken: '',
  });
  const [authLoading, setAuthLoading] = useState<boolean>(true);

  const storeAuthData = (data: UserType) => {
    setAuthData(data);
    localStorage.setItem('user', JSON.stringify(data));
    dispatch(setAuth(data));
  };

  const logout = () => {
    setAuthData({ username: '', role: '', accessToken: '' });
    localStorage.removeItem('user');
    dispatch(clearAuth());
  };

  useEffect(() => {
    const userFromStorage = localStorage.getItem('user');
    if (userFromStorage) {
      const user = JSON.parse(userFromStorage) as UserType;
      if (user) {
        storeAuthData({
          username: user.username,
          role: user.role,
          accessToken: user.accessToken,
        });
      }
    }
    setAuthLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{ authData, authLoading, storeAuthData, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
