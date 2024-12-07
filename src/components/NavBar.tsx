import Logo from "/pieces/wN.svg";

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
                        <a href="/" className="text-gray-100 hover:text-white transition">Home</a>
                        <a href="/games" className="text-gray-100 hover:text-white transition">Games</a>
                        <a href="/login" className="text-gray-100 hover:text-white transition">Login</a>
                        <a href="/signup" className="text-gray-100 hover:text-white transition">Signup</a>
                    </div>
                    <div className="md:hidden text-gray-300">Menu</div>
                </div>
            </nav>
        </>
    );
}