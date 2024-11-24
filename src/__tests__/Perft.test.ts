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

test("standardPositions", () => {
    const perft: Perft = new Perft();
    const result: PerftResult = new PerftResult("r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq - 0 1", 3, 97862);

    perft.board.setFen(result.fen);

    expect(perft.perft(result.depth)).toBe(result.nodes);
});