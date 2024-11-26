import {Move} from "../chesslogic/Move.ts";
import {Board} from "../chesslogic/Board.ts";

class PerftResult {

    public fen: string;
    public depth: number;
    public nodes: number;

    public constructor(fen: string, depth: number, nodes: number) {
        this.fen = fen;
        this.depth = depth;
        this.nodes = nodes;
    }

}

class Perft {

    public board: Board;

    public constructor() {
        this.board = new Board();
    }

    public perft(depth: number): number {
        if(depth == 0) return 1;

        let nodes: number = 0;
        const pseudoLegalMoves: Array<Move> = this.board.getPseudoLegalMoves();

        for(const move of pseudoLegalMoves) {
            this.board.makeMove(move);

            if(!this.board.isCheck()) {
                nodes += this.perft(depth - 1);
            }

            this.board.unmakeMove(move);
        }
        return nodes;
    }

}

const standardPositions: Array<PerftResult> = [
    new PerftResult("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1", 4, 197281),
    new PerftResult("r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq - 0 1", 4, 4085603),
    new PerftResult("8/2p5/3p4/KP5r/1R3p1k/8/4P1P1/8 w - - 0 1", 5, 674624),
    new PerftResult("r3k2r/Pppp1ppp/1b3nbN/nP6/BBP1P3/q4N2/Pp1P2PP/R2Q1RK1 w kq - 0 1", 4, 422333),
    new PerftResult("rnbq1k1r/pp1Pbppp/2p5/8/2B5/8/PPP1NnPP/RNBQK2R w KQ - 1 8", 4, 2103487),
    new PerftResult("r4rk1/1pp1qppp/p1np1n2/2b1p1B1/2B1P1b1/P1NP1N2/1PP1QPPP/R4RK1 w - - 0 1", 4, 3894594)
];

const advancedPositions: Array<PerftResult> = [
    new PerftResult("3k4/3p4/8/K1P4r/8/8/8/8 b - - 0 1", 6, 1134888),
    new PerftResult("8/8/4k3/8/2p5/8/B2P2K1/8 w - - 0 1", 6, 1015133),
    new PerftResult("8/8/1k6/2b5/2pP4/8/5K2/8 b - d3 0 1", 6, 1440467),
    new PerftResult("5k2/8/8/8/8/8/8/4K2R w K - 0 1", 6, 661072),
    new PerftResult("3k4/8/8/8/8/8/8/R3K3 w Q - 0 1", 6, 803711),
    new PerftResult("r3k2r/1b4bq/8/8/8/8/7B/R3K2R w KQkq - 0 1", 4, 1274206),
    new PerftResult("r3k2r/8/3Q4/8/8/5q2/8/R3K2R b KQkq - 0 1", 4, 1720476),
    new PerftResult("2K2r2/4P3/8/8/8/8/8/3k4 w - - 0 1", 5, 266199),
    new PerftResult("8/8/1P2K3/8/2n5/1q6/8/5k2 b - - 0 1", 5, 1004658),
    new PerftResult("4k3/1P6/8/8/8/8/K7/8 w - - 0 1", 6, 217342),
    new PerftResult("8/P1k5/K7/8/8/8/8/8 w - - 0 1", 6, 92683),
    new PerftResult("K1k5/8/P7/8/8/8/8/8 w - - 0 1", 6, 2217),
    new PerftResult("8/k1P5/8/1K6/8/8/8/8 w - - 0 1", 7, 567584),
    new PerftResult("8/8/2k5/5q2/5n2/8/5K2/8 b - - 0 1", 4, 23527)
];

test("standardPositions", () => {
    const perft: Perft = new Perft();

    for(const result of standardPositions) {
        perft.board.setFen(result.fen);
        const nodes: number = perft.perft(result.depth);

        expect(nodes).toBe(result.nodes);
    }
});

test("advancedPositions", () => {
    const perft: Perft = new Perft();

    for(const result of advancedPositions) {
        perft.board.setFen(result.fen);
        const nodes: number = perft.perft(result.depth);

        expect(nodes).toBe(result.nodes);
    }
});