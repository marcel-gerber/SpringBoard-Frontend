import {Board} from "../chesslogic/Board.ts";
import {Move} from "../chesslogic/Move.ts";
import {Square} from "../chesslogic/Square.ts";
import {Color, SquareValue} from "../chesslogic/Types.ts";
import {Pawn} from "../chesslogic/pieces/Pawn.ts";
import {NullPiece} from "../chesslogic/pieces/NullPiece.ts";

test("BoardSetAndGetFen", () => {
    const board: Board = new Board();

    const fenArray: Array<string> = [
        "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
        "r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq - 0 1",
        "8/2p5/3p4/KP5r/1R3p1k/8/4P1P1/8 w - - 0 1",
        "r3k2r/Pppp1ppp/1b3nbN/nP6/BBP1P3/q4N2/Pp1P2PP/R2Q1RK1 w kq - 0 1",
        "rnbq1k1r/pp1Pbppp/2p5/8/2B5/8/PPP1NnPP/RNBQK2R w KQ - 1 8",
        "r4rk1/1pp1qppp/p1np1n2/2b1p1B1/2B1P1b1/P1NP1N2/1PP1QPPP/R4RK1 w - - 0 1"
    ];

    for(const fen of fenArray) {
        board.setFen(fen);
        expect(board.getFen()).toBe(fen);
    }
});

test("BoardMakeAndUnmakeMove", () => {
    const board: Board = new Board();
    board.setFen("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");

    // Make moves
    const moveWhite: Move = new Move(new Square(SquareValue.E2), new Square(SquareValue.E4));
    board.makeMove(moveWhite);
    expect(board.getPiece(12)).toBe(NullPiece.instance);
    expect(board.getPiece(28)).toEqual(new Pawn(Color.WHITE));

    const moveBlack: Move = new Move(new Square(SquareValue.E7), new Square(SquareValue.E5));
    board.makeMove(moveBlack);
    expect(board.getPiece(52)).toBe(NullPiece.instance);
    expect(board.getPiece(36)).toEqual(new Pawn(Color.BLACK));

    // Unmake moves
    board.unmakeMove(moveBlack);
    expect(board.getPiece(52)).toEqual(new Pawn(Color.BLACK));
    expect(board.getPiece(36)).toBe(NullPiece.instance);

    board.unmakeMove(moveWhite);
    expect(board.getPiece(12)).toEqual(new Pawn(Color.WHITE));
    expect(board.getPiece(28)).toBe(NullPiece.instance);
});