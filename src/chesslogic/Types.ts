/**
 * Represents a color in a chess game
 */
export enum Color {
    WHITE,
    BLACK,
    NONE
}

/**
 * Enum containing all piece types of a chess game
 */
export enum PieceType {
    PAWN,
    KNIGHT,
    BISHOP,
    ROOK,
    QUEEN,
    KING,
    NONE
}

/**
 * Enum containing all different move types in chess
 */
export enum MoveType {
    NORMAL,
    CAPTURE,
    PROMOTION,
    ENPASSANT,
    CASTLING
}

/**
 * Enum representing a direction on a chess board using LERF mapping (see Square.java)
 */
export enum Direction {
    // Ray Directions
    NORTH = 8,
    WEST = -1,
    SOUTH = -8,
    EAST = 1,
    NORTH_EAST = 9,
    NORTH_WEST = 7,
    SOUTH_WEST = -9,
    SOUTH_EAST = -7,
    NONE = 0,

    // Knight Directions
    KNIGHT_NORTH_NORTH_WEST = 15,
    KNIGHT_NORTH_NORTH_EAST = 17,
    KNIGHT_NORTH_EAST_EAST = 10,
    KNIGHT_SOUTH_EAST_EAST = -6,
    KNIGHT_SOUTH_SOUTH_EAST = -15,
    KNIGHT_SOUTH_SOUTH_WEST = -17,
    KNIGHT_SOUTH_WEST_WEST = -10,
    KNIGHT_NORTH_WEST_WEST = 6
}

/**
 * We will be using the "Little-Endian Rank-File Mapping" (LERF).
 * More information here: <a href="https://www.chessprogramming.org/Square_Mapping_Considerations">chessprogramming</a>
 */
export enum SquareValue {
    A1, B1, C1, D1, E1, F1, G1, H1,
    A2, B2, C2, D2, E2, F2, G2, H2,
    A3, B3, C3, D3, E3, F3, G3, H3,
    A4, B4, C4, D4, E4, F4, G4, H4,
    A5, B5, C5, D5, E5, F5, G5, H5,
    A6, B6, C6, D6, E6, F6, G6, H6,
    A7, B7, C7, D7, E7, F7, G7, H7,
    A8, B8, C8, D8, E8, F8, G8, H8,
    NONE
}