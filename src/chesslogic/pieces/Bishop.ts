import {Piece} from "./Piece.ts";
import {Color, PieceType} from "../Types.ts";
import {Move} from "../Move.ts";
import {Square} from "../Square.ts";

export class Bishop extends Piece {

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
        return this.color == Color.WHITE ? "/pieces/wB.svg" : "/pieces/bB.svg";
    }

    public type(): PieceType {
        return PieceType.BISHOP;
    }

    public character(): string {
        return this.color == Color.WHITE ? "B" : "b";
    }

}