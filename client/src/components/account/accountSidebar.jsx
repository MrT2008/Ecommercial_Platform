import { useLocation, Link } from 'react-router-dom';
const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const isActive = (path) => currentPath === path;

    return (
      <div className="w-1/5 h-screen p-12">
        <h2 className="text-lg font-bold mb-4">Manage Account</h2>
        <ul className="mb-6">
          <li className="mb-2">
            <Link to="/account/profile" className={`px-4 ${isActive('/account/profile') ? 'active' : ''}`}>
              Profile
            </Link>
          </li>
          <li className="mb-2">
            <Link to="/account/address" className={`px-4 ${isActive('/account/address') ? 'active' : ''}`}>
              Address
            </Link>
          </li>
          <li className="mb-2">
            <Link to="/account/credit_card" className={`px-4 ${isActive('/account/credit_card') ? 'active' : ''}`}>
              Credit Card
            </Link>
          </li>
          <li className="mb-2">
            <Link to="/account/changing_password" className={`px-4 ${isActive('/account/changing_password') ? 'active' : ''}`}>
              Changing Password
            </Link>
          </li>
        </ul>
        <h2 className="text-lg font-bold mb-4">Orders Management</h2>
        <ul className="mb-6">
          <li className="mb-2">
            <Link to="/account/pending" className={`px-4 ${isActive('/account/pending') ? 'active' : ''}`}>
              Pending Payment
            </Link>
          </li>
          <li className="mb-2">
            <Link to="/account/ongoing" className={`px-4 ${isActive('/account/ongoing') ? 'active' : ''}`}>
              Ongoing Orders
            </Link>
          </li>
          <li className="mb-2">
            <Link to="/account/completed" className={`px-4 ${isActive('/account/completed') ? 'active' : ''}`}>
              Completed Orders
            </Link>
          </li>
          <li className="mb-2">
            <Link to="/account/cancellations" className={`px-4 ${isActive('/account/cancellations') ? 'active' : ''}`}>
              Cancellations
            </Link>
          </li>
        </ul>
      </div>
    );
  };
  
  export default Sidebar;