import {Color, PieceType} from "../Types.ts";
import {Move} from "../Move.ts";
import {Board} from "../Board.ts";
import {Square} from "../Square.ts";

/**
 * Abstract class representing a single Piece on the chess board
 */
export abstract class Piece {

    public readonly color: Color;

    protected constructor(color: Color) {
        this.color = color;
    }

    /**
     * Calculates all <b>pseudo</b> legal moves
     *
     * @param board
     * @param from
     */
    public abstract pseudoLegalMoves(board: Board, from: Square): Array<Move>;

    /**
     * Calculates all attacked squares
     *
     * @param board
     * @param from
     */
    public abstract attackedSquares(board: Board, from: Square): Array<Square>;

    /**
     * Returns the pieces' image
     */
    public abstract image(): string | null;

    /**
     * Returns the pieces' type
     */
    public abstract type(): PieceType;

    /**
     * Returns the pieces character
     */
    public abstract character(): string;
    
}