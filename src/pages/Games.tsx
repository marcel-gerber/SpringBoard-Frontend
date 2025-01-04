import NavBar from "../components/NavBar.tsx";
import Footer from "../components/Footer.tsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import GameCard, {GameCardProps} from "../components/GameCard.tsx";
import {Modal} from "flowbite-react";
import WhitePawn from "/pieces/wP.svg";
import BlackPawn from "/pieces/bP.svg";
import {Color} from "../chesslogic/Types.ts";
import {useAuth} from "../services/AuthProvider.tsx";
import {AlertFailure} from "../components/Alerts.tsx";

export default function Games() {
    const [games, setGames] = useState([]);
    const [error, setError] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [showNotLoggedIn, setShowNotLoggedIn] = useState(false);
    const [showCannotJoin, setShowCannotJoin] = useState(false);

    const {isLoggedIn, playerId} = useAuth();
    const navigate = useNavigate();

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

    function handleClickOnCreateGame() {
        if(!isLoggedIn) {
            setShowNotLoggedIn(true);
            return;
        }
        setOpenModal(true);
    }

    async function handleClickOnJoinGame(gameId: string, waitingPlayerId: string) {
        if(!isLoggedIn) {
            setShowNotLoggedIn(true);
            return;
        }

        if(playerId === waitingPlayerId) {
            setShowCannotJoin(true);
            return;
        }

        const response = await fetch(`http://localhost:8080/api/games/${gameId}`, {
            method: "PUT",
            credentials: "include"
        });

        if(response.ok) {
            await response.json();
            navigate("/games/" + gameId);
        }
    }

    async function handleClickOnColor(color: Color) {
        const response = await fetch("http://localhost:8080/api/games", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                color: color == Color.WHITE ? "white" : "black",
            }),
        });

        if(response.ok) {
            const data: GameCardProps = await response.json();
            navigate("/games/" + data.id);
            return;
        }
    }

    return (
        <>
            <NavBar/>
            <main className="pt-16">
                <div className="p-4">
                    {showNotLoggedIn && (
                        <AlertFailure message={"You are not logged in!"} onClose={() => setShowNotLoggedIn(false)} />
                    )}
                    {showCannotJoin && (
                        <AlertFailure message={"You can't join your own game!"} onClose={() => setShowCannotJoin(false)} />
                    )}

                    <h1 className="text-3xl font-extrabold mb-6 text-white relative
                    after:content-[''] after:block after:mt-2 after:w-full after:h-[2px] after:bg-white/70
                    after:max-w-[90%] after:mx-auto">
                        Games
                    </h1>
                    <div className="mb-6">
                        <button
                            onClick={() => handleClickOnCreateGame()}
                            className="px-8 py-2 text-white font-bold text-lg rounded-full shadow-lg
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
                                <GameCard key={game.id} handleJoinGame={handleClickOnJoinGame} {...game} />
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <Modal
                className="bg-transparent backdrop-blur-md"
                show={openModal}
                onClose={() => setOpenModal(false)}
                size="sm"
            >
                <Modal.Header className="bg-[#141414] border-b border-white/20 rounded-t-lg">
                    <span className="text-lg font-semibold text-white">Create a new game</span>
                </Modal.Header>
                <Modal.Body className="bg-[#141414] text-white rounded-b-lg">
                    <p className="text-sm text-gray-400 font-normal">Choose a color you would like to play with</p>
                    <ul className="my-4 space-y-3">
                        <li>
                            <button
                                onClick={() => handleClickOnColor(Color.WHITE)}
                                className="flex items-center p-3 w-full text-base font-bold rounded-lg
                                hover:shadow bg-gray-700/20 hover:bg-gray-700 text-white border border-white/30">
                                <img src={WhitePawn} alt="Logo" className="w-8 h-8"/>
                                <span className="ms-3 whitespace-nowrap">White</span>
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => handleClickOnColor(Color.BLACK)}
                                className="flex items-center p-3 w-full text-base font-bold rounded-lg
                                hover:shadow bg-gray-700/20 hover:bg-gray-700 text-white border border-white/30">
                                <img src={BlackPawn} alt="Logo" className="w-8 h-8"/>
                                <span className="ms-3 whitespace-nowrap">Black</span>
                            </button>
                        </li>
                    </ul>
                </Modal.Body>
            </Modal>

            <Footer/>
        </>
    );
}