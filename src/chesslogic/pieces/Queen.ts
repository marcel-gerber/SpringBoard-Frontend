import {Piece} from "./Piece.ts";
import {Color, PieceType} from "../Types.ts";
import {Move} from "../Move.ts";
import {Square} from "../Square.ts";
import {Board} from "../Board.ts";
import {Attacks} from "../Attacks.ts";

export class Queen extends Piece {

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

        for(const to of Attacks.getRookAttacks(board, this, from, (square) => board.isKing(square))) {
            legalMoves.push(new Move(from, to));
        }
        return legalMoves;
    }

    public attackedSquares(board: Board, from: Square): Array<Square> {
        const attackedSquares: Array<Square> = Attacks.getBishopAttacks(board, this, from, () => false);
        return attackedSquares.concat(Attacks.getRookAttacks(board, this, from, () => false));
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