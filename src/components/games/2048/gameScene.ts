import Game, { SceneI } from "@/lib/game";
import Keyboard, { keyboard } from "@/lib/game/keyboard";
import { BitmapText, Container, Sprite, Texture } from "pixi.js";
import { StartScene } from "./startScene";
import Board from "./logic";

export class GameScene extends Container implements SceneI {
  private tileSize = 100;
  private tiles: { [pos: string]: Container } = {};
  private tileGap = 20;
  private offset = (512 - 4 * this.tileSize - 3 * this.tileGap) / 2;

  private colorEmptyTiles = 0xcdc1b4;
  private colorNumbers = 0x776e65;

  constructor() {
    super();

    Board.init();
    keyboard.init();

    this.drawEmptyBoard();
    this.drawBoard();
    this.keyInputs();
  }

  private reDrawBoard() {
    this.drawEmptyBoard();
    this.drawBoard();
    console.log(this.tiles);
  }

  private keyInputs() {
    keyboard.registerKey("ArrowRight", undefined, () => {
      // const changes = Board.moveRight();

      this.reDrawBoard();
    });

    keyboard.registerKey("ArrowLeft", undefined, () => {
      Board.moveLeft();

      this.reDrawBoard();
    });

    keyboard.registerKey("ArrowUp", undefined, () => {
      Board.moveUp();

      this.reDrawBoard();
    });

    keyboard.registerKey("ArrowDown", undefined, () => {
      Board.moveDown();

      this.reDrawBoard();
    });
  }

  private posStrToVec(str: string) {
    return str.split(",").map((val) => Number(val));
  }

  private indexToPosStr(row: number, col: number): string {
    return `${col - 1},${-(row - 1)}`;
  }

  private getColorOfTile(val: number): number {
    return Math.floor(((18 - Math.log2(val)) * 65535) / 40) * 256 + 255;
  }

  private drawEmptyBoard() {
    const positions: string[] = [
      "-1,1",
      "0,1",
      "1,1",
      "2,1",
      "-1,0",
      "0,0",
      "1,0",
      "2,0",
      "-1,-1",
      "0,-1",
      "1,-1",
      "2,-1",
      "-1,-2",
      "0,-2",
      "1,-2",
      "2,-2",
    ];

    positions.forEach((coord) => {
      this.tiles[coord] = new Container();
      const tile = this.tiles[coord];

      if (tile) {
        let bg = new Sprite(Texture.WHITE);

        bg.width = this.tileSize;
        bg.height = this.tileSize;
        bg.tint = this.colorEmptyTiles;

        let coordPos = this.posStrToVec(coord);
        bg.position.set(
          (coordPos[0] + 1) * (this.tileSize + this.tileGap) + this.offset,
          -1 * (coordPos[1] - 1) * (this.tileSize + this.tileGap) + this.offset,
        );

        tile.addChild(bg);
        this.addChild(tile);
      }
    });
  }

  private drawNumber(pos: string, num: number) {
    let numberTile = this.tiles[pos];

    if (numberTile) {
      const p = this.posStrToVec(pos);
      const positionX =
        (p[0] + 1) * (this.tileSize + this.tileGap) + this.offset;
      const positionY =
        -1 * (p[1] - 1) * (this.tileSize + this.tileGap) + this.offset;
      const numberdBg = new Sprite(Texture.WHITE);

      numberdBg.width = this.tileSize;
      numberdBg.height = this.tileSize;
      numberdBg.tint = this.getColorOfTile(num);

      numberdBg.position.set(positionX, positionY);

      const bitmapText = new BitmapText(`${num}`, {
        fontName: "comic 20",
        fontSize: 40,
      });
      bitmapText.tint = this.colorNumbers;
      bitmapText.position.set(
        positionX + this.tileSize / 2 - bitmapText.width / 2,
        positionY + this.tileSize / 2 - bitmapText.height / 2,
      );

      numberTile.addChild(numberdBg, bitmapText);
    }
  }

  drawBoard() {
    Board.board.forEach((row, rowI) => {
      row.forEach((val, colI) => {
        if (val !== 0) {
          this.drawNumber(this.indexToPosStr(rowI, colI), val);
        }
      });
    });
  }

  update() {
    if (Keyboard.state.get("Space")) {
      Board.restart();
      this.reDrawBoard();
    }

    if (Keyboard.state.get("Escape")) {
      Game.changeScene(new StartScene());
    }

    if (Board.gameOver) {
      Board.restart();
      this.reDrawBoard();
      Game.changeScene(new StartScene());
    }
  }
}
