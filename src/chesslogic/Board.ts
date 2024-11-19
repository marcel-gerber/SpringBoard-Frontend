import {Piece} from "./pieces/Piece.ts";
import {NullPiece} from "./pieces/NullPiece.ts";

/**
 * Class for representing a (logical) Chess board
 */
export class Board {

    private pieces: Piece[] = Array.from({ length: 64 });

    constructor() {
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