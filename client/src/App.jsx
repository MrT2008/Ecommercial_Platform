import axios from "axios";
import { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./index.css";
import MainLayout from "./layouts/MainLayout";
import AccountProfile from "./pages/AccountProfile";
import HomePage from "./pages/HomePage";
import ListAllShops from "./pages/listAllShop";
import Login from "./pages/login";
import PendingShops from "./pages/pendingShop";
import Signup from "./pages/signup";
import ProductDetails from "./pages/ProductDetails";
import Category from "./pages/seller/Category";
import AllProduct from "./pages/seller/AllProduct";
import ShopInformation from "./pages/seller/shopInformation";
function App() {
  const [count, setCount] = useState(0);
  const [array, setArray] = useState([]);

  const fecthAPI = async () => {
    const response = await axios.get("http://localhost:8080/api");
    setArray(response.data.characters);
    console.log(response.data.characters);
  };
  //   const response = await axios.get('http://localhost:8080/api');
  //   setArray(response.data);
  //   console.log(response.data);
  // }

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
          <Route path="/account" element={<AccountProfile />} />
          <Route path="/product/:id" element={<ProductDetails />} /> 
          {/* http://localhost:5173/product/1 */}
        </Route>

        <Route path="/admin" element={<MainLayout />}>
          <Route path="pending-shops" element={<PendingShops />} />
          <Route path="list-all-shops" element={<ListAllShops />} />
        </Route>

        <Route path="/seller" element={<MainLayout />}>
          <Route path="category" element={<Category />} />
          <Route path="all-product" element={<AllProduct />} />
          <Route path="shop-information" element={<ShopInformation />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
