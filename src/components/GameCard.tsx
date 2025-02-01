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

type HandleJoinGameProps = {
    handleJoinGame: (gameId: string, waitingPlayerId: string) => void;
};

export default function GameCard(props: GameCardProps & HandleJoinGameProps) {
    const isWaitingForPlayer: boolean = props.state === "WAITING_FOR_PLAYER_TO_JOIN";
    const waitingPlayerId: string = props.playerWhite ? props.playerWhite.id : props.playerBlack.id;

    return (
        <div className="flex flex-col sm:flex-row bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4 shadow-md w-full max-w-4xl mx-auto">
            <div className="flex justify-center items-center sm:w-1/2 sm:mt-0">
                <Chessboard fen={props.fen} readOnly={true} />
            </div>

            <div className="flex flex-col sm:w-1/2 space-y-4 mt-4 sm:mt-0 sm:pl-6">
                <Link to={`/games/${props.id}`}
                      className="text-white font-semibold hover:text-gray-300 transition">
                    <h2 className="text-lg font-bold text-white">Game ID: {props.id}</h2>
                </Link>
                <div>
                    <h3 className="text-white font-semibold">Players</h3>
                    {props.playerWhite &&
                        <p className="text-gray-300">
                            <span className="font-bold">White:</span> {props.playerWhite.username}
                        </p>
                    }
                    {props.playerBlack &&
                        <p className="text-gray-300">
                            <span className="font-bold">Black:</span> {props.playerBlack.username}
                        </p>
                    }
                </div>
                <p className="text-sm text-gray-300">State: {props.state}</p>
                <div>
                    <h3 className="text-white font-semibold">Moves</h3>
                    <p className="text-gray-300">{props.moves.join(", ") || "No moves yet"}</p>
                </div>
                {isWaitingForPlayer && (
                    <div>
                        <button
                            onClick={() => props.handleJoinGame(props.id, waitingPlayerId)}
                            className="px-8 py-2 text-white font-bold text-lg rounded-full shadow-lg
                            transition-transform transform bg-transparent border-2 border-sky-600 hover:scale-105
                            hover:shadow-sky-500/50 hover:shadow-2xl focus:outline-none">
                            Join game
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
