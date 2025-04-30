import { useState } from 'react';


const Navbar = () => {
  const [activeItem, setActiveItem] = useState('Home');
  
  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'My Shops', path: '/my-shops' },
    { name: 'Become Seller', path: '/become-seller' }
  ];
  
  return (
    <nav className="bg-white w-full">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Navigation Items */}
          <div className="flex">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.path}
                className={`inline-flex items-center px-4 border-b-2 ${
                  activeItem === item.name
                    ? 'border-[var(--secondary)] text-[var(--secondary)]'
                    : 'border-transparent hover:text-[var(--button)]'
                } text-sm font-medium`}
                onClick={() => setActiveItem(item.name)}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;