import {Avatar, Card, ListGroup} from "flowbite-react";
import {GameCardProps} from "./GameCard.tsx";
import WhitePawn from "/pieces/wP.svg";
import BlackPawn from "/pieces/bP.svg";

export default function GameInfo(gameCardProps: GameCardProps) {
    return (
        <Card className="w-fullmx-auto border dark:border-white/20 dark:bg-gray-700/10 rounded-lg">
            <h5 className="text-2xl font-bold tracking-tight text-white text-center mb-4">
                Info
            </h5>
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                    <Avatar
                        img={WhitePawn}
                        size="lg"
                        className="mr-3"
                    />
                    <div className="text-left mr-10">
                        {gameCardProps.playerWhite && <p className="font-medium">{gameCardProps.playerWhite.username}</p>}
                        <p className="text-sm text-gray-400">White</p>
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="text-right mr-3 ml-10">
                        {gameCardProps.playerBlack && <p className="font-medium">{gameCardProps.playerBlack.username}</p>}
                        <p className="text-sm text-gray-500 dark:text-gray-400">Black</p>
                    </div>
                    <Avatar
                        img={BlackPawn}
                        size="lg"
                    />
                </div>
            </div>
            <h6 className="text-lg font-semibold mb-2">Played moves</h6>
            <div className="h-48 overflow-y-auto">
                <ListGroup>
                    {gameCardProps.moves && gameCardProps.moves.map((move, index) => (
                        <ListGroup.Item key={index} className="py-2 px-4 dark:bg-[#374151]">
                            <span className="font-mono">{index + 1}. {move}</span>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </div>
        </Card>
    );
}