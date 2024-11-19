import {Piece} from "./Piece.ts";
import {Color, PieceType} from "../Types.ts";
import {Move} from "../Move.ts";
import {Square} from "../Square.ts";

export class King extends Piece {

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
        return this.color == Color.WHITE ? "/pieces/wK.svg" : "/pieces/bK.svg";
    }

    public type(): PieceType {
        return PieceType.KING;
    }

    public character(): string {
        return this.color == Color.WHITE ? "K" : "k";
    }

}