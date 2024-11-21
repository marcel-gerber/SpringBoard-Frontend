import {Piece} from "./Piece.ts";
import {Color, Direction, PieceType, SquareValue} from "../Types.ts";
import {Move} from "../Move.ts";
import {Square} from "../Square.ts";
import {Board} from "../Board.ts";

export class Knight extends Piece {

    private static _legalDirections: Direction[];

    public constructor(color: Color) {
        super(color);
    }

    public pseudoLegalMoves(board: Board, from: Square): Array<Move> {
        const legalMoves: Array<Move> = [];

        for(const direction of Knight.legalDirections) {
            const to: Square = Square.add(from, direction);

            if(to._value == SquareValue.NONE) continue;

            if(board.isEmptyOrOpponent(to, this) && !board.isKing(to)) {
                legalMoves.push(new Move(from, to));
            }
        }
        return legalMoves;
    }

    public attackedSquares(board: Board, from: Square): Array<Square> {
        const attackedSquares: Array<Square> = [];

        for(const direction of Knight.legalDirections) {
            const to: Square = Square.add(from, direction);

            if(to._value == SquareValue.NONE) continue;

            if(board.isEmptyOrOpponent(to, this)) {
                attackedSquares.push(to);
            }
        }
        return attackedSquares;
    }

    public image(): string | null {
        return this.color == Color.WHITE ? "/pieces/wN.svg" : "/pieces/bN.svg";
    }

    public type(): PieceType {
        return PieceType.KNIGHT;
    }

    public character(): string {
        return this.color == Color.WHITE ? "N" : "n";
    }

    private static get legalDirections(): Direction[] {
        if(!this._legalDirections) {
            this._legalDirections = [
                Direction.KNIGHT_NORTH_NORTH_WEST,
                Direction.KNIGHT_NORTH_NORTH_EAST,
                Direction.KNIGHT_NORTH_EAST_EAST,
                Direction.KNIGHT_SOUTH_EAST_EAST,
                Direction.KNIGHT_SOUTH_SOUTH_EAST,
                Direction.KNIGHT_SOUTH_SOUTH_WEST,
                Direction.KNIGHT_SOUTH_WEST_WEST,
                Direction.KNIGHT_NORTH_WEST_WEST,
            ];
        }
        return this._legalDirections;
    }

}