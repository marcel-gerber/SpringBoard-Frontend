import {SquareValue} from "./Types.ts";

/**
 * Class for representing a square on the board
 */
export class Square {

    public readonly _value: SquareValue;

    constructor(readonly value: SquareValue) {
        this._value = value;
    }

}