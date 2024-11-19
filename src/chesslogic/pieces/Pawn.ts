import {Piece} from "./Piece.ts";
import {Square} from "../Square.ts";
import {Move} from "../Move.ts";
import {Color, PieceType} from "../Types.ts";

export class Pawn extends Piece {

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
        return this.color == Color.WHITE ? "/pieces/wP.svg" : "/pieces/bP.svg";
    }

    public type(): PieceType {
        return PieceType.PAWN;
    }

    public character(): string {
        return this.color == Color.WHITE ? "P" : "p";
    }

}