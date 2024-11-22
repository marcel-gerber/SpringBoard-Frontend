import {Piece} from "./pieces/Piece.ts";
import {NullPiece} from "./pieces/NullPiece.ts";
import {Color, getOpposite, getPieceFromChar, getSquareValue, MoveType, SquareValue} from "./Types.ts";
import {Castling, CastlingValue} from "./Castling.ts";
import {Square} from "./Square.ts";
import {King} from "./pieces/King.ts";
import {Move} from "./Move.ts";
import {Rook} from "./pieces/Rook.ts";
import {Pawn} from "./pieces/Pawn.ts";

/**
 * Class holding data needed for unmaking a move
 */
class StateInfo {

    public castling: Castling;
    public enPassant: Square;
    public captured: Piece;
    public halfMoveCounter: number;

    public constructor(castling: Castling, enPassant: Square, captured: Piece, halfMoveCounter: number) {
        this.castling = castling;
        this.enPassant = enPassant;
        this.captured = captured;
        this.halfMoveCounter = halfMoveCounter;
    }

}

/**
 * Class for representing a (logical) Chess board
 */
export class Board {

    public pieces: Piece[] = Array.from({ length: 64 });
    public sideToMove: Color;
    public castling: Castling;
    public enPassant: Square;
    public halfMoveCounter: number;

    // All previous states of the board will be saved in here
    private prevStates: StateInfo[] = [];

    public constructor() {
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
     * Removes a piece from the board
     *
     * @param index
     * @private
     */
    private removePiece(index: number): void {
        this.pieces[index] = NullPiece.instance;
    }

    /**
     * Returns 'true' if the piece standing on the provided square has the same color as the provided piece
     *
     * @param square Square
     * @param piece Piece
     */
    public isFriendly(square: Square, piece: Piece): boolean {
        return this.getPiece(square.getIndex()).color == piece.color;
    }

    /**
     * Returns 'true' if the piece standing on the provided square has the opposite color as the provided piece
     *
     * @param square Square
     * @param piece Piece
     */
    public isOpponent(square: Square, piece: Piece): boolean {
        const targetPiece: Piece = this.getPiece(square.getIndex());
        return (!(targetPiece instanceof NullPiece) && targetPiece.color != piece.color);
    }

    /**
     * Returns 'true' if the piece standing on the provided square is a NullPiece
     * or the provided piece is an enemy piece
     *
     * @param square
     * @param piece
     */
    public isEmptyOrOpponent(square: Square, piece: Piece): boolean {
        const targetPiece: Piece = this.getPiece(square.getIndex());
        return targetPiece instanceof NullPiece || targetPiece.color != piece.color;
    }

    /**
     * Returns 'true' when a king is standing on the provided square
     *
     * @param square Square
     */
    public isKing(square: Square): boolean {
        return this.getPiece(square.getIndex()) instanceof King;
    }

    /**
     * Returns 'true' if the piece standing on the square is a NullPiece
     *
     * @param index number
     */
    public isEmpty(index: number): boolean {
        return this.getPiece(index) instanceof NullPiece;
    }

    /**
     * Returns 'true' if all indices of the array are empty on the board
     *
     * @param indices
     */
    public areEmpty(indices: number[]): boolean {
        for(const index of indices) {
            if(!this.isEmpty(index)) return false;
        }
        return true;
    }

    /**
     * Returns 'true' if any squares' indices are attacked by the current opponent
     *
     * @param indices
     */
    public areAttacked(indices: number[]): boolean {
        const attackedSquares: Square[] = this.getAttackedSquares(getOpposite(this.sideToMove));

        for(const square of attackedSquares) {
            for(const index of indices) {
                if(square.getIndex() === index) return true;
            }
        }
        return false;
    }

    /**
     * Returns an array of squares that are currently attacked by the provided color
     *
     * @param color
     */
    public getAttackedSquares(color: Color): Array<Square> {
        const attackedSquares: Array<Square> = [];

        for(let i = 0; i < this.pieces.length; i++) {
            const piece: Piece = this.getPiece(i);
            if(piece.color != color) continue;

            const attacks: Array<Square> = piece.attackedSquares(this, new Square(getSquareValue(i)));
            attackedSquares.push(...attacks);
        }
        return attackedSquares;
    }

    /**
     * Plays a move on the board
     *
     * @param move
     */
    public makeMove(move: Move): void {
        const from: Square = move._from;
        const to: Square = move._to;
        const moveType: MoveType = move._moveType;

        const moved: Piece = this.getPiece(from.getIndex());
        const captured: Piece = this.getPiece(to.getIndex());

        const castling: Castling = this.castling.clone();
        const enPassantSquare: Square = new Square(this.enPassant._value);

        const stateInfo: StateInfo = new StateInfo(castling, enPassantSquare, captured, this.halfMoveCounter);
        this.prevStates.push(stateInfo);

        this.halfMoveCounter++;

        if(this.enPassant._value != SquareValue.NONE) {
            this.enPassant._value = SquareValue.NONE;
        }

        // Played move is a capture
        if(!(captured instanceof NullPiece)) {
            this.halfMoveCounter = 0;
            this.removePiece(to.getIndex());

            if(captured instanceof Rook) {
                const castlingValue: CastlingValue = Castling.fromRookSourceIndex(to.getIndex());
                this.castling.unSet(castlingValue);
            }
        }

        if(this.castling.hasAny(this.sideToMove)) {
            if(moved instanceof King) {
                this.castling.unSetForColor(this.sideToMove);
            }
            else if(moved instanceof Rook) {
                const castlingValue: CastlingValue = Castling.fromRookSourceIndex(from.getIndex());
                this.castling.unSet(castlingValue);
            }
        }

        if(moved instanceof Pawn) {
            this.halfMoveCounter = 0;

            // Double push
            if(Math.abs(from.getIndex() - to.getIndex()) == 16) {
                // TODO: isEnPassantPossible
            }
        }

        if(moveType == MoveType.CASTLING) {
            // TODO
        }
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