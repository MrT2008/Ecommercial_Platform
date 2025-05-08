import { useAuth } from '../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getSellerId } from "../../api/sellerAPI";
import { useState, useEffect } from 'react';

const Navbar = () => {
  const { user } = useAuth();
  const location = useLocation();
  const roles = user?.roles || [];
  const navigate = useNavigate();

  const [pendingShopId, setPendingShopId] = useState(null);
  const [hasPendingShop, setHasPendingShop] = useState(false);

  const isSeller = roles.includes('seller');
  const isAdmin = roles.includes('admin');
  const [shopId, setShopId] = useState(null);

  useEffect(() => {
    const fetchShopId = async () => {
      try {
        const userId = getSellerId();
        const res = await fetch(`http://localhost:8080/seller/getShop/${userId}`);
        const data = await res.json();
        setShopId(data.data.shop.id);
      } catch (err) {
        console.error("Lỗi khi lấy shopId:", err);
      }
    };

    if (isSeller) {
      fetchShopId();
    }
  }, [isSeller]);

   // Check if the user has a pending shop application
   useEffect(() => {
    const checkPendingShop = async () => {
      try {
        const res = await fetch('http://localhost:8080/manager/shops/pendings/');
        const data = await res.json();
        
        if (data && data.shops && Array.isArray(data.shops)) {
          // Find if current user has a pending shop
          const pendingShop = data.shops.find(shop => shop.ownerId === user.id);
          
          if (pendingShop) {
            setHasPendingShop(true);
            setPendingShopId(pendingShop.id);
          }
        }
      } catch (err) {
        console.error("Error checking pending shops:", err);
      }
    };

    if (user && user.id && !isSeller && !isAdmin) {
      checkPendingShop();
    }
  }, [user, isSeller, isAdmin]);

  // Redirect logic when clicking on "Become Seller"
  const handleBecomeSeller = (e) => {
    if (hasPendingShop) {
      e.preventDefault();
      navigate(`/shop-application-status/${pendingShopId}`);
    }
  };

  const menuItems = [
    { name: 'Home', path: '/' },
    // isSeller && { name: 'My Shop', path: '/guest/shop/${shopid}' },
    isSeller && shopId && { name: 'My Shop', path: `/guest/shop/${shopId}` },
    !isSeller && !isAdmin && { 
      name: 'Become Seller', 
      path: hasPendingShop ? `/buyer/shop-pending-status` : '/become-seller',
      onClick: handleBecomeSeller 
    },
    isAdmin && { name: 'Admin Dashboard', path: '/admin/admin-dashboard' },
  ].filter(Boolean);


  return (
    <nav className="bg-white w-full">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Navigation Items */}
          <div className="flex">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`inline-flex items-center px-4 border-b-2 ${
                    isActive

                      ? 'active border-[var(--secondary)] text-[var(--secondary)]'

                      : 'border-transparent hover:text-[var(--button)]'
                  } text-sm font-medium`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
