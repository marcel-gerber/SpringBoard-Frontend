import { Link } from "react-router-dom";
import Chessboard from "./Chessboard.tsx";

export type GameCardProps = {
    id: string;
    fen: string;
    state: string;
    playerWhite: { id: string; username: string };
    playerBlack: { id: string; username: string };
    moves: string[];
};

export default function GameCard(gameCardProps: GameCardProps) {
    return (
        <div className="flex bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4 shadow-md w-full max-w-4xl mx-auto">
            <div className="w-1/2 flex justify-center items-center">
                <Chessboard fen={gameCardProps.fen} readOnly={true} />
            </div>

            <div className="w-1/2 flex flex-col justify-center space-y-4 pl-6">
                <Link to={`/games/${gameCardProps.id}`} className="text-white font-semibold hover:text-gray-300 transition">
                    <h2 className="text-lg font-bold text-white">Game ID: {gameCardProps.id}</h2>
                </Link>
                <p className="text-sm text-gray-300 mt-2">State: {gameCardProps.state}</p>
                <div className="mt-4">
                    <h3 className="text-white font-semibold">Players</h3>
                    {gameCardProps.playerWhite &&
                        <p className="text-gray-300">
                            <span className="font-bold">White:</span> {gameCardProps.playerWhite.username}
                        </p>
                    }
                    {gameCardProps.playerBlack &&
                        <p className="text-gray-300">
                            <span className="font-bold">Black:</span> {gameCardProps.playerBlack.username}
                        </p>
                    }
                </div>
                <div className="mt-4">
                    <h3 className="text-white font-semibold">Moves</h3>
                    <p className="text-gray-300">{gameCardProps.moves.join(", ") || "No moves yet"}</p>
                </div>
            </div>
        </div>
    );
}
