import {getSquareValue, SquareValue} from "./Types.ts";

/**
 * Class for representing a square on the board
 */
export class Square {

    public _value: SquareValue;

    constructor(readonly value: SquareValue = SquareValue.NONE) {
        this._value = value;
    }

    /**
     * Sets the internal SquareValue based on the provided string
     *
     * @param str
     */
    public setValueFromString(str: string): void {
        if(str === "-") {
            this._value = SquareValue.NONE;
            return;
        }

        const index: number = ((str.charCodeAt(0) - "a".charCodeAt(0)) + ((str.charCodeAt(1) - "1".charCodeAt(0)) * 8));
        this._value = getSquareValue(index);
    }

}