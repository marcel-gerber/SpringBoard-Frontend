export type GameCardProps = {
    id: string;
    fen: string;
    state: string;
    playerWhite: { id: string; username: string };
    playerBlack: { id: string; username: string };
    moves: string[];
};

export default function GameCard({id, fen, state, playerWhite, playerBlack, moves}: GameCardProps) {
    return (
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4 shadow-md w-full max-w-sm mx-auto">
            <h2 className="text-lg font-bold text-white">Game ID: {id}</h2>
            <p className="text-sm text-gray-300 mt-2">State: {state}</p>
            <div className="mt-4">
                <h3 className="text-white font-semibold">Players</h3>
                <p className="text-gray-300">
                    <span className="font-bold">White:</span> {playerWhite.username}
                </p>
                <p className="text-gray-300">
                    <span className="font-bold">Black:</span> {playerBlack.username}
                </p>
            </div>
            <div className="mt-4">
                <h3 className="text-white font-semibold">Moves</h3>
                <p className="text-gray-300">{moves.join(", ") || "No moves yet"}</p>
            </div>
        </div>
    );
}
