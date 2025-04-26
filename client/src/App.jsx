import axios from "axios";
import { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./index.css";
import MainLayout from "./layouts/MainLayout";
import AccountProfile from "./pages/account/AccountProfile";
import HomePage from "./pages/HomePage";
import ListAllShops from "./pages/admin/listAllShop";
import Login from "./pages/login";
import PendingShops from "./pages/admin/pendingShop";
import Signup from "./pages/signup";
import BannedShops from "./pages/admin/bannedShop";
import AnnouncementsPage from "./pages/admin/announcementPage";
import ProductDetails from "./pages/ProductDetails";
import Category from "./pages/seller/Category";
import AllProduct from "./pages/seller/AllProduct";
import ShopInformation from "./pages/seller/shopInformation";
import SellerBanner from "./pages/seller/SellerBanner";
import SellerDashboard from "./pages/seller/SellerDashboard";
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
          <Route index element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/product/:id" element={<ProductDetails />} /> 
          {/* http://localhost:5173/product/1 */}
        </Route>

        
        <Route path="/admin" element={<MainLayout />}>
          <Route path="pending-shops" element={<PendingShops />} />
          <Route path="list-all-shops" element={<ListAllShops />} />
          <Route path="banned-shops" element={<BannedShops />} />
          <Route path="announcements" element={<AnnouncementsPage />} />
        </Route>

        <Route path="/seller" element={<MainLayout />}>
          <Route path="category" element={<Category />} />
          <Route path="all-product" element={<AllProduct />} />
          <Route path="shop-information" element={<ShopInformation />} />
          <Route path="seller-banner" element={<SellerBanner />} />
          <Route path="seller-dashboard" element={<SellerDashboard />} />
        </Route>

        <Route path="/account" element={<MainLayout />}>
          <Route path="profile" element={<AccountProfile />} />
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
