import { useState, useRef, useEffect } from 'react';
import Logo from "../shares/logo";
import SearchBar from "../searchBar";
import Button from "../shares/Button";
import { useAuth } from "../../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faUser} from "@fortawesome/free-regular-svg-icons";
import { faCartShopping, faRightFromBracket, faShop } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from "react-router-dom";
import Navbar from '../shares/NavBar';

const HeadingBar = () => {
    const { user, logout } = useAuth();
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();

    const isSeller = user?.roles?.includes('seller');
    const isAdmin = user?.roles?.includes('manager');
    const isBuyer = user?.roles?.includes('buyer');

    

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleAccountMenu = () => {
        setShowMenu(!showMenu);
    };

    return (

        <div className="px-8">
            <div className="w-full flex flex-col md:flex-row items-center justify-between border-b border-gray-300 px-4 py-3 gap-4">
                {/* Left side - Logo */}
                <div className="flex items-center">
                    <Link to="/" className="flex items-center">
                        <Logo changeColor="black" changeID="mall" size="text-2xl" />
                    </Link>
                </div>
    
                {/* Center - Navbar + Search */}
                <div className="flex flex-col md:flex-row items-center justify-center flex-grow gap-2 md:gap-4">
                    {user && (
                        <div className="w-full md:w-1/2">
                            <Navbar />
                        </div>
                    )}
                    <div className={`w-full ${user ? 'md:w-1/2' : 'md:w-full'}`}>
                        <SearchBar placeholder="What are you looking for?" />
                    </div>

                </div>
    
                {/* Right side - User controls */}
                <div className="flex items-center gap-4 relative">
                    {user ? (
                        <>
                            <button className="text-gray-700 hover:text-gray-900 text-md">
                                <FontAwesomeIcon icon={faBell} />
                            </button>

                            <button className="text-gray-700 hover:text-gray-900 text-md">
                                <Link to="/buyer/cart">
                                    <FontAwesomeIcon icon={faCartShopping} />
                                </Link>
                            </button>
                            <div className="relative" ref={menuRef}>
                                <button onClick={toggleAccountMenu}>
                                    <img
                                        src={user?.imageURL}
                                        alt="User profile"
                                        className="w-6 h-6 rounded-full border-gray-300"
                                    />
                                </button>
    
                                {showMenu && (
                                    <div className="absolute right-0 mt-2 w-48 bg-gray-700 border border-gray-300 rounded-lg shadow-lg z-10">
                                        <Link
                                            to="/account"
                                            className="block px-4 py-2 text-white hover:bg-gray-800 rounded-t-lg"
                                            onClick={() => setShowMenu(false)}
                                        >
                                            <FontAwesomeIcon icon={faUser} className="mr-2" />
                                            Manage Account
                                        </Link>
    
                                        {isSeller && (
                                            <Link
                                                to="/seller/seller-dashboard"
                                                className="block px-4 py-2 text-white hover:bg-gray-800"
                                                onClick={() => setShowMenu(false)}
                                            >
                                                <FontAwesomeIcon icon={faShop} className="mr-2" />
                                                Manage Shop
                                            </Link>
                                        )}
    
                                        {!isSeller && isBuyer && (
                                            <Link
                                                to="/become-seller"
                                                className="block px-4 py-2 text-white hover:bg-gray-800"
                                                onClick={() => setShowMenu(false)}
                                            >
                                                <FontAwesomeIcon icon={faShop} className="mr-2" />
                                                Manage Shop
                                            </Link>
                                        )}
    
                                        <button
                                            onClick={() => {
                                                logout();
                                                setShowMenu(false);
                                            }}
                                            className="block w-full text-left px-4 py-2 text-white hover:bg-gray-800 hover:rounded-b-lg"
                                        >
                                            <FontAwesomeIcon icon={faRightFromBracket} className="mr-2" />
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <>
                            <Button text="Sign In" otherClassName="yellow" href="/login" />
                            <Button text="Sign Up" otherClassName="blue" href="/signup" />
                        </>
                    )}
                </div>

            </div>
        </div>
    );
    
}

export default HeadingBar;