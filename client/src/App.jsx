import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import axios from 'axios';
import Login from './pages/login';
import Signup from './pages/signup';

function App() {
  const [count, setCount] = useState(0);
  const [array, setArray] = useState([]);

  const fecthAPI = async () => {
    const response = await axios.get('http://localhost:8080/api');
    setArray(response.data.characters);
    console.log(response.data.characters);
  }

  useEffect(() => {
    fecthAPI();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  )
}

export default App
