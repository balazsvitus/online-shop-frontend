import { useCallback, useState } from 'react';
import API_URLS, { API_BASE_URL } from '../../../lib/apiUrls';
import useAuthContext from '../../../hooks/useAuthContext';

export default function useLogin() {
  const [loginLoading, setLoginLoading] = useState<boolean>(false);
  const { storeAuthData } = useAuthContext();

  const login = useCallback(
    async (username: string, password: string) => {
      try {
        setLoginLoading(true);
        const response = await fetch(`${API_BASE_URL}${API_URLS.LOGIN}`, {
          method: 'POST',
          body: JSON.stringify({
            username,
            password,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          storeAuthData({
            username: data.username,
            role: data.role,
            accessToken: data.accessToken,
          });
        } else {
          const errorBody = await response.json();
          throw new Error(errorBody.message);
        }
      } catch (error) {
        const errorMessage = (error as { message: string }).message;
        alert(errorMessage);
      } finally {
        setLoginLoading(false);
      }
    },
    [storeAuthData],
  );

  return { login, loginLoading };
}
