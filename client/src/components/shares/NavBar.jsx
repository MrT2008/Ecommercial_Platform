import { useAuth } from '../../hooks/useAuth';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const { user } = useAuth();
  const location = useLocation();
  const roles = user?.roles || [];

  const isSeller = roles.includes('seller');
  const isAdmin = roles.includes('admin');

  const menuItems = [
    { name: 'Home', path: '/' },
    isSeller && { name: 'My Shop', path: '/shop/:id' },
    !isSeller && !isAdmin && { name: 'Become Seller', path: '/become-seller' },
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