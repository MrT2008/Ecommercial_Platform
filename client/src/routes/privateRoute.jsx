import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ isAllowed, children, redirectTo = '/' }) => {
  return isAllowed ? children : <Navigate to={redirectTo} />;
};

export default PrivateRoute;