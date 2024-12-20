import NavBar from "../components/NavBar.tsx";
import Chessboard from "../components/Chessboard.tsx";
import {useParams} from "react-router-dom";
import Footer from "../components/Footer.tsx";
import {useEffect, useState} from "react";
import {GameCardProps} from "../components/GameCard.tsx";
import {useAuth} from "../services/AuthProvider.tsx";
import WhitePawn from "/pieces/wP.svg";
import BlackPawn from "/pieces/bP.svg";

export default function Game() {
    const [game, setGame] = useState<GameCardProps>({} as GameCardProps);
    const [error, setError] = useState("");
    const {isLoggedIn} = useAuth();
    const {gameId} = useParams();

    useEffect(() => {
        const fetchGame = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/games/${gameId}`);

                if(response.ok) {
                    const data = await response.json();
                    setGame(data);
                }
            } catch (error) {
                setError(error as string);
            }
        };

        fetchGame();
    }, [gameId]);

    if(error) {
        return <p className="text-red-500">Error: Game not found</p>;
    }

    return (
        <>
            <NavBar />
            <main className="pt-16">
                <div className="flex justify-center p-4 mt-4">
                    {game.fen && <Chessboard fen={game.fen} readOnly={!isLoggedIn}/>}
                </div>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 border border-white/20 bg-gray-700/10
                rounded-lg p-4 w-64 text-white">
                    <div className="mb-4">
                        <div className="text-center flex items-center justify-center space-x-2 mr-10">
                            <img src={BlackPawn} alt="Black Pawn" className="w-8 h-8"/>
                            <h2 className="text-xl font-bold">Black</h2>
                        </div>
                        {game.playerBlack && <p className="text-center">{game.playerBlack.username}</p>}
                    </div>

                    <div className="">
                        <div className="text-center flex items-center justify-center space-x-2 mr-10">
                            <img src={WhitePawn} alt="White Pawn" className="w-8 h-8"/>
                            <h2 className="text-xl font-bold">White</h2>
                        </div>
                        {game.playerWhite && <p className="text-center">{game.playerWhite.username}</p>}
                    </div>
                </div>
            </main>
            <Footer/>
        </>
    );
}