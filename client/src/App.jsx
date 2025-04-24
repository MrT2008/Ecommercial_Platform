import axios from "axios";
import { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./index.css";
import MainLayout from "./layouts/MainLayout";
import AccountProfile from "./pages/AccountProfile";
import HomePage from "./pages/HomePage";
import ListAllShops from "./pages/admin/listAllShop";
import Login from "./pages/login";
import PendingShops from "./pages/admin/pendingShop";
import Signup from "./pages/signup";
import BannedShops from "./pages/admin/bannedShop";
import AnnouncementsPage from "./pages/admin/announcementPage";

function App() {
  const [count, setCount] = useState(0);
  const [array, setArray] = useState([]);

  const fecthAPI = async () => {
    const response = await axios.get("http://localhost:8080/api");
    setArray(response.data.characters);
    console.log(response.data.characters);
  };

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
        </Route>
        
        <Route path="/admin" element={<MainLayout />}>
          <Route path="pending-shops" element={<PendingShops />} />
          <Route path="list-all-shops" element={<ListAllShops />} />
          <Route path="banned-shops" element={<BannedShops />} />
          <Route path="announcements" element={<AnnouncementsPage />} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
