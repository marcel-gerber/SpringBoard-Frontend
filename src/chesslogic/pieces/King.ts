import {Piece} from "./Piece.ts";
import {Color, Direction, getSquareValue, MoveType, PieceType, SquareValue} from "../Types.ts";
import {Move} from "../Move.ts";
import {Square} from "../Square.ts";
import {Board} from "../Board.ts";
import {Castling, CastlingValue} from "../Castling.ts";

export class King extends Piece {

    private static _legalDirections: Direction[];

    public constructor(color: Color) {
        super(color);
    }

    public pseudoLegalMoves(board: Board, from: Square): Array<Move> {
        const legalMoves: Array<Move> = [];

        for(const direction of King.legalDirections) {
            const to: Square = Square.add(from, direction);

            if(to._value == SquareValue.NONE) continue;

            if(board.isEmptyOrOpponent(to, this)) {
                legalMoves.push(new Move(from, to));
            }
        }

        this.addCastlingMoves(legalMoves, board, from);
        return legalMoves;
    }

    private addCastlingMoves(pseudoLegalMoves: Array<Move>, board: Board, from: Square): void {
        if(board.castling.hasNoCastling()) return;

        const castlings: CastlingValue[] = Castling.getCastlings(this.color);

        for(const castlingValue of castlings) {
            if(!board.castling.has(castlingValue)) continue;

            const emptySquares: number[] = Castling.getEmptySquares(castlingValue);
            const notAttackedSquares: number[] = Castling.getNotAttackedSquares(castlingValue);

            if(!board.areEmpty(emptySquares)) continue;
            if(board.areAttacked(notAttackedSquares)) continue;

            const targetKingIndex: number = Castling.getKingTargetIndex(castlingValue);
            const targetSquare: Square = new Square(getSquareValue(targetKingIndex));

            pseudoLegalMoves.push(new Move(from, targetSquare, MoveType.CASTLING));
        }
    }

    public attackedSquares(board: Board, from: Square): Array<Square> {
        const attackedSquares: Array<Square> = [];

        for(const direction of King.legalDirections) {
            const to: Square = Square.add(from, direction);

            if(to._value == SquareValue.NONE) continue;

            if(board.isEmptyOrOpponent(to, this)) {
                attackedSquares.push(to);
            }
        }
        return attackedSquares;
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

    private static get legalDirections(): Direction[] {
        if(!this._legalDirections) {
            this._legalDirections = [
                Direction.NORTH,
                Direction.NORTH_EAST,
                Direction.EAST,
                Direction.SOUTH_EAST,
                Direction.SOUTH,
                Direction.SOUTH_WEST,
                Direction.WEST,
                Direction.NORTH_WEST
            ];
        }
        return this._legalDirections;
    }

}