import Logo from "/pieces/wN.svg";
import {Link} from "react-router-dom";

export default function NavBar() {
    return (
        <>
            <nav
                className="backdrop-blur-md bg-opacity-70 bg-[#141414] fixed border-b border-white/10 top-0 w-full z-50">
                <div className="container mx-auto px-48 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <img src={Logo} alt="Logo" className="w-8 h-8"/>
                        <div className="text-white font-semibold text-lg">SpringBoard</div>
                    </div>
                    <div className="hidden md:flex space-x-6">
                        <Link to="/" className="text-gray-100 hover:text-white transition">Home</Link>
                        <Link to="/games" className="text-gray-100 hover:text-white transition">Games</Link>
                        <Link to="/login" className="text-gray-100 hover:text-white transition">Login</Link>
                        <Link to="/signup" className="text-gray-100 hover:text-white transition">Signup</Link>
                    </div>
                    <div className="md:hidden text-gray-300">Menu</div>
                </div>
            </nav>
        </>
    );
}