import { createContext, useEffect, useState } from 'react';

type UserType = {
  username: string;
  role: string;
  accessToken: string;
};

type AuthContextType = {
  authData: UserType;
  storeAuthData: (user: UserType) => void;
  logout: () => void;
};

export const AuthContext = createContext({} as AuthContextType);

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authData, setAuthData] = useState<UserType>({
    username: '',
    role: '',
    accessToken: '',
  });

  const storeAuthData = (data: UserType) => {
    setAuthData(data);
    localStorage.setItem('user', JSON.stringify(data));
  };

  const logout = () => {
    setAuthData({ username: '', role: '', accessToken: '' });
    localStorage.removeItem('user');
  };

  useEffect(() => {
    const userFromStorage = localStorage.getItem('user');
    if (userFromStorage) {
      const user = JSON.parse(userFromStorage) as UserType;
      if (user) {
        console.log('storing user: ', user);
        storeAuthData({
          username: user.username,
          role: user.role,
          accessToken: user.accessToken,
        });
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authData, storeAuthData, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
