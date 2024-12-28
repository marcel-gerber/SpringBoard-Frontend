import {Color, getPieceFromType, MoveType, PieceType} from "./Types.ts";
import {Square} from "./Square.ts";

/**
 * Class representing a move in a chess game
 */
export class Move {

    public readonly _moveType: MoveType;
    public readonly _from: Square;
    public readonly _to: Square;
    public readonly _promotionType: PieceType;

    public constructor(from: Square,
                       to: Square,
                       moveType: MoveType = MoveType.NORMAL,
                       promotionType: PieceType = PieceType.NONE) {
        this._from = from;
        this._to = to;
        this._moveType = moveType;
        this._promotionType = promotionType;
    }

    /**
     * Converts the move to a "Pure Coordinate Notation"-String
     */
    public toPureCoordinateNotation(): string {
        if(this._promotionType === PieceType.NONE) {
            return this._from.toString() + this._to.toString();
        }
        const char: string = getPieceFromType(this._promotionType, Color.BLACK).character();
        return this._from.toString() + this._to.toString() + char;
    }

}