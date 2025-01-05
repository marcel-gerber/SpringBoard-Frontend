import {useEffect, useReducer, useRef, useState} from "react";
import {Board} from "../chesslogic/Board.ts";
import {Piece} from "../chesslogic/pieces/Piece.ts";
import {Move} from "../chesslogic/Move.ts";
import {NullPiece} from "../chesslogic/pieces/NullPiece.ts";

interface ChessboardProps {
    fen: string;
    gameId?: string;
    readOnly?: boolean;
    apiCalls?: boolean;
    eventSource?: EventSource | null;
}

function boardReducer(state: Board, action: { type: "move"; move: Move }): Board {
    const newBoard = state.copy();
    newBoard.makeMove(action.move);
    return newBoard;
}

export default function Chessboard({ fen, gameId = "", readOnly = false, apiCalls = false, eventSource = null }: ChessboardProps) {
    const initialBoard = new Board();
    initialBoard.setFen(fen);

    const [board, dispatcher] = useReducer(boardReducer, initialBoard);
    const [attackedSquares, setAttackedSquares] = useState<Array<number>>([]);
    const [draggedPiece, setDraggedPiece] = useState<number | null>(null);

    const legalMoves = useRef<Array<Move>>(board.getLegalMoves());
    const subscribed = useRef<boolean>(false);

    function registerEvent(): void {
        if(!apiCalls || gameId === "" || !eventSource) return;
        if(subscribed.current) return;

        eventSource.addEventListener("move", (event: MessageEvent) => {
            const data: string = event.data;

            const move: Move | undefined = legalMoves.current.find((move) => move.toPureCoordinateNotation() === data);
            if(!move) return;

            dispatcher({ type: "move", move });
        });

        eventSource.onerror = (error) => {
            console.error(error);
            eventSource.close();
        }

        subscribed.current = true;
    }

    useEffect(() => {
        registerEvent();
    }, [eventSource]);

    // Update legalMoves when board gets updated
    useEffect(() => {
        setAttackedSquares([]);
        legalMoves.current = board.getLegalMoves();
    }, [board]);

    function getSquareColor(row: number, col: number): string {
        return (row + col) % 2 === 0 ? "bg-gray-200" : "bg-gray-700";
    }

    function updateAttackedSquares(index: number): void {
        if(readOnly) return;

        setAttackedSquares(legalMoves.current
            .filter(value => value._from.getIndex() == index)
            .map(value => value._to.getIndex()));
    }

    function handleDragStart(index: number): void {
        if(readOnly) return;

        updateAttackedSquares(index);
        setDraggedPiece(index);
    }

    function handleDragOver(event: React.DragEvent): void {
        event.preventDefault();
    }

    async function makeMoveRequest(move: Move): Promise<boolean> {
        const response = await fetch(`http://localhost:8080/api/games/${gameId}/moves`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                move: move.toPureCoordinateNotation()
            }),
        });

        return response.ok;
    }

    async function handleDrop(index: number): Promise<void> {
        if(readOnly || draggedPiece === null) return;

        const move: Move | undefined = legalMoves.current.find(
            (move) => move._from.getIndex() === draggedPiece && move._to.getIndex() === index
        );
        if(!move) return;

        if(apiCalls) {
            await makeMoveRequest(move);
            return;
        }

        dispatcher({ type: "move", move });
    }

    return (
        <div className="grid grid-cols-8 w-[700px]">
            {board.pieces.map((_, idx) => {
                const row = Math.floor(idx / 8);
                const col = idx % 8;

                // Calculate index in a LERF-Mapping
                const index = 56 - row * 8 + col;

                const piece: Piece = board.getPiece(index);
                const pieceImage: string | null = piece.image();

                const isSquareAttacked: boolean = attackedSquares.includes(index);
                const isPieceAttacked: boolean = !(piece instanceof NullPiece) && isSquareAttacked;

                return (
                    <div
                        key={idx}
                        className={`${getSquareColor(row, col)} ${isPieceAttacked ? "border-4 border-red-500" : ""}
                        flex items-center justify-center aspect-square relative`}
                        onClick={() => updateAttackedSquares(index)}
                        onDragOver={handleDragOver}
                        onDrop={() => handleDrop(index)}
                    >
                        {pieceImage && (
                            <img
                                src={pieceImage}
                                alt={piece.character()}
                                className="w-full h-full cursor-pointer"
                                draggable
                                onDragStart={() => handleDragStart(index)}
                            />
                        )}
                        {isSquareAttacked && !isPieceAttacked && <div className="absolute w-7 h-7 bg-gray-400 rounded-full"></div>}
                    </div>
                );
            })}
        </div>
    );
}