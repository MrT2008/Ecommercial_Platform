import { useLocation } from 'react-router-dom';
const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const isActive = (path) => currentPath === path;

    return (
      <div className="w-1/5 h-screen p-12">
        <h2 className="text-lg font-bold mb-4">Manage Account</h2>
        <ul className="mb-6">
          <li className="mb-2">
            <a href="/account/profile" className={`px-4 ${isActive('/account/profile') ? 'active' : ''}`}>
              Profile
            </a>
          </li>
          <li className="mb-2">
            <a href="/account/address" className={`px-4 ${isActive('/account/address') ? 'active' : ''}`}>
              Address
            </a>
          </li>
          <li className="mb-2">
            <a href="/account/credit_card" className={`px-4 ${isActive('/account/credit_card') ? 'active' : ''}`}>
              Credit Card
            </a>
          </li>
          <li className="mb-2">
            <a href="/account/changing_password" className={`px-4 ${isActive('/account/changing_password') ? 'active' : ''}`}>
              Changing Password
            </a>
          </li>
        </ul>
        <h2 className="text-lg font-bold mb-4">Orders Management</h2>
        <ul className="mb-6">
          <li className="mb-2">
            <a href="/account/pending" className={`px-4 ${isActive('/account/pending') ? 'active' : ''}`}>
              Pending Payment
            </a>
          </li>
          <li className="mb-2">
            <a href="/account/ongoing" className={`px-4 ${isActive('/account/ongoing') ? 'active' : ''}`}>
              Ongoing Orders
            </a>
          </li>
          <li className="mb-2">
            <a href="/account/completed" className={`px-4 ${isActive('/account/completed') ? 'active' : ''}`}>
              Completed Orders
            </a>
          </li>
          <li className="mb-2">
            <a href="/account/cancellations" className={`px-4 ${isActive('/account/cancellations') ? 'active' : ''}`}>
              Cancellations
            </a>
          </li>
        </ul>
      </div>
    );
  };
  
  export default Sidebar;