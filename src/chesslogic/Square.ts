import {Direction, getSquareValue, SquareValue} from "./Types.ts";

/**
 * Class for representing a square on the board
 */
export class Square {

    public _value: SquareValue;

    public constructor(readonly value: SquareValue = SquareValue.NONE) {
        this._value = value;
    }

    /**
     * Returns the index of the square in a LERF mapping
     */
    public getIndex(): number {
        return +this._value;
    }

    /**
     * Returns the file index of the square
     */
    public getFileIndex(): number {
        return this.getIndex() & 7;
    }

    /**
     * Returns the rank index of the square
     */
    public getRankIndex(): number {
        return this.getIndex() >> 3;
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

    /**
     * Adds a direction to the square and returns a new Square
     *
     * @param square Square
     * @param direction Direction
     */
    public static add(square: Square, direction: Direction): Square {
        const targetIndex: number = square.getIndex() + direction;
        const targetSquare: Square = new Square(getSquareValue(targetIndex));

        if(Math.abs(square.getFileIndex() - targetSquare.getFileIndex()) > 2) {
            return new Square(SquareValue.NONE);
        }
        return targetSquare;
    }

    public toString(): string {
        if(this._value == SquareValue.NONE) return "-";

        let str: string = "";

        const file: string = String.fromCharCode("a".charCodeAt(0) + this.getFileIndex());
        const rank: string = String.fromCharCode("1".charCodeAt(0) + this.getRankIndex());

        str += file;
        str += rank;
        return str;
    }

}