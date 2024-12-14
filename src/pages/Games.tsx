import NavBar from "../components/NavBar.tsx";
import Footer from "../components/Footer.tsx";
import {useEffect, useState} from "react";
import GameCard, {GameCardProps} from "../components/GameCard.tsx";
import {Modal} from "flowbite-react";

export default function Games() {
    const [games, setGames] = useState([]);
    const [error, setError] = useState("");
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/games");

                if(response.ok) {
                    const data = await response.json();
                    setGames(data);
                }
            } catch (error) {
                setError(error as string);
            }
        };

        fetchGames();
    }, []); // Empty dependency array to run only once

    return (
        <>
            <NavBar/>
            <main className="pt-16">
                <div className="p-4">
                    <h1 className="text-3xl font-extrabold mb-6 text-white relative
                    after:content-[''] after:block after:mt-2 after:w-full after:h-[2px] after:bg-white/70
                    after:max-w-[90%] after:mx-auto">
                        Games
                    </h1>
                    <div className="mb-6">
                        <button onClick={() => setOpenModal(true)} className="px-8 py-2 text-white font-bold text-lg rounded-full shadow-lg
                        transition-transform transform bg-transparent border-2 border-green-600 hover:scale-105
                        hover:shadow-green-500/50 hover:shadow-2xl focus:outline-none">
                            Create a new game
                        </button>
                    </div>
                    {error ? (
                        <p className="text-red-500">{error}</p>
                    ) : (
                        <div className="grid grid-cols-1 gap-4">
                        {games.map((game: GameCardProps) => (
                                <GameCard key={game.id} {...game} />
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <Modal
                className="bg-transparent backdrop-blur-md"
                show={openModal}
                onClose={() => setOpenModal(false)}
                size="lg"
            >
                <Modal.Header className="bg-gray-700 border-b border-white/20">
                    <h3 className="text-lg font-semibold text-white">Create a new game</h3>
                </Modal.Header>
                <Modal.Body className="bg-gray-700 text-white">
                    <div className="p-4 md:p-5">
                        <p className="text-sm text-gray-400 font-normal">Choose a color</p>
                    </div>
                </Modal.Body>
            </Modal>

            <Footer/>
        </>
    );
}