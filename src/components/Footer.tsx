export default function Footer() {
    return (
        <>
            <footer className="text-gray-400 py-4">
                <div className="container mx-auto text-center">
                    <p>&copy; {new Date().getFullYear()} SpringBoard. All rights reserved.</p>
                    <div className="mt-2 flex justify-center space-x-4">
                        <a href="#" className="hover:text-white">Privacy Policy</a>
                        <a href="#" className="hover:text-white">Terms of Service</a>
                        <a href="#" className="hover:text-white">Contact</a>
                    </div>
                </div>
            </footer>
        </>
    );
}