import NavBar from "../components/NavBar.tsx";
import Chessboard from "../components/Chessboard.tsx";
import {useParams} from "react-router-dom";
import Footer from "../components/Footer.tsx";
import {useEffect, useState} from "react";
import {GameCardProps} from "../components/GameCard.tsx";
import {useAuth} from "../services/AuthProvider.tsx";
import GameInfo from "../components/GameInfo.tsx";

export default function Game() {
    const [game, setGame] = useState<GameCardProps>({} as GameCardProps);
    const [error, setError] = useState("");
    const {playerId} = useAuth();
    const {gameId} = useParams();

    function canPlay(): boolean {
        if(game.playerWhite === null || game.playerBlack === null) return false;
        return game.playerWhite.id === playerId || game.playerBlack.id === playerId;
    }

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
                    {game.fen && <Chessboard fen={game.fen} readOnly={!canPlay()}/>}
                </div>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 p-4 text-white">
                    <GameInfo key={game.id} {...game} />
                </div>
            </main>
            <Footer/>
        </>
    );
}