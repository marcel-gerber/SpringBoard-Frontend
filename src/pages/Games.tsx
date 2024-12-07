import NavBar from "../components/NavBar.tsx";
import Footer from "../components/Footer.tsx";
import {useEffect, useState} from "react";

export default function Games() {
    const [games, setGames] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/games", {
                    credentials: "include", // Send cookies (including httpOnly cookie)
                });

                if(response.ok) {
                    const data = await response.json();
                    setGames(data);
                }
            } catch (error) {
                setError(error);
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
                        <ul>
                            {games.map((game) => (
                                <li key={game.id}>{game.fen}</li>
                            ))}
                        </ul>
                    )}
                </div>
            </main>
            <Footer/>
        </>
    );
}