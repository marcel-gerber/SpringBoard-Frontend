import {MoveType, PieceType} from "./Types.ts";
import {Square} from "./Square.ts";

/**
 * Class representing a move in a chess game
 */
export class Move {

    public readonly _moveType: MoveType;
    public readonly _from: Square;
    public readonly _to: Square;
    public readonly _promotionType: PieceType;

    public constructor(moveType: MoveType = MoveType.NORMAL,
                       from: Square,
                       to: Square,
                       promotionType: PieceType = PieceType.KNIGHT) {
        this._moveType = moveType;
        this._from = from;
        this._to = to;
        this._promotionType = promotionType;
    }

}