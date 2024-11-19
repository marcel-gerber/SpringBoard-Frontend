import {Piece} from "./Piece.ts";
import {Square} from "../Square.ts";
import {Move} from "../Move.ts";
import {Color, PieceType} from "../Types.ts";

/**
 * Representing an empty Square on the Board.
 * Uses the Null-Object and Singleton Pattern
 */
export class NullPiece extends Piece {

    private static _instance: NullPiece;

    private static readonly emptyMoves: Array<Move> = [];
    private static readonly emptySquares: Array<Square> = [];

    private constructor() {
        super(Color.NONE);
    }

    /**
     * Returns the instance of the Singleton-NullPiece
     */
    public static get instance(): NullPiece {
        if(!NullPiece._instance) {
            NullPiece._instance = new NullPiece();
        }
        return NullPiece._instance;
    }

    public pseudoLegalMoves(): Array<Move> {
        return NullPiece.emptyMoves;
    }

    public attackedSquares(): Array<Square> {
        return NullPiece.emptySquares;
    }

    public image(): string | null {
        return null;
    }

    public type(): PieceType {
        return PieceType.NONE;
    }

    public character(): string {
        return " ";
    }

}