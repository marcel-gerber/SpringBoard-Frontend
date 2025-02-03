import {Move} from "../chesslogic/Move.ts";
import {Square} from "../chesslogic/Square.ts";
import {MoveType, PieceType, SquareValue} from "../chesslogic/Types.ts";

test("MoveToPureCoordinateNotation", () => {
    let move: Move = new Move(new Square(SquareValue.E2), new Square(SquareValue.E4));
    expect(move.toPureCoordinateNotation()).toEqual("e2e4");

    move = new Move(new Square(SquareValue.G8), new Square(SquareValue.F6));
    expect(move.toPureCoordinateNotation()).toEqual("g8f6");

    move = new Move(new Square(SquareValue.D7), new Square(SquareValue.D8), MoveType.PROMOTION, PieceType.QUEEN);
    expect(move.toPureCoordinateNotation()).toEqual("d7d8q");
});