export type rowT = [number, number, number, number];

const dirMap = {
  right: [0, 1],
  left: [0, -1],
  up: [-1, 0],
  down: [1, 0],
};

class Board {
  public static board: [rowT, rowT, rowT, rowT] = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  private static getRandomTile(): [number, number] {
    const row = Math.floor(Math.random() * 4);
    const col = Math.floor(Math.random() * 4);

    return [row, col];
  }

  private static twoOrFour(): 2 | 4 {
    return Math.random() > 0.9 ? 4 : 2;
  }

  public static valueInPos(row: number, col: number) {
    return Board.board[row][col];
  }

  private static addNewTile() {
    while (true) {
      const [row, col] = Board.getRandomTile();

      if (Board.board[row][col] === 0) {
        Board.board[row][col] = Board.twoOrFour();
        return;
      }
    }
  }

  private static moveTo(
    initRow: number,
    initCol: number,
    direction: "right" | "left" | "up" | "down"
  ) {
    let currRow = initRow;
    let currCol = initCol;
    let dir = dirMap[direction];
    console.log(initRow, initCol);

    while (true) {
      const nextTileCoord = [currRow + dir[0], currCol + dir[1]];
      if (Board.board[nextTileCoord[0]][nextTileCoord[1]] !== 0) {
        console.log(
          `other tile ${initRow} ${initCol}`,
          nextTileCoord[0],
          nextTileCoord[1],
          `nextTileCoord, ${Board.board[nextTileCoord[0]][nextTileCoord[1]]}`
        );
        if (
          Board.valueInPos(nextTileCoord[0], nextTileCoord[1]) ===
          Board.valueInPos(initRow, initCol)
        ) {
          const currVal = Board.board[initRow][initCol];
          Board.board[initRow][initCol] = 0;
          Board.board[nextTileCoord[0]][nextTileCoord[1]] = currVal * 2;
          return;
        }

        const currVal = Board.board[initRow][initCol];
        Board.board[initRow][initCol] = 0;
        Board.board[currRow][currCol] = currVal;
        return;
      }

      currRow = nextTileCoord[0];
      currCol = nextTileCoord[1];
    }
  }

  public static print() {
    console.log(
      ` ${Board.board[0]}\n`,
      `${Board.board[1]}\n`,
      `${Board.board[2]}\n`,
      `${Board.board[3]}`
    );
  }

  public static init() {
    [0, 1].forEach(() => {
      Board.addNewTile();
    });
  }

  public static moveRight() {
    Board.board.forEach((row, rowI) => {
      row
        .slice(0, 3)
        .reverse()
        .forEach((val, revColI) => {
          if (val === 0) return;
          // if (revColI === 0) return;
          let colI = -1 * (revColI - 2);

          this.moveTo(rowI, colI, "right");
        });
    });

    Board.addNewTile();
  }
  public static moveLeft() {
    Board.board.forEach((row, rowI) => {
      row.forEach((val, colI) => {
        if (val === 0) return;
        // let colI = -1 * (revColI - 2);

        this.moveTo(rowI, colI, "left");
      });
    });

    Board.addNewTile();
  }
  public static moveDown() {}
  public static moveUp() {}
}

export default Board;
