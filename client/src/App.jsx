import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useAuth } from './hooks/useAuth';
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
import ProductDetails from "./pages/ProductDetails";
import Category from "./pages/seller/Category";
import AllProduct from "./pages/seller/AllProduct";
import ShopInformation from "./pages/seller/ShopInformation";
import SellerBanner from "./pages/seller/SellerBanner";
import SellerDashboard from "./pages/seller/SellerDashboard";
import BecomeSeller from "./pages/becomeSeller";
import PrivateRoute from './routes/privateRoute';
import AllOrder from "./pages/seller/AllOrder";
import ShopPage from "./pages/ShopPage";
import axios from 'axios';
import Cart from './pages/buyer/Cart'
import CheckOut from './pages/buyer/CheckOut';

function App() {

  const { user, loading } = useAuth();
  if (loading) return null; // or a loading spinner
  const isBuyer = user?.roles.includes("buyer");
  const isSeller = user?.roles.includes("seller");
  const isAdmin = user?.roles.includes("manager");


  return (
    <Router>
      <Routes>
        
        {/* Public routes */}
        <Route path="/" element={<MainLayout/>}>
          <Route index element={<HomePage />} />
          <Route path="shop" element={<ShopPage />} />
          {/* <Route path="shop/:id" element={<ShopPage />} /> */}
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
          
        <Route path="/buyer" element={<MainLayout />}>
          <Route path="cart" element={<Cart />} />
          <Route path="check-out" element={<CheckOut/>}/>
        </Route>
        
        {/* Private routes for both buyers and sellers */}
        <Route element={<PrivateRoute isAllowed={ isBuyer || isSeller } redirectPath="/login"><MainLayout /></PrivateRoute>}>
          <Route path="/account" element={<AccountProfile />} />
          <Route path="/become-seller" element={<BecomeSeller/>} />
        </Route>

        {/* Private routes for sellers */}
        <Route element={<PrivateRoute isAllowed={isSeller} redirectPath="/login"><MainLayout /></PrivateRoute>}>
          <Route path="/pending-shops" element={<PendingShops />} />
          <Route path="/seller">
            <Route path="category" element={<Category />} />
            <Route path="all-product" element={<AllProduct />} />
            <Route path="shop-information" element={<ShopInformation />} />
            <Route path="seller-banner" element={<SellerBanner />} />
            <Route path="seller-dashboard" element={<SellerDashboard />} />
            <Route path="all-order" element={<AllOrder />} />
          </Route>
          {/* Add seller-specific routes here */}
        </Route>
        {/* Private Route for admin */}
        <Route element={<PrivateRoute isAllowed={isAdmin} redirectPath="/login"><MainLayout /></PrivateRoute>}>
          <Route path="/admin" >
            <Route path="list-shops" element={<ListAllShops />} />
            <Route path="banned-shops" element={<BannedShops />} />
            <Route path="announcements" element={<AnnouncementsPage />} />
          </Route>
          {/* Add admin-specific routes here */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
