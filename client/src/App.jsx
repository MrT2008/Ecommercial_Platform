import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import axios from 'axios';
import Login from './pages/login';
import Signup from './pages/signup';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';

function App() {
  const [count, setCount] = useState(0);
  const [array, setArray] = useState([]);

  const fecthAPI = async () => {
    const response = await axios.get('http://localhost:8080/api');
    setArray(response.data);
    console.log(response.data);
  }

  useEffect(() => {
    fecthAPI();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
