import {Color} from "./Types.ts";

/**
 * All castling rights can be stored in just 4 bits.
 * 00: short castling (kings' side)
 * 000: long castling (queens' side)
 */
export enum CastlingValue {
    NO_CASTLING = 0,
    WHITE_00 = 0b00000001,
    WHITE_000 = 0b00000010,
    BLACK_00 = 0b00000100,
    BLACK_000 = 0b00001000
}

/**
 * Class for representing the castling rights.
 */
export class Castling {

    // All castling rights will be saved in a single byte
    public castlingRights: number;

    private static readonly blackCastlings: CastlingValue[] = [CastlingValue.BLACK_00, CastlingValue.BLACK_000];
    private static readonly whiteCastlings: CastlingValue[] = [CastlingValue.WHITE_00, CastlingValue.WHITE_000];

    // These squares need to be empty
    private static readonly black00EmptySquares: number[] = [61, 62];
    private static readonly black000EmptySquares: number[] = [57, 58, 59];

    private static readonly white00EmptySquares: number[] = [5, 6];
    private static readonly white000EmptySquares: number[] = [1, 2, 3];

    // These squares are not allowed to be attacked by the enemy
    private static readonly black00NotAttacked: number[] = [60, 61, 62];
    private static readonly black000NotAttacked: number[] = [58, 59, 60];

    private static readonly white00NotAttacked: number[] = [4, 5, 6];
    private static readonly white000NotAttacked: number[] = [2, 3, 4];

    public constructor(rights: number = CastlingValue.NO_CASTLING) {
        this.castlingRights = rights;
    }

    /**
     * Returns array of castling rights for a provided color
     *
     * @param color
     */
    public static getCastlings(color: Color): CastlingValue[] {
        switch (color) {
            case Color.WHITE:
                return Castling.whiteCastlings;
            case Color.BLACK:
                return Castling.blackCastlings;
        }
        return [] as CastlingValue[];
    }

    /**
     * Sets a castling right
     *
     * @param castlingValue
     */
    public set(castlingValue: CastlingValue): void {
        this.castlingRights |= castlingValue.valueOf();
    }

    /**
     * Unsets a castling right
     *
     * @param castlingValue
     */
    public unSet(castlingValue: CastlingValue): void {
        this.castlingRights &= ~castlingValue.valueOf();
    }

    /**
     * Unsets all castling rights for a color
     *
     * @param color Color
     */
    public unSetForColor(color: Color): void {
        switch (color) {
            case Color.WHITE:
                this.unSet(CastlingValue.WHITE_00);
                this.unSet(CastlingValue.WHITE_000);
                return;
            case Color.BLACK:
                this.unSet(CastlingValue.BLACK_00);
                this.unSet(CastlingValue.BLACK_000);
                return;
        }
    }

    /**
     * Returns 'true' if the provided castling right is set
     *
     * @param castlingValue
     */
    public has(castlingValue: CastlingValue): boolean {
        return (this.castlingRights & castlingValue.valueOf()) == castlingValue.valueOf();
    }

    /**
     * Returns 'true' when the provided color has a castling right
     *
     * @param color
     */
    public hasAny(color: Color): boolean {
        for(const castlingValue of Castling.getCastlings(color)) {
            if(this.has(castlingValue)) return true;
        }
        return false;
    }

    /**
     * Returns 'true' if there are no more castling rights set
     */
    public hasNoCastling(): boolean {
        return this.castlingRights == CastlingValue.NO_CASTLING;
    }

    /**
     * Clones the object with its current castling rights.
     * Alternative to a copy constructor
     */
    public clone(): Castling {
        return new Castling(this.castlingRights);
    }

    /**
     * Returns the kings' target square index based off the provided castling right
     *
     * @param castlingValue
     */
    public static getKingTargetIndex(castlingValue: CastlingValue): number {
        switch (castlingValue) {
            case CastlingValue.BLACK_00: return 62;
            case CastlingValue.BLACK_000: return 58;
            case CastlingValue.WHITE_00: return 6;
            case CastlingValue.WHITE_000: return 2;
            default: throw new Error("Undefined CastlingValue: " + castlingValue);
        }
    }

    /**
     * Returns the rooks' source square index based off the provided castling right
     *
     * @param castlingValue
     */
    public static getRookSourceIndex(castlingValue: CastlingValue): number {
        switch (castlingValue) {
            case CastlingValue.BLACK_00: return 63;
            case CastlingValue.BLACK_000: return 56;
            case CastlingValue.WHITE_00: return 7;
            case CastlingValue.WHITE_000: return 0;
            default: throw new Error("Undefined CastlingValue: " + castlingValue);
        }
    }

    /**
     * Returns the rooks' target square index based off the provided castling right
     *
     * @param castlingValue
     */
    public static getRookTargetIndex(castlingValue: CastlingValue): number {
        switch (castlingValue) {
            case CastlingValue.BLACK_00: return 61;
            case CastlingValue.BLACK_000: return 59;
            case CastlingValue.WHITE_00: return 5;
            case CastlingValue.WHITE_000: return 3;
            default: throw new Error("Undefined CastlingValue: " + castlingValue);
        }
    }

    /**
     * Returns the castling right based on the provided kings' target square index
     *
     * @param index
     */
    public static fromKingTargetIndex(index: number): CastlingValue {
        switch (index) {
            case 2: return CastlingValue.WHITE_000;
            case 6: return CastlingValue.WHITE_00;
            case 58: return CastlingValue.BLACK_000;
            case 62: return CastlingValue.BLACK_00;
            default: return CastlingValue.NO_CASTLING;
        }
    }

    /**
     * Returns the castling right based on the provided rooks' source square index
     *
     * @param index
     */
    public static fromRookSourceIndex(index: number): CastlingValue {
        switch (index) {
            case 0: return CastlingValue.WHITE_000;
            case 7: return CastlingValue.WHITE_00;
            case 56: return CastlingValue.BLACK_000;
            case 63: return CastlingValue.BLACK_00;
            default: return CastlingValue.NO_CASTLING;
        }
    }

    /**
     * Returns an array of squares' indices that have to be empty
     *
     * @param castlingValue
     */
    public static getEmptySquares(castlingValue: CastlingValue): number[] {
        switch (castlingValue) {
            case CastlingValue.BLACK_00: return Castling.black00EmptySquares;
            case CastlingValue.BLACK_000: return Castling.black000EmptySquares;
            case CastlingValue.WHITE_00: return Castling.white00EmptySquares;
            case CastlingValue.WHITE_000: return Castling.white000EmptySquares;
            default: return [] as number[];
        }
    }

    /**
     * Returns an array of squares' indices that are not allowed to be attacked by the opponent
     *
     * @param castlingValue
     */
    public static getNotAttackedSquares(castlingValue: CastlingValue): number[] {
        switch (castlingValue) {
            case CastlingValue.BLACK_00: return Castling.black00NotAttacked;
            case CastlingValue.BLACK_000: return Castling.black000NotAttacked;
            case CastlingValue.WHITE_00: return Castling.white00NotAttacked;
            case CastlingValue.WHITE_000: return Castling.white000NotAttacked;
            default: return [] as number[];
        }
    }

    public toString(): string {
        if(this.hasNoCastling()) return "-";

        let str: string = "";

        if(this.has(CastlingValue.WHITE_00)) str += "K";
        if(this.has(CastlingValue.WHITE_000)) str += "Q";
        if(this.has(CastlingValue.BLACK_00)) str += "k";
        if(this.has(CastlingValue.BLACK_000)) str += "q";

        return str;
    }

}