// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Login from './pages/login';
import Signup from './pages/signup';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import { AuthProvider } from './hooks/useAuth';
import PrivateRoute from './routes/privateRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route
              index
              element={
                <PrivateRoute>
                  <HomePage />
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
