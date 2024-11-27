import {useState} from "react";
import {Board} from "../chesslogic/Board.ts";
import {Piece} from "../chesslogic/pieces/Piece.ts";
import {Move} from "../chesslogic/Move.ts";

export default function Chessboard() {
    const board: Board = new Board();
    board.setFen("r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq - 0 1");
    const legalMoves: Array<Move> = board.getLegalMoves();

    const [selectedSquare, setSelectedSquare] = useState<number | null>(null);
    const [attackedSquares, setAttackedSquares] = useState<Array<number>>([]);

    function getSquareColor(row: number, col: number): string {
        return (row + col) % 2 === 0 ? "bg-gray-200" : "bg-gray-700";
    }

    function handleClickSquare(index: number): void {
        setSelectedSquare(index);

        setAttackedSquares(legalMoves
            .filter(value => value._from.getIndex() == index)
            .map(value => value._to.getIndex()));
        console.log(attackedSquares);
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

                const isSelected: boolean = selectedSquare === index;

                return (
                    <div
                        key={idx}
                        className={`${getSquareColor(row, col)} ${isSelected ? "border-4 border-red-500" : ""}
                        flex items-center justify-center aspect-square`}
                        onClick={() => handleClickSquare(index)}
                    >
                        {pieceImage && <img src={pieceImage} alt={piece.character()} className="w-full h-full"/>}
                    </div>
                );
            })}
        </div>
    );
}