import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function AdminRoute() {
  const { isLoading, isAdmin } = useAuth();

  if (isLoading) {
    return <div className='px-6 py-20 text-center text-canvas/60'>Betöltés...</div>;
  }

  return isAdmin ? <Outlet /> : <Navigate to='/login' replace />;
}

export default AdminRoute;
