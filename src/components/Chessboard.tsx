import {Board} from "../chesslogic/Board.ts";
import {Piece} from "../chesslogic/pieces/Piece.ts";

export default function Chessboard() {
    const board: Board = new Board();
    board.setFen("r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq - 0 1");

    function getSquareColor(row: number, col: number): string {
        return (row + col) % 2 === 0 ? "bg-gray-200" : "bg-gray-700";
    }

    let index: number = 55;
    let row: number = -1;

    return (
        <div className="grid grid-cols-8 w-[700px]">
            {board.pieces.map(() => {
                index++;
                const col: number = index % 8;

                if(col == 0) {
                    row++;

                    if(row != 0) {
                        index -= 16;
                    }
                }

                const piece: Piece = board.getPiece(index);
                const pieceImage: string | null = piece.image();

                return (
                    <div
                        key={index}
                        className={`${getSquareColor(row, col)} flex items-center justify-center aspect-square`}
                    >
                        {pieceImage && <img src={pieceImage} alt={piece.character()} className="w-full h-full"/>}
                    </div>
                );
            })}
        </div>
    );
}