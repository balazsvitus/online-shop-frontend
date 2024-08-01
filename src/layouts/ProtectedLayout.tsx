import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuthContext from '../hooks/useAuthContext';
import Navbar from '../features/navbar/components/Navbar';

export default function ProtectedLayout() {
  const path = useLocation();
  const { authData, clearAuthData } = useAuthContext();

  const loggedIn = authData.accessToken && authData.accessToken.length > 0;
  const loginPath = path.pathname.startsWith('/login');

  const handleLogout = () => {
    clearAuthData();
  };

  return (
    <>
      {(loggedIn && !loginPath) || (!loggedIn && loginPath) ? (
        <>
          {loggedIn ? (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {/* <div className="center-table-container">
                <div className="logout-container">
                  <button onClick={handleLogout}>
                    Logout ({authData.username})
                  </button>
                </div>
              </div> */}
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
