import {Link} from "react-router-dom";
import {useAuth} from "../services/AuthProvider.tsx";
import {useState} from "react";
import { VscThreeBars } from "react-icons/vsc";

export default function NavBar() {
    const { isLoggedIn, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <nav
                className="backdrop-blur-md bg-opacity-70 bg-[#141414] fixed border-b border-white/10 top-0 w-full z-50">
                <div className="container mx-auto px-12 md:px-24 lg:px-48 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <img src="/pieces/wN.svg" alt="Logo" className="w-8 h-8" />
                        <div className="text-white font-semibold text-lg">SpringBoard</div>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-6">
                        <Link to="/" className="text-gray-100 hover:text-white transition">Home</Link>
                        <Link to="/games" className="text-gray-100 hover:text-white transition">Games</Link>
                        {isLoggedIn ? (
                            <button onClick={logout} className="text-gray-100 hover:text-white transition">
                                Logout
                            </button>
                        ) : (
                            <>
                                <Link to="/login" className="text-gray-100 hover:text-white transition">Login</Link>
                                <Link to="/signup" className="text-gray-100 hover:text-white transition">Signup</Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-300 hover:text-white focus:outline-none"
                        >
                            <VscThreeBars size={30} />
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                {isMenuOpen && (
                    <div className="md:hidden absolute top-full w-full bg-[#141414] shadow-lg rounded-b-lg py-2">
                        <Link to="/" className="block px-4 py-2 text-gray-100 hover:text-white">Home</Link>
                        <Link to="/games" className="block px-4 py-2 text-gray-100 hover:text-white">Games</Link>
                        {isLoggedIn ? (
                            <button
                                onClick={logout}
                                className="block px-4 py-2 text-gray-100 hover:text-white"
                            >
                                Logout
                            </button>
                        ) : (
                            <>
                                <Link to="/login" className="block px-4 py-2 text-gray-100 hover:text-white">
                                    Login
                                </Link>
                                <Link to="/signup" className="block px-4 py-2 text-gray-100 hover:text-white">
                                    Signup
                                </Link>
                            </>
                        )}
                    </div>
                )}
            </nav>
        </>
    );
}