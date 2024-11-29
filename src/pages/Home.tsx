import NavBar from "../components/NavBar.tsx";
import Chessboard from "../components/Chessboard.tsx";

export default function Home() {
    return (
        <>
            <NavBar/>
            <div className="min-h-screen bg-gradient-radial from-green-600/20 via-transparent">
                <main className="pt-16">
                    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                        <div className="px-4 py-6 sm:px-0">
                            <div className="mt-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
                                <div className="text-center">
                                    <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                                        SpringBoard
                                    </h1>
                                    <p className="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                                        Demo project using Spring Boot and React for playing Chess.
                                    </p>
                                    <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                                        <div className="rounded-md shadow">
                                            <a href="#"
                                               className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-sky-900 hover:bg-sky-700 md:py-4 md:text-lg md:px-10">
                                                Play a game
                                            </a>
                                        </div>
                                        <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                                            <a href="#"
                                               className="w-full flex items-center justify-center px-8 py-3 border border-white text-base font-medium rounded-md text-white bg-transparent hover:bg-black/70 md:py-4 md:text-lg md:px-10">
                                                Sign up
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <div className="min-h-screen bg-gradient-radial from-sky-600/20 via-transparent">
                <div className="flex items-center justify-center">
                    <Chessboard/>
                </div>
            </div>
        </>
    );
}