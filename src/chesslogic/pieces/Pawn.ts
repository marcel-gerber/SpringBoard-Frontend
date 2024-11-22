import {Piece} from "./Piece.ts";
import {Square} from "../Square.ts";
import {Move} from "../Move.ts";
import {Color, Direction, MoveType, PieceType, SquareValue} from "../Types.ts";
import {Board} from "../Board.ts";

export class Pawn extends Piece {

    private static _whiteAttacks: Direction[];
    private static _blackAttacks: Direction[];

    public constructor(color: Color) {
        super(color);
    }

    public pseudoLegalMoves(board: Board, from: Square): Array<Move> {
        const legalMoves: Array<Move> = [];

        const push: Direction = this.color == Color.WHITE ? Direction.NORTH : Direction.SOUTH;
        const to: Square = Square.add(from, push);

        // Single-Push and Double-Push
        if(board.isEmpty(to.getIndex())) {
            if(Pawn.isOnPromotionRank(this.color, to)) {
                Pawn.addPromotionMoves(legalMoves, from, to);
            }
            else {
                legalMoves.push(new Move(from, to));

                if(Pawn.isOnDoublePushRank(this.color, from)) {
                    const doublePush: Square = Square.add(to, push);

                    if(board.isEmpty(doublePush.getIndex())) {
                        legalMoves.push(new Move(from, doublePush));
                    }
                }
            }
        }

        // Attacks left and right
        for(const attack of Pawn.getAttackDirections(this.color)) {
            const attackedSquare: Square = Square.add(from, attack);

            if(attackedSquare._value == SquareValue.NONE) continue;

            if(attackedSquare._value == board.enPassant._value) {
                legalMoves.push(new Move(from, attackedSquare, MoveType.ENPASSANT));
                continue;
            }

            if(board.isOpponent(attackedSquare, this) && !board.isKing(attackedSquare)) {
                if(Pawn.isOnPromotionRank(this.color, attackedSquare)) {
                    Pawn.addPromotionMoves(legalMoves, from, attackedSquare);
                }
                else {
                    legalMoves.push(new Move(from, attackedSquare));
                }
            }
        }
        return legalMoves;
    }

    public attackedSquares(board: Board, from: Square): Array<Square> {
        const attackedSquares: Array<Square> = [];

        for(const attack of Pawn.getAttackDirections(this.color)) {
            const square: Square = Square.add(from, attack);

            if(square._value == SquareValue.NONE) continue;

            if(board.isEmptyOrOpponent(square, this)) {
                attackedSquares.push(square);
            }
        }
        return attackedSquares;
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

    private static addPromotionMoves(moves: Array<Move>, from: Square, to: Square) {
        moves.push(new Move(from, to, MoveType.PROMOTION, PieceType.KNIGHT));
        moves.push(new Move(from, to, MoveType.PROMOTION, PieceType.BISHOP));
        moves.push(new Move(from, to, MoveType.PROMOTION, PieceType.ROOK));
        moves.push(new Move(from, to, MoveType.PROMOTION, PieceType.QUEEN));
    }

    /**
     * Returns 'true' if the pawn is on the double push rank
     *
     * @param color
     * @param from
     * @private
     */
    private static isOnDoublePushRank(color: Color, from: Square): boolean {
        switch(color) {
            case Color.WHITE: return from.getRankIndex() == 1;
            case Color.BLACK: return from.getRankIndex() == 6;
            default: return false;
        }
    }

    /**
     * Returns 'true' if the targeted square (that the pawn moves to) is the promotion rank
     *
     * @param color
     * @param from
     * @private
     */
    private static isOnPromotionRank(color: Color, from: Square): boolean {
        switch(color) {
            case Color.WHITE: return from.getRankIndex() == 7;
            case Color.BLACK: return from.getRankIndex() == 0;
            default: return false;
        }
    }

    private static getAttackDirections(color: Color): Direction[] {
        switch (color) {
            case Color.WHITE: return Pawn.whiteAttacks;
            case Color.BLACK: return Pawn.blackAttacks;
            default: throw new Error("Color should not be NONE");
        }
    }

    private static get whiteAttacks(): Direction[] {
        if(!this._whiteAttacks) {
            this._whiteAttacks = [
                Direction.NORTH_EAST,
                Direction.NORTH_WEST
            ];
        }
        return this._whiteAttacks;
    }

    private static get blackAttacks(): Direction[] {
        if(!this._blackAttacks) {
            this._blackAttacks = [
                Direction.SOUTH_EAST,
                Direction.SOUTH_WEST
            ];
        }
        return this._blackAttacks;
    }

}