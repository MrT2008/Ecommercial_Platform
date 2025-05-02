import { useState, useRef, useEffect, useContext } from 'react';
import Logo from "../shares/logo";
import SearchBar from "../searchBar";
import Button from "../shares/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faUser } from "@fortawesome/free-regular-svg-icons";
import { faCartShopping, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Navbar from '../shares/NavBar';
import { AuthContext } from '../../hooks/AuthContext';

const HeadingBar = () => {
    const { user, logout } = useContext(AuthContext);
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();

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
        <div className="w-full flex flex-col md:flex-row items-center justify-between border-b border-gray-300 px-4 py-3 gap-4">
            {/* Left side - Logo */}
            <div className="flex items-center">
                <a href="/" className="flex items-center">
                    <Logo changeColor="black" changeID="mall" size="text-2xl" />
                </a>
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
                            <a
                                href="/buyer/cart"
                                // onClick={() => setShowMenu(false)}
                            >
                                <FontAwesomeIcon icon={faCartShopping} />

                            </a>
                        </button>
                        <div className="relative" ref={menuRef}>
                            <button
                                onClick={toggleAccountMenu}
                            >
                                <img
                                    src={user?.imageURL}
                                    alt="User profile"
                                    className="w-6 h-6 rounded-full border-gray-300"
                                />
                            </button>

                            {showMenu && (
                                <div className="absolute right-0 mt-2 w-48 bg-gray-700  border border-gray-300 rounded-lg shadow-lg z-10">
                                    <a
                                        href="/account/profile"
                                        className="block px-4 py-2 text-white hover:bg-gray-800 hover:rounded-t-lg "
                                        onClick={() => setShowMenu(false)}
                                    >
                                        <FontAwesomeIcon icon={faUser} className="mr-2" />
                                        Manage Account
                                    </a>

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
                        <Button text="Sign In" otherClassName='yellow' href="/login" />
                        <Button text="Sign Up" otherClassName='blue' href="/signup" />
                    </>
                )}
            </div>
        </div>
    )
}

export default HeadingBar;