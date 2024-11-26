import {Piece} from "./pieces/Piece.ts";
import {NullPiece} from "./pieces/NullPiece.ts";
import {
    Color,
    Direction,
    getOpposite,
    getPieceFromChar,
    getPieceFromType,
    getSquareValue,
    MoveType,
    SquareValue
} from "./Types.ts";
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
    public plies: number;

    // All previous states of the board will be saved in here
    private prevStates: StateInfo[] = [];

    public constructor() {
        this.sideToMove = Color.WHITE;
        this.castling = new Castling();
        this.enPassant = new Square(SquareValue.NONE);
        this.halfMoveCounter = 0;
        this.plies = 0;
        this.init();
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
     * Returns the boards' full move counter
     */
    public getFullMoveCounter(): number {
        return Math.floor(1 + this.plies / 2);
    }

    /**
     * Returns the piece standing on this square, but checks if the square is valid.
     * If not it returns the NullPieces' instance
     *
     * @param square Square
     */
    public getPieceOrNullPiece(square: Square): Piece {
        if(square._value == SquareValue.NONE) {
            return NullPiece.instance;
        }
        return this.getPiece(square.getIndex());
    }

    /**
     * Returns the king's square based on the color
     *
     * @param color
     */
    public getKingSquare(color: Color): Square {
        for(let index = 0; index < this.pieces.length; index++) {
            const piece: Piece = this.getPiece(index);

            if(piece instanceof King && piece.color == color) {
                return new Square(getSquareValue(index));
            }
        }
        return new Square(SquareValue.NONE);
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

        for(let index = 0; index < this.pieces.length; index++) {
            const piece: Piece = this.getPiece(index);
            if(piece.color != color) continue;

            const attacks: Array<Square> = piece.attackedSquares(this, new Square(getSquareValue(index)));
            attackedSquares.push(...attacks);
        }
        return attackedSquares;
    }

    /**
     * Returns 'true' when there is currently a check
     */
    public isCheck(): boolean {
        const kingSquare: Square = this.getKingSquare(getOpposite(this.sideToMove));

        for(const attacked of this.getAttackedSquares(this.sideToMove)) {
            if(kingSquare._value == attacked._value) return true;
        }
        return false;
    }

    /**
     * Returns all current pseudo legal moves
     */
    public getPseudoLegalMoves(): Array<Move> {
        const pseudoLegalMoves: Array<Move> = [];

        for(let index = 0; index < this.pieces.length; index++) {
            const piece: Piece = this.getPiece(index);
            if(piece.color != this.sideToMove) continue;

            const moves: Array<Move> = piece.pseudoLegalMoves(this, new Square(getSquareValue(index)));
            pseudoLegalMoves.push(...moves);
        }
        return pseudoLegalMoves;
    }

    /**
     * Returns all current legal moves
     */
    public getLegalMoves(): Array<Move> {
        const pseudoLegalMoves: Array<Move> = this.getPseudoLegalMoves();
        const legalMoves: Array<Move> = [];

        for(const move of pseudoLegalMoves) {
            this.makeMove(move);
            if(!this.isCheck()) {
                legalMoves.push(move);
            }
            this.unmakeMove(move);
        }
        return legalMoves;
    }

    /**
     * Returns 'true' if en passant is possible for a pawn standing on the provided square
     *
     * @param to
     * @param piece
     * @private
     */
    private isEnPassantPossible(to: Square, piece: Piece): boolean {
        const east: Square = Square.add(to, Direction.EAST);
        const west: Square = Square.add(to, Direction.WEST);

        const neighborEast: Piece = this.getPieceOrNullPiece(east);
        const neighborWest: Piece = this.getPieceOrNullPiece(west);

        return (neighborEast instanceof Pawn && neighborEast.color != piece.color) ||
            (neighborWest instanceof Pawn && neighborWest.color != piece.color);
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
        this.plies++;

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
                if(this.isEnPassantPossible(to, moved)) {
                    const enPassantIndex: number = to.getIndex() ^ 8;
                    this.enPassant._value = getSquareValue(enPassantIndex);
                }
            }
        }

        if(moveType == MoveType.CASTLING) {
            const castlingValue: CastlingValue = Castling.fromKingTargetIndex(to.getIndex());
            const startingRookIndex = Castling.getRookSourceIndex(castlingValue);
            const endingRookIndex = Castling.getRookTargetIndex(castlingValue);

            const rook: Piece = this.getPiece(startingRookIndex);

            // Remove rook and king
            this.removePiece(startingRookIndex);
            this.removePiece(from.getIndex());

            // Place rook and king at new positions
            this.placePiece(endingRookIndex, rook);
            this.placePiece(to.getIndex(), moved);
        }
        else if(moveType == MoveType.PROMOTION) {
            const promotionPiece: Piece = getPieceFromType(move._promotionType, this.sideToMove);

            this.removePiece(from.getIndex());
            this.placePiece(to.getIndex(), promotionPiece);
        }
        else {
            this.removePiece(from.getIndex());
            this.placePiece(to.getIndex(), moved);
        }

        if(moveType == MoveType.ENPASSANT) {
            const enPassantIndex: number = to.getIndex() ^ 8;
            this.removePiece(enPassantIndex);
        }

        this.sideToMove = getOpposite(this.sideToMove);
    }

    /**
     * Undo the last played move on the board
     *
     * @param move The last played Move
     */
    public unmakeMove(move: Move): void {
        const stateInfo: StateInfo | undefined = this.prevStates.pop();
        if(stateInfo === undefined) throw new Error("StateInfo is undefined");

        this.castling = stateInfo.castling;
        this.enPassant = stateInfo.enPassant;
        this.halfMoveCounter = stateInfo.halfMoveCounter;
        const captured: Piece = stateInfo.captured;

        this.sideToMove = getOpposite(this.sideToMove);
        this.plies--;

        const from: Square = move._from;
        const to: Square = move._to;
        const moveType: MoveType = move._moveType;

        if(moveType == MoveType.CASTLING) {
            const castlingValue: CastlingValue = Castling.fromKingTargetIndex(to.getIndex());
            const startingRookIndex = Castling.getRookSourceIndex(castlingValue);
            const endingRookIndex = Castling.getRookTargetIndex(castlingValue);

            const rook: Piece = this.getPiece(endingRookIndex);
            const king: Piece = this.getPiece(to.getIndex());

            // Remove rook and king
            this.removePiece(endingRookIndex);
            this.removePiece(to.getIndex());

            // Place rook and king at old positions
            this.placePiece(startingRookIndex, rook);
            this.placePiece(from.getIndex(), king);

            return;
        }

        if(moveType == MoveType.PROMOTION) {
            const pawn: Pawn = new Pawn(this.sideToMove);

            this.removePiece(to.getIndex());
            this.placePiece(from.getIndex(), pawn);

            if(!(captured instanceof NullPiece)) {
                this.placePiece(to.getIndex(), captured);
            }
            return;
        }

        const moved: Piece = this.getPiece(to.getIndex());
        this.removePiece(to.getIndex());
        this.placePiece(from.getIndex(), moved);

        if(moveType == MoveType.ENPASSANT) {
            const pawn: Pawn = new Pawn(getOpposite(this.sideToMove));
            const pawnIndex: number = this.enPassant.getIndex() ^ 8;

            this.placePiece(pawnIndex, pawn);
            return;
        }

        if(!(captured instanceof NullPiece)) {
            this.placePiece(to.getIndex(), captured);
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
        const fullMove: string = split.length > 5 ? split[5] : "1";

        this.sideToMove = sideToMove === "w" ? Color.WHITE : Color.BLACK;
        this.enPassant.setValueFromString(enPassant);
        this.halfMoveCounter = Number(halfMove);
        this.plies = Number(fullMove);
        this.plies = this.plies * 2 - 2;

        if(this.sideToMove == Color.BLACK) this.plies++;

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
     * Returns the current board position as a FEN string
     */
    public getFen(): string {
        const fen: string[] = [];

        // Pieces
        for(let rank = 7; rank >= 0; rank--) {
            let emptySquares: number = 0;
            
            for(let file = 0; file < 8; file++) {
                const index = rank * 8 + file;
                const piece: Piece = this.getPiece(index);
                
                if(piece instanceof NullPiece) {
                    emptySquares++;
                }
                else {
                    if(emptySquares > 0) {
                        fen.push(String(emptySquares));
                        emptySquares = 0;
                    }
                    fen.push(piece.character());
                }
            }
            
            if(emptySquares > 0)
                fen.push(String(emptySquares));
            
            if(rank > 0)
                fen.push("/");
        }

        fen.push(" ", this.sideToMove == Color.WHITE ? "w" : "b");
        fen.push(" ", this.castling.toString());
        fen.push(" ", this.enPassant.toString());
        fen.push(" ", String(this.halfMoveCounter));
        fen.push(" ", String(this.getFullMoveCounter()));

        return fen.join("");
    }

    /**
     * Initializes the board with empty pieces
     *
     * @private
     */
    private init(): void {
        for(let i = 0; i < this.pieces.length; i++) {
            this.pieces[i] = NullPiece.instance;
        }
    }

    /**
     * Resets all the boards' data
     */
    public reset(): void {
        this.init();
        this.sideToMove = Color.WHITE;
        this.castling.reset();
        this.enPassant._value = SquareValue.NONE;
        this.halfMoveCounter = 0;
        this.plies = 0;
        this.prevStates = [];
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