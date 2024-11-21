import {Square} from "./Square.ts";
import {Direction, SquareValue} from "./Types.ts";
import {Board} from "./Board.ts";
import {Piece} from "./pieces/Piece.ts";

export class Attacks {

    /**
     * Adds an attack ray with the provided Direction to the squares List
     *
     * @param squares
     * @param direction
     * @param piece
     * @param board
     * @param from
     * @param kingCheck
     * @private
     */
    private static addAttackRay(squares: Square[], direction: Direction, piece: Piece, board: Board, from: Square,
                         kingCheck: (s: Square) => boolean): void {
        let to: Square = Square.add(from, direction);

        while(to._value != SquareValue.NONE) {
            if(board.isFriendly(to, piece) || kingCheck(to)) return;

            squares.push(to);

            if(board.isOpponent(to, piece)) return;
            to = Square.add(to, direction);
        }
    }

    /**
     * Calculates a rooks' attacks standing on the provided Square 'from'
     *
     * @param board
     * @param piece
     * @param from
     * @param kingCheck
     * @protected
     */
    public static getRookAttacks(board: Board, piece: Piece, from: Square, kingCheck: (s: Square) => boolean): Array<Square> {
        const attacks: Array<Square> = [];

        this.addAttackRay(attacks, Direction.NORTH, piece, board, from, kingCheck);
        this.addAttackRay(attacks, Direction.EAST, piece, board, from, kingCheck);
        this.addAttackRay(attacks, Direction.SOUTH, piece, board, from, kingCheck);
        this.addAttackRay(attacks, Direction.WEST, piece, board, from, kingCheck);

        return attacks;
    }

    /**
     * Calculates a rooks' attacks standing on the provided Square 'from'
     *
     * @param board
     * @param piece
     * @param from
     * @param kingCheck
     * @protected
     */
    public static getBishopAttacks(board: Board, piece: Piece, from: Square, kingCheck: (s: Square) => boolean): Array<Square> {
        const attacks: Array<Square> = [];

        this.addAttackRay(attacks, Direction.NORTH_EAST, piece, board, from, kingCheck);
        this.addAttackRay(attacks, Direction.SOUTH_EAST, piece, board, from, kingCheck);
        this.addAttackRay(attacks, Direction.SOUTH_WEST, piece, board, from, kingCheck);
        this.addAttackRay(attacks, Direction.NORTH_WEST, piece, board, from, kingCheck);

        return attacks;
    }

}