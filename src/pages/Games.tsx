import NavBar from "../components/NavBar.tsx";
import Footer from "../components/Footer.tsx";
import {useEffect, useState} from "react";
import GameCard, {GameCardProps} from "../components/GameCard.tsx";

export default function Games() {
    const [games, setGames] = useState([]);
    const [error, setError] = useState("");

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
                    <h1 className="text-2xl font-bold mb-4 text-white">Games</h1>
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
            <Footer/>
        </>
    );
}