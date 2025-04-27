import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import axios from 'axios';
import Login from './pages/login';
import Signup from './pages/signup';
import PendingShops from './pages/pendingShop';
import ListAllShops from './pages/listAllShop';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import Cart from './pages/Cart'
import CheckOut from './pages/CheckOut';

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

        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />       
        </Route>

        <Route path="/admin" element={<MainLayout />}>
          <Route path="pending-shops" element={<PendingShops />} />
          <Route path="list-all-shops" element={<ListAllShops />} />
        </Route>
        
        <Route path="/user" element={<MainLayout />}>
          <Route path="cart" element={<Cart />} />
          <Route path="check-out" element={<CheckOut/>}/>
        </Route>
        
      </Routes>



      
    </Router>
  )
}

export default App
