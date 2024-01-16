import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = () => {
  const authToken = localStorage.getItem('auth_token');
  const isAuthenticated = authToken !== null;
  return isAuthenticated ? <Outlet /> : <Navigate to='/auth/login' />;
};

export default PrivateRoutes;
