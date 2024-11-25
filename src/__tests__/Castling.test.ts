import {Castling, CastlingValue} from "../chesslogic/Castling.ts";
import {Color} from "../chesslogic/Types.ts";

test("CastlingInit", () => {
    const castling: Castling = new Castling();

    expect(castling.castlingRights).toBe(0);

    castling.set(CastlingValue.WHITE_00);
    expect(castling.castlingRights).toBe(1);

    castling.set(CastlingValue.WHITE_000);
    expect(castling.castlingRights).toBe(3);

    castling.set(CastlingValue.BLACK_00);
    expect(castling.castlingRights).toBe(7);

    castling.set(CastlingValue.BLACK_000);
    expect(castling.castlingRights).toBe(15);
});

test("CastlingHas", () => {
    const castling: Castling = new Castling(15);

    expect(castling.has(CastlingValue.WHITE_00)).toBe(true);
    expect(castling.has(CastlingValue.WHITE_000)).toBe(true);
    expect(castling.has(CastlingValue.BLACK_00)).toBe(true);
    expect(castling.has(CastlingValue.BLACK_000)).toBe(true);
});

test("CastlingUnset", () => {
    const castling: Castling = new Castling(15);

    castling.unSet(CastlingValue.WHITE_00);
    expect(castling.castlingRights).toBe(14);

    castling.unSet(CastlingValue.WHITE_000);
    expect(castling.castlingRights).toBe(12);

    castling.unSet(CastlingValue.BLACK_00);
    expect(castling.castlingRights).toBe(8);

    castling.unSet(CastlingValue.BLACK_000);
    expect(castling.castlingRights).toBe(0);
});

test("CastlingUnsetColor", () => {
    const castling: Castling = new Castling(15);

    castling.unSetForColor(Color.WHITE);
    expect(castling.castlingRights).toBe(12);

    castling.unSetForColor(Color.BLACK);
    expect(castling.castlingRights).toBe(0);
});