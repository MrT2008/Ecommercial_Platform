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
import AccountAddress from "./pages/account/AccountAddress";
import AccountCreditCard from "./pages/account/AccountCard";
import AccountPassword from "./pages/account/AccountPassword";
import PendingPayment from "./pages/account/PendingPayment";
import OngoingOrders from "./pages/account/OngoingOrders";
import CompletedOrders from "./pages/account/CompletedOrders";
import Cancellations from "./pages/account/Cancellations";
import AdminBanner from "./pages/admin/adminBanner";
import Dashboard from "./pages/admin/adminDashboard";
import { AuthContext } from "./hooks/AuthContext";
import { useContext } from "react";

function App() {
  const { user, loading } = useContext(AuthContext);
  if (loading) return null; // or a loading spinner
  const isBuyer = user?.roles.includes("buyer");
  const isSeller = user?.roles.includes("seller");
  const isAdmin = user?.roles.includes("manager");
  const userRoles = user?.roles || [];


  return (
    <Router>
      <Routes>

        {/* Public routes */}
        <Route path="/" element={<MainLayout />} >
          <Route index element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          {/* http://localhost:5173/product/1 */}
        </Route>
          
        <Route path="/buyer" element={<MainLayout />}>
          <Route path="cart" element={<Cart />} />
          <Route path="check-out" element={<CheckOut/>}/>
        </Route>
        
        {/* Private routes for both buyers and sellers */}
        <Route element={<PrivateRoute isAllowed={ isBuyer } redirectPath="/login"><MainLayout /></PrivateRoute>}>
          <Route path="/account" element={<AccountProfile />} />
        </Route>
        {/* Only buyer can access */}

        <Route element={<PrivateRoute isAllowed={ userRoles?.length === 1 && isBuyer } redirectPath="/login"><MainLayout /></PrivateRoute>}>
          <Route path="/become-seller" element={<BecomeSeller />} />
        </Route>

        <Route path="/seller" element={<MainLayout />}>
          <Route path="category" element={<Category />} />
          <Route path="all-product" element={<AllProduct />} />
          <Route path="shop-information" element={<ShopInformation />} />
          <Route path="seller-banner" element={<SellerBanner />} />
          <Route path="seller-dashboard" element={<SellerDashboard />} />
          <Route path="all-order" element={<AllOrder />} />
        </Route>
        <Route path="/account" element={<MainLayout />}>
          <Route path="profile" element={<AccountProfile />} />
          <Route path="address" element={<AccountAddress />} />
          <Route path="credit_card" element={<AccountCreditCard />} />
          <Route path="changing_password" element={<AccountPassword />} />
          <Route path="pending" element={<PendingPayment />} />
          <Route path="ongoing" element={<OngoingOrders />} />
          <Route path="completed" element={<CompletedOrders />} />
          <Route path="cancellations" element={<Cancellations />} />
        </Route>

        {/* Private routes for sellers */}
        {/* <Route element={<PrivateRoute isAllowed={isSeller} redirectPath="/login"><MainLayout /></PrivateRoute>}>
          <Route path="/seller">
            <Route path="category" element={<Category />} />
            <Route path="all-product" element={<AllProduct />} />
            <Route path="shop-information" element={<ShopInformation />} />
            <Route path="seller-banner" element={<SellerBanner />} />
            <Route path="seller-dashboard" element={<SellerDashboard />} />
            <Route path="all-order" element={<AllOrder />} />
          </Route> */}
        {/* Add seller-specific routes here */}
        {/* </Route> */}



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
        {/* Private Route for admin */}
        <Route element={<PrivateRoute isAllowed={isAdmin} redirectPath="/login"><MainLayout /></PrivateRoute>}>
          <Route path="/admin" >
            <Route path="admin-dashboard" element={<Dashboard />} />
            <Route path="pending-shops" element={<PendingShops />} />
            <Route path="list-shops" element={<ListAllShops />} />
            <Route path="banned-shops" element={<BannedShops />} />
            <Route path="announcements" element={<AnnouncementsPage />} />
            <Route path="admin-banner" element={<AdminBanner />} />

          </Route>
          {/* Add admin-specific routes here */}
          {/* Private routes for both buyers and sellers */}
          {/* <Route element={<PrivateRoute isAllowed={isBuyer || isSeller} redirectPath="/login"><MainLayout /></PrivateRoute>}>
            <Route path="/account" element={<AccountProfile />} />
            <Route path="/become-seller" element={<BecomeSeller />} />
          </Route> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
