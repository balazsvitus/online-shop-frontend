import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuthContext from '../hooks/useAuthContext';
import Navbar from '../features/navbar/components/Navbar';

export default function ProtectedLayout() {
  const path = useLocation();
  const { authData } = useAuthContext();

  const loggedIn = authData.accessToken && authData.accessToken.length > 0;
  const loginPath = path.pathname.startsWith('/login');

  return (
    <>
      {(loggedIn && !loginPath) || (!loggedIn && loginPath) ? (
        <>
          {loggedIn ? (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Navbar />
              <Outlet />
            </div>
          ) : (
            <Outlet />
          )}
        </>
      ) : (
        <Navigate to={loggedIn ? '/' : '/login'} replace={true} />
      )}
    </>
  );
}
