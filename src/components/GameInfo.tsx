import {Avatar, Card, ListGroup} from "flowbite-react";
import {GameCardProps} from "./GameCard.tsx";
import WhitePawn from "/pieces/wP.svg";
import BlackPawn from "/pieces/bP.svg";
import {useEffect, useRef, useState} from "react";

interface EventSourceProps {
    eventSource?: EventSource | null;
}

export default function GameInfo(props: GameCardProps & EventSourceProps) {
    const [moves, setMoves] = useState<string[]>(props.moves);
    const subscribed = useRef<boolean>(false);

    function registerEvent(): void {
        if(subscribed.current || !props.eventSource) return;

        props.eventSource.addEventListener("move", (event: MessageEvent) => {
            const data: string = event.data;
            setMoves(moves => [...moves, data]);
        });

        subscribed.current = true;
    }

    useEffect(() => {
        registerEvent();
    }, [props.eventSource]);

    return (
        <Card className="w-fullmx-auto border text-white dark:border-white/20 dark:bg-gray-700/10 rounded-lg">
            <h5 className="text-2xl font-bold tracking-tight text-center mb-4">
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
                        {props.playerWhite && <p className="font-medium">{props.playerWhite.username}</p>}
                        <p className="text-sm text-gray-400">White</p>
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="text-right mr-3 ml-10">
                        {props.playerBlack && <p className="font-medium">{props.playerBlack.username}</p>}
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
                    {moves && moves.map((move, index) => (
                        <ListGroup.Item key={index} className="py-2 px-4 dark:bg-[#374151]">
                            <span className="font-mono">{index + 1}. {move}</span>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </div>
        </Card>
    );
}