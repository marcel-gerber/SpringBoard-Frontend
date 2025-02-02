import NavBar from "../components/NavBar.tsx";
import Chessboard from "../components/Chessboard.tsx";
import {useParams} from "react-router-dom";
import Footer from "../components/Footer.tsx";
import {useEffect, useRef, useState} from "react";
import {GameCardProps} from "../components/GameCard.tsx";
import {useAuth} from "../services/AuthProvider.tsx";
import GameInfo from "../components/GameInfo.tsx";

export default function Game() {
    const [game, setGame] = useState<GameCardProps>({} as GameCardProps);
    const [error, setError] = useState("");
    const eventSourceRef = useRef<EventSource | null>(null);

    const {playerId} = useAuth();
    const {gameId} = useParams();

    function canPlay(): boolean {
        if(game.playerWhite === null || game.playerBlack === null) return false;
        return game.playerWhite.id === playerId || game.playerBlack.id === playerId;
    }

    async function fetchGame() {
        const response = await fetch(`http://localhost:8080/api/games/${gameId}`);

        if(response.ok) {
            const data = await response.json();
            setGame(data);
            return;
        }
        throw new Error("Game not found");
    }

    function subscribeToSSE() {
        if(eventSourceRef.current) return;
        eventSourceRef.current = new EventSource(`http://localhost:8080/api/games/${gameId}/events`);
    }

    useEffect(() => {
        fetchGame()
            .then(subscribeToSSE)
            .catch(e => {
                const error: Error = e as Error;
                setError(error.message);
            });

        return () => {
            eventSourceRef.current?.close();
        }
    }, [gameId]);

    return (
        <>
            <NavBar />
            <main className="pt-16">
                <div className="flex flex-col 2xl:flex-row items-center justify-center p-4 mt-4 relative">
                    {error ? (
                        <p className="text-red-500">Error: {error}</p>
                    ) : (
                        <>
                            <div className="order-2 2xl:order-1 w-full flex justify-center mx-auto">
                                {game.fen && <Chessboard fen={game.fen} gameId={game.id} readOnly={!canPlay()} apiCalls={true}
                                                         eventSource={eventSourceRef.current} />}
                            </div>
                            <div className="order-1 2xl:order-2 w-auto 2xl:absolute 2xl:right-4 2xl:top-1/2 2xl:transform 2xl:-translate-y-1/2 p-4">
                                <GameInfo key={game.id} eventSource={eventSourceRef.current} {...game} />
                            </div>
                        </>
                    )}
                </div>
            </main>
            <Footer/>
        </>
    );
}