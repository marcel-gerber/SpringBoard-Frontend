import {useEffect, useReducer, useState} from "react";
import {Board} from "../chesslogic/Board.ts";
import {Piece} from "../chesslogic/pieces/Piece.ts";
import {Move} from "../chesslogic/Move.ts";
import {NullPiece} from "../chesslogic/pieces/NullPiece.ts";

function boardReducer(state: Board, action: { type: "move"; move: Move }): Board {
    const newBoard = state.copy();
    newBoard.makeMove(action.move);
    return newBoard;
}

export default function Chessboard() {
    const initialBoard = new Board();
    initialBoard.setFen("r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq - 0 1");

    const [board, dispatcher] = useReducer(boardReducer, initialBoard);
    const [attackedSquares, setAttackedSquares] = useState<Array<number>>([]);
    const [draggedPiece, setDraggedPiece] = useState<number | null>(null);
    const [legalMoves, setLegalMoves] = useState<Array<Move>>(board.getLegalMoves());

    // Update legalMoves when board gets updated
    useEffect(() => {
        setAttackedSquares([]);
        setLegalMoves(board.getLegalMoves());
    }, [board]);

    function getSquareColor(row: number, col: number): string {
        return (row + col) % 2 === 0 ? "bg-gray-200" : "bg-gray-700";
    }

    function updateAttackedSquares(index: number): void {
        setAttackedSquares(legalMoves
            .filter(value => value._from.getIndex() == index)
            .map(value => value._to.getIndex()));
    }

    function handleDragStart(index: number): void {
        updateAttackedSquares(index);
        setDraggedPiece(index);
    }

    function handleDragOver(event: React.DragEvent): void {
        event.preventDefault();
    }

    function handleDrop(index: number): void {
        if(draggedPiece === null) return;

        const move: Move | undefined = legalMoves.find(
            (move) => move._from.getIndex() === draggedPiece && move._to.getIndex() === index
        );
        if(!move) return;

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