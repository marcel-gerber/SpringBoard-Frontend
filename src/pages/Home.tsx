import NavBar from "../components/NavBar.tsx";
import Chessboard from "../components/Chessboard.tsx";
import Footer from "../components/Footer.tsx";
import FeatureCards from "../components/FeatureCards.tsx";
import {Link} from "react-router-dom";

export default function Home() {
    return (
        <>
            <NavBar />
            <div className="min-h-screen bg-gradient-radial from-green-600/20 via-transparent">
                <main className="pt-16">
                    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                        <div className="px-4 py-6 sm:px-0">
                            <div className="mt-10 flex flex-col items-center pt-52 min-h-screen">
                                <div className="flex space-x-6 mb-6">
                                    <img
                                        src="/src/assets/spring_boot.svg"
                                        alt="Spring Boot Logo"
                                        className="h-28 w-28 p-2 rounded-lg shadow-2xl shadow-lime-600/50
                                        border border-white/10 hover:shadow-lime-600 transition-shadow"
                                    />
                                    <img
                                        src="/src/assets/react.svg"
                                        alt="React Logo"
                                        className="h-28 w-28 p-2 rounded-lg shadow-2xl shadow-sky-600/50
                                        border border-white/10 hover:shadow-sky-600 transition-shadow"
                                    />
                                </div>

                                <div className="text-center">
                                    <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                                        SpringBoard
                                    </h1>
                                    <p className="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                                        Demo project using Spring Boot and React for playing Chess.
                                    </p>
                                    <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                                        <div className="rounded-md shadow">
                                            <Link to="/login"
                                               className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-sky-900 hover:bg-sky-700 md:py-4 md:text-lg md:px-10">
                                                Login
                                            </Link>
                                        </div>
                                        <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                                            <Link to="/signup"
                                               className="w-full flex items-center justify-center px-8 py-3 border border-white text-base font-medium rounded-md text-white bg-transparent hover:bg-black/70 md:py-4 md:text-lg md:px-10">
                                                Sign up
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <div className="sm:min-h-screen min-h-[70vh] bg-gradient-radial from-sky-600/20 via-transparent">
                <div className="flex items-center justify-center m-5">
                    <Chessboard fen={"r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq - 0 1"} />
                </div>
            </div>
            <FeatureCards />
            <br/>
            <Footer />
        </>
    );
}