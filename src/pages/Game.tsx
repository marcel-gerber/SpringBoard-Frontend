import NavBar from "../components/NavBar.tsx";
import Chessboard from "../components/Chessboard.tsx";
import {useParams} from "react-router-dom";
import Footer from "../components/Footer.tsx";
import {useEffect, useState} from "react";
import {GameCardProps} from "../components/GameCard.tsx";
import {useAuth} from "../services/AuthProvider.tsx";

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
                    {game.fen && <Chessboard fen={game.fen} readOnly={!isLoggedIn} />}
                </div>
            </main>
            <Footer />
        </>
    );
}