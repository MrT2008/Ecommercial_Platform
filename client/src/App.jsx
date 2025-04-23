import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Login from './pages/login';
import Signup from './pages/signup';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import { useAuth } from './hooks/useAuth';
import PrivateRoute from './routes/privateRoute';

function App() {
  const { user } = useAuth();
  const userRoles = user?.roles || [];

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<MainLayout/>} >
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
        
        {/* Protected routes */}
        <Route element={<MainLayout />}>
          <Route 
            index 
            element={
              <PrivateRoute isAllowed={userRoles.includes('buyer')}>
                <HomePage />
              </PrivateRoute>
            } 
          />
          {/* Add more protected routes here */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;