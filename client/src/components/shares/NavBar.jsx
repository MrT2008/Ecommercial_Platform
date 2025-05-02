import { useContext } from "react";
import { AuthContext } from "../../hooks/AuthContext";
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const roles = user?.roles || [];
  const isSeller = roles.includes('seller');

  const menuItems = [
    { name: 'Home', path: '/' },
    isSeller
      ? { name: 'My Shops', path: '/seller/seller-dashboard' }
      : { name: 'Become Seller', path: '/become-seller' }
  ];

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
                      ? 'border-[var(--secondary)] text-[var(--secondary)]'
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
