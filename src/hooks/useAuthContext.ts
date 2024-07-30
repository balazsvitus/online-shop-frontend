import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export default function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      'The auth context can only be used inside an auth context provider!',
    );
  }

  return context;
}
