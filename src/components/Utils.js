export function createMatrix(w, h) {
    let matrix = [];
    while (h--) {
        matrix.push(new Array(w).fill(0))
    }
    return matrix;
}
export function createPiece() {

    const s = [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]
    ];
    const l = [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 1]
    ];

    const o = [
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
    ];

    const i = [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
    ]
    const pieceList = [s, l, o, i];
    return pieceList[Math.floor(Math.random() * pieceList.length)];

}