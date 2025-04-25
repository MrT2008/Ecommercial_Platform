
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ isAllowed, children, redirectTo = '/login' }) => {
  if (!isAllowed) {
    return <Navigate to={redirectTo} replace />;
  }
  return children;
};

export default PrivateRoute;