import {Piece} from "./pieces/Piece.ts";
import {NullPiece} from "./pieces/NullPiece.ts";
import {CastlingValue, Color, getPieceFromChar, SquareValue} from "./Types.ts";
import {Castling} from "./Castling.ts";
import {Square} from "./Square.ts";

/**
 * Class for representing a (logical) Chess board
 */
export class Board {

    public pieces: Piece[] = Array.from({ length: 64 });
    public sideToMove: Color;
    public castling: Castling;
    public enPassant: Square;
    public halfMoveCounter: number;

    constructor() {
        this.sideToMove = Color.WHITE;
        this.castling = new Castling();
        this.enPassant = new Square(SquareValue.NONE);
        this.halfMoveCounter = 0;

        for(let i = 0; i < this.pieces.length; i++) {
            this.pieces[i] = NullPiece.instance;
        }
    }

    /**
     * Returns the piece standing on this index
     *
     * @param index
     */
    public getPiece(index: number): Piece {
        return this.pieces[index];
    }

    /**
     * Places a piece on the board
     *
     * @param index
     * @param piece
     * @private
     */
    private placePiece(index: number, piece: Piece): void {
        this.pieces[index] = piece;
    }

    /**
     * Sets the board position based on the provided FEN string
     *
     * @param fen
     */
    public setFen(fen: string): void {
        const split: string[] = fen.split(" ");
        const pieces: string = split[0];
        const sideToMove: string = split.length > 1 ? split[1] : "w";
        const castling: string = split.length > 2 ? split[2] : "-";
        const enPassant: string = split.length > 3 ? split[3] : "-";
        const halfMove: string = split.length > 4 ? split[4] : "0";

        this.sideToMove = sideToMove === "w" ? Color.WHITE : Color.BLACK;
        this.enPassant.setValueFromString(enPassant);
        this.halfMoveCounter = Number(halfMove);

        let index: number = 56;
        for(const char of pieces) {
            if(char === "/") {
                index -= 16;
                continue;
            }

            if(!isNaN(Number(char))) {
                index += char.charCodeAt(0) - "0".charCodeAt(0);
                continue;
            }

            const piece: Piece = getPieceFromChar(char);
            this.placePiece(index, piece);
            index++;
        }

        for(const char of castling) {
            switch (char) {
                case 'K':
                    this.castling.set(CastlingValue.WHITE_00);
                    continue;
                case 'Q':
                    this.castling.set(CastlingValue.WHITE_000);
                    continue;
                case 'k':
                    this.castling.set(CastlingValue.BLACK_00);
                    continue;
                case 'q':
                    this.castling.set(CastlingValue.BLACK_000);
            }
        }
    }

    /**
     * Prints the board
     */
    public print(): void {
        let index: number = 56;

        for(let i = 0; i < 8; i++) {
            let output: string = "---------------------------------\n";

            for(let j = 0; j < 8; j++) {
                output += "| ";
                output += this.getPiece(index).character();
                output += " ";

                index++;
            }

            output += "|\n";
            output += "---------------------------------\n";
            index -= 16;

            console.log(output);
        }
    }

}