import {Board} from "../chesslogic/Board.ts";

function Chessboard() {
    const board = [
        ["bR", "bN", "bB", "bQ", "bK", "bB", "bN", "bR"],
        ["bP", "bP", "bP", "bP", "bP", "bP", "bP", "bP"],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["wP", "wP", "wP", "wP", "wP", "wP", "wP", "wP"],
        ["wR", "wN", "wB", "wQ", "wK", "wB", "wN", "wR"],
    ];

    const test: Board = new Board();
    test.print();

    function getSquareColor(row: number, col: number): string {
        return (row + col) % 2 === 0 ? "bg-gray-200" : "bg-gray-700";
    }

    function getPieceImage(piece: string): string | null {
        return piece ? `/pieces/${piece}.svg` : null;
    }

    return (
        <div className="grid grid-cols-8 w-[700px]">
            {board.flat().map((piece, index) => {
                const row = Math.floor(index / 8);
                const col = index % 8;
                const pieceImage = getPieceImage(piece);

                return (
                    <div
                        key={index}
                        className={`${getSquareColor(row, col)} flex items-center justify-center aspect-square`}
                    >
                        {pieceImage && <img src={pieceImage} alt={piece} className="w-full h-full"/>}
                    </div>
                );
            })}
        </div>
    );
}

export default Chessboard;
