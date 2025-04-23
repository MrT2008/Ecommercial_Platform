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
  // const [count, setCount] = useState(0);
  // const [array, setArray] = useState([]);

  // const fecthAPI = async () => {
  //   const response = await axios.get('http://localhost:8080/api');
  //   setArray(response.data.characters);
  //   console.log(response.data.characters);
  // }

  // useEffect(() => {
  //   fecthAPI();
  // }, []);

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
