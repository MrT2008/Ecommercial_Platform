import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useAuth } from './hooks/useAuth';
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
import ShopPage from "./pages/ShopPage";
import Category from "./pages/seller/Category";
import AllProduct from "./pages/seller/AllProduct";
import ShopInformation from "./pages/seller/ShopInformation";
import SellerBanner from "./pages/seller/SellerBanner";
import SellerDashboard from "./pages/seller/SellerDashboard";
import BecomeSeller from "./pages/becomeSeller";
import PrivateRoute from './routes/privateRoute';
import AllOrder from "./pages/seller/AllOrder";
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
import ModeratorRole from "./pages/admin/ModeratorRole";
import PrivacyPolicy from "./pages/quickLink/PrivacyPolicy";
import TermOfUse from "./pages/quickLink/TermOfUse";
import FAQ from "./pages/quickLink/FAQ";
import ShopPendingStatus from "./pages/buyer/ShopPendingStatus";

function App() {
  const { user, loading } = useAuth();
  if (loading) return null; // or a loading spinner
  const isBuyer = user?.roles.includes("buyer");
  const isSeller = user?.roles.includes("seller");
  const isAdmin = user?.roles.includes("manager");
  const isModerator = user?.roles.includes("moderator");
  const userRoles = user?.roles || [];


  return (
    <Router>
      <Routes>

        {/* Public routes */}
        <Route path="/" element={<MainLayout />} >
          <Route index element={<HomePage />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="guest/shop/:id" element={<ShopPage />} />
          <Route path="link">
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="term-of-use" element={<TermOfUse />} />
            <Route path="faq" element={<FAQ />} />
          </Route>
        </Route>

        {/* Private routes for buyers and sellers */}
        <Route element={<PrivateRoute isAllowed={isBuyer} redirectPath="/login"><MainLayout /></PrivateRoute>}>
          <Route path="/buyer" element={<MainLayout />}>
            <Route path="cart" element={<Cart />} />
            <Route path="check-out" element={<CheckOut />} />
            <Route path="shop-pending-status" element={<ShopPendingStatus />} />
          </Route>
          <Route path="/account">
            <Route index element={<AccountProfile />} />
            <Route path="profile"  element={<AccountProfile />} />
            <Route path="address" element={<AccountAddress />} />
            <Route path="credit_card" element={<AccountCreditCard />} />
            <Route path="changing_password" element={<AccountPassword />} />
            <Route path="pending" element={<PendingPayment />} />
            <Route path="ongoing" element={<OngoingOrders />} />
            <Route path="completed" element={<CompletedOrders />} />
            <Route path="cancellations" element={<Cancellations />} />
          </Route>
        </Route>

        {/* Private Route for only buyer */}
        <Route element={<PrivateRoute isAllowed={!isSeller && isBuyer} redirectPath="/"><MainLayout /></PrivateRoute>}>
          <Route path="/become-seller" element={<BecomeSeller />} />
        </Route>

        {/* Private routes for only seller */}
        <Route element={<PrivateRoute isAllowed={isSeller} redirectPath="/login"><MainLayout /></PrivateRoute>}>
          <Route path="/seller">
            <Route path="category" element={<Category />} />
            <Route path="all-product" element={<AllProduct />} />
            <Route path="shop-information" element={<ShopInformation />} />
            <Route path="seller-banner" element={<SellerBanner />} />
            <Route path="seller-dashboard" element={<SellerDashboard />} />
            <Route path="all-order" element={<AllOrder />} />
          </Route>
        </Route>

        {/* Private routes for admin and moderator */}
        <Route element={<PrivateRoute isAllowed={isAdmin || isModerator} redirectPath="/login"><MainLayout /></PrivateRoute>}>
          <Route path="/admin" element={<MainLayout />}>
            <Route path="admin-dashboard" element={<Dashboard />} />
            <Route path="pending-shops" element={<PendingShops />} />
            <Route path="list-shops" element={<ListAllShops />} />
            <Route path="banned-shops" element={<BannedShops />} />
            <Route path="announcements" element={<AnnouncementsPage />} />
            <Route path="admin-banner" element={<AdminBanner />} />
            <Route path="moderator-role" element={<ModeratorRole />} />
          </Route>
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
