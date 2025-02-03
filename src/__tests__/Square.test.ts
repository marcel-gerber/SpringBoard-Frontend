import {Square} from "../chesslogic/Square.ts";
import {Direction, SquareValue} from "../chesslogic/Types.ts";

test("SquareGetIndex", () => {
    let square: Square = new Square(SquareValue.A1);
    expect(square.getIndex()).toBe(0);

    square = new Square(SquareValue.D3);
    expect(square.getIndex()).toBe(19);

    square = new Square(SquareValue.NONE);
    expect(square.getIndex()).toBe(64);
});

test("SquareGetFileIndex", () => {
    let square: Square = new Square(SquareValue.A1);
    expect(square.getFileIndex()).toBe(0);

    square = new Square(SquareValue.D3);
    expect(square.getFileIndex()).toBe(3);

    square = new Square(SquareValue.H7);
    expect(square.getFileIndex()).toBe(7);
});

test("SquareGetRankIndex", () => {
    let square: Square = new Square(SquareValue.C1);
    expect(square.getRankIndex()).toBe(0);

    square = new Square(SquareValue.A4);
    expect(square.getRankIndex()).toBe(3);

    square = new Square(SquareValue.F8);
    expect(square.getRankIndex()).toBe(7);
});

test("SquareSetValueFromString", () => {
    const square: Square = new Square(SquareValue.A1);

    square.setValueFromString("-");
    expect(square._value).toBe(SquareValue.NONE);

    square.setValueFromString("c3");
    expect(square._value).toBe(SquareValue.C3);

    square.setValueFromString("h8");
    expect(square._value).toBe(SquareValue.H8);
});

test("SquareAdd", () => {
    let square: Square = Square.add(new Square(SquareValue.E2), Direction.NORTH);
    expect(square._value).toBe(SquareValue.E3);

    square = Square.add(new Square(SquareValue.A5), Direction.EAST);
    expect(square._value).toBe(SquareValue.B5);

    square = Square.add(new Square(SquareValue.D7), Direction.SOUTH);
    expect(square._value).toBe(SquareValue.D6);

    square = Square.add(new Square(SquareValue.G4), Direction.WEST);
    expect(square._value).toBe(SquareValue.F4);
});

test("SquareToString", () => {
    let square: Square = new Square(SquareValue.A1);
    expect(square.toString()).toEqual("a1");

    square = new Square(SquareValue.C3);
    expect(square.toString()).toEqual("c3");

    square = new Square(SquareValue.E6);
    expect(square.toString()).toEqual("e6");
});