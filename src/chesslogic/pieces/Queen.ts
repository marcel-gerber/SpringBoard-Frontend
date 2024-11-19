import {Piece} from "./Piece.ts";
import {Color, PieceType} from "../Types.ts";
import {Move} from "../Move.ts";
import {Square} from "../Square.ts";

export class Queen extends Piece {

    public constructor(color: Color) {
        super(color);
    }

    public pseudoLegalMoves(): Array<Move> {
        return new Array<Move>();
    }

    public attackedSquares(): Array<Square> {
        return new Array<Square>();
    }

    public image(): string | null {
        return this.color == Color.WHITE ? "/pieces/wQ.svg" : "/pieces/bQ.svg";
    }

    public type(): PieceType {
        return PieceType.QUEEN;
    }

    public character(): string {
        return this.color == Color.WHITE ? "Q" : "q";
    }

}