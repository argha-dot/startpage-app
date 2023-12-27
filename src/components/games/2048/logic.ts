export type rowT = [number, number, number, number];

const X = 0;
const Y = 1;
const ROW = 0;
const COL = 1;

const dirMap = {
  right: [0, 1],
  left: [0, -1],
  up: [-1, 0],
  down: [1, 0],
};

export enum Directions {
  Up = "up",
  Down = "down",
  Right = "right",
  Left = "left",
}

export interface PositionChangeI {
  start: [number, number];
  end: [number, number];
}

class Board {
  public static gameOver = false;
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
    let _continue = false;
    this.checkForGameOver();
    Board.board.forEach((row) => {
      row.forEach((val) => {
        if (val === 0) {
          _continue = true;
          return;
        }
      });
    });

    if (!_continue) {
      if (this.checkForGameOver()) {
        Board.gameOver = true;
      }
      return;
    }

    while (true) {
      const [row, col] = Board.getRandomTile();

      if (Board.board[row][col] === 0) {
        Board.board[row][col] = Board.twoOrFour();
        return;
      }
    }
  }

  private static checkForGameOver(): boolean {
    let retVal = true;
    for (let rowI = 0; rowI < Board.board.length; rowI++) {
      for (let colI = 0; colI < Board.board[rowI].length; colI++) {
        Object.values(dirMap).forEach((dir) => {
          if (
            rowI + dir[0] < 0 ||
            rowI + dir[0] >= 4 ||
            colI + dir[1] < 0 ||
            colI + dir[1] >= 4
          ) {
            return;
          }
          const valueInDirection = Board.board[rowI + dir[0]][colI + dir[1]];
          const val = Board.board[rowI][colI];

          if (valueInDirection === 0 || val === valueInDirection) {
            retVal = false;
            return;
          }
        });
      }
    }

    return retVal;
  }

  private static moveTo(
    initRow: number,
    initCol: number,
    direction: Directions,
  ): [number, number] {
    let currRow = initRow;
    let currCol = initCol;
    let dir = dirMap[direction];
    // console.log(initRow, initCol);

    while (true) {
      // get the adjacent tile according to the direction
      const nextTileCoord = [currRow + dir[ROW], currCol + dir[COL]];
      // console.log("nextTile: ", nextTileCoord);

      if (!Board.board[nextTileCoord[X]]) {
        const currVal = Board.valueInPos(initRow, initCol);
        Board.board[initRow][initCol] = 0;
        Board.board[currRow][currCol] = currVal;

        return [currRow, currCol];
      }

      if (Board.board[nextTileCoord[X]][nextTileCoord[Y]] !== 0) {
        // console.log(
        //   `other tile ${initRow} ${initCol}`,
        //   nextTileCoord[0],
        //   nextTileCoord[1],
        //   `nextTileCoord, ${Board.board[nextTileCoord[X]][nextTileCoord[Y]]}`,
        // );
        if (
          Board.valueInPos(nextTileCoord[X], nextTileCoord[Y]) ===
          Board.valueInPos(initRow, initCol)
        ) {
          const currVal = Board.board[initRow][initCol];
          Board.board[initRow][initCol] = 0;
          Board.board[nextTileCoord[X]][nextTileCoord[Y]] = currVal * 2;
          return [currRow, currCol];
        }

        const currVal = Board.board[initRow][initCol];
        Board.board[initRow][initCol] = 0;
        Board.board[currRow][currCol] = currVal;
        return [currRow, currCol];
      }

      currRow = nextTileCoord[X];
      currCol = nextTileCoord[Y];
    }
  }

  public static print() {
    console.log(
      ` ${Board.board[0]}\n`,
      `${Board.board[1]}\n`,
      `${Board.board[2]}\n`,
      `${Board.board[3]}`,
    );
  }

  public static init() {
    [0, 1].forEach(() => {
      Board.addNewTile();
    });
  }

  public static restart() {
    Board.board = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];

    [0, 1].forEach(() => {
      Board.addNewTile();
    });
    Board.gameOver = false;
  }

  public static moveRight(): PositionChangeI[] {
    let changes: PositionChangeI[] = [];

    Board.board.forEach((row, rowI) => {
      row.toReversed().forEach((val, revColI) => {
        // if (revColI === 0) return;
        let colI = -1 * (revColI - 3);
        if (val === 0) return;

        const [currRow, currCol] = this.moveTo(rowI, colI, Directions.Right);
        changes.push({
          start: [rowI, colI],
          end: [currRow, currCol],
        });
      });
    });

    Board.addNewTile();
    return changes;
  }

  public static moveLeft() {
    Board.board.forEach((row, rowI) => {
      row.forEach((val, colI) => {
        if (val === 0) return;

        const [] = this.moveTo(rowI, colI, Directions.Left);
      });
    });

    Board.addNewTile();
  }

  public static moveDown() {
    Board.board.toReversed().forEach((row, revRowI) => {
      let rowI = -1 * (revRowI - 3);
      row.forEach((val, colI) => {
        if (val === 0) return;

        const [] = this.moveTo(rowI, colI, Directions.Down);
      });
    });

    Board.addNewTile();
  }

  public static moveUp() {
    Board.board.forEach((row, rowI) => {
      row.forEach((val, colI) => {
        if (val === 0) return;

        const [] = this.moveTo(rowI, colI, Directions.Up);
      });
    });

    Board.addNewTile();
  }
}

export default Board;
