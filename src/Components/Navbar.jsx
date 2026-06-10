import React from 'react';
import logo from '../assets/Logo/image.png';
import { useAuth } from '../Authpovider/CustomHook'; // Using your custom hook path
import { Link } from 'react-router';

const Navbar = () => {
    // Extract user state, login, and logout methods from your custom hook
    const { user, signInWithGoogle, logoutUser } = useAuth();
    const NavbarLinks = <>
        <Link to={'/home'}>Home</Link>
        <Link to={'/books'}>Books</Link>
        <Link to={'/tutorial'}>Tutorial</Link>

    </>
    const Navlinks = <>
        <Link className='px-4 py-2 text-xs text-gray-500' to={'/addBooks'}>Add Book</Link>
        <Link className='px-4 py-2 text-xs text-gray-500' to={'/manageBooks'}>Manage Books</Link>

    </>

    const handleGoogleLogin = () => {
        signInWithGoogle()
            .then((result) => {
                console.log("Logged in user info:", result.user);
            })
            .catch((error) => {
                console.error("Google sign-in error:", error.message);
            });
    };

    const handleLogout = () => {
        logoutUser()
            .then(() => console.log("Logged out successfully"))
            .catch((error) => console.error("Logout error:", error.message));
    };

    return (
        <div>
            <div className="navbar bg-[#006A4E] shadow-lg shadow-[#006A4E] rounded-b-xl">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu font-semibold menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {NavbarLinks}
                        </ul>
                    </div>
                    <div>
                        <div>
                            <img src={logo} className='h-17 rounded-md border border-gray-300' alt="Logo" />
                        </div>
                    </div>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu text-xl xl:gap-5 gap-2 text-white menu-horizontal px-1">
                        {NavbarLinks}

                    </ul>
                </div>

                {/* Right Side: Conditional rendering based on user presence */}
                <div className="navbar-end gap-2">
                    {user ? (
                        /* 1. Parent Dropdown Container containing BOTH the button trigger and the list */
                        <div className="dropdown dropdown-end">

                            {/* Trigger Button: Combines the Avatar image + the "Options" text */}
                            <div
                                tabIndex={0}
                                role="button"
                                className="btn py-3 h-auto rounded-lg bg-[#F42A41] text-white shadow shadow-[#F42A41] border-1 border-[#F42A41] flex items-center gap-2"
                            >
                                <div className="avatar">
                                    <div className="w-13 rounded-full border border-white">
                                        <img
                                            alt="User Profile"
                                            src={user?.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                                        />
                                    </div>
                                </div>
                                <span className='text-lg'>Options</span>
                            </div>

                            {/* Dropdown Menu Content (MUST be inside the parent dropdown div) */}
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow-xl font-semibold text-gray-800"
                            >
                                <li className="px-4 py-2 text-xs text-gray-500 border-b border-gray-100 break-words">
                                    {user?.displayName || "User"}
                                </li>
                                {Navlinks}

                                <li>
                                    <button onClick={handleLogout} className="text-red-500 hover:bg-red-50">
                                        Logout
                                    </button>
                                </li>
                            </ul>

                        </div>
                    ) : (
                        /* 2. If no user is logged in, show the basic Google Login button */
                        <button
                            onClick={handleGoogleLogin}
                            className="btn py-4 h-auto rounded-lg mr-2 bg-[#F42A41] text-white shadow shadow-[#F42A41] border-1 border-[#F42A41]"
                        >
                            Login with Google
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;