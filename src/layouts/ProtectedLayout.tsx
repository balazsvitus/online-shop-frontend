import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuthContext from '../hooks/useAuthContext';

export default function ProtectedLayout() {
  const path = useLocation();
  const { authData, logout } = useAuthContext();

  const loggedIn = authData.accessToken.length > 0;
  const loginPath = path.pathname.startsWith('/login');

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      {(loggedIn && !loginPath) || (!loggedIn && loginPath) ? (
        <>
          {loggedIn ? (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="center-table-container">
                <div className="logout-container">
                  <button onClick={handleLogout}>
                    Logout ({authData.username})
                  </button>
                </div>
              </div>
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
