import {Piece} from "./Piece.ts";
import {Color, PieceType} from "../Types.ts";
import {Move} from "../Move.ts";
import {Square} from "../Square.ts";
import {Board} from "../Board.ts";
import {Attacks} from "../Attacks.ts";

export class Bishop extends Piece {

    public constructor(color: Color) {
        super(color);
    }

    public pseudoLegalMoves(board: Board, from: Square): Array<Move> {
        const legalMoves: Array<Move> = [];

        // Very important note for myself: When passing a function as a parameter, ALWAYS use
        // Inline-Arrow-Functions like shown below. Otherwise, the context of "this" will be lost
        for(const to of Attacks.getBishopAttacks(board, this, from, (square) => board.isKing(square))) {
            legalMoves.push(new Move(from, to));
        }
        return legalMoves;
    }

    public attackedSquares(board: Board, from: Square): Array<Square> {
        return Attacks.getBishopAttacks(board, this, from, () => false);
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