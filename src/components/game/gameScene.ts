import Game, { SceneI } from "@/lib/game";
import Keyboard, { keyboard } from "@/lib/game/keyboard";
// import Keyboard from "@/lib/game/keyboard";
import { BitmapText, Container, Sprite, Texture } from "pixi.js";
import { StartScene } from "./startScene";
import Board from "./logic";

export class GameScene extends Container implements SceneI {
  private tileSize = 100;
  private tiles: { [pos: string]: Container } = {};
  private tileGap = 20;
  private offset = (512 - 4 * this.tileSize - 3 * this.tileGap) / 2;

  // private colorBackground = 0xbbada0;
  private colorEmptyTiles = 0xcdc1b4;
  private colorFilledTiles = 0xeee4da;
  private colorNumbers = 0x776e65;

  constructor() {
    super();

    Board.init();
    keyboard.init();

    this.drawEmptyBoard();
    this.drawBoard();
    this.keyInputs();
  }

  private keyInputs() {
    keyboard.registerKey("ArrowRight", undefined, () => {
      Board.moveRight();

      this.drawEmptyBoard();
      this.drawBoard();
    });

    keyboard.registerKey("ArrowLeft", undefined, () => {
      Board.moveLeft();

      this.drawEmptyBoard();
      this.drawBoard();
    });
  }

  private posStrToVec(str: string) {
    return str.split(",").map((val) => Number(val));
  }

  private indexToPosStr(row: number, col: number): string {
    return `${col - 1},${-(row - 1)}`;
  }

  drawEmptyBoard() {
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
          -1 * (coordPos[1] - 1) * (this.tileSize + this.tileGap) + this.offset
        );

        tile.addChild(bg);
        this.addChild(tile);
      }
    });
  }

  drawNumber(pos: string, num: number) {
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
      numberdBg.tint = this.colorFilledTiles;

      numberdBg.position.set(positionX, positionY);

      const bitmapText = new BitmapText(`${num}`, {
        fontName: "comic 20",
        fontSize: 60,
      });
      bitmapText.tint = this.colorNumbers;
      bitmapText.position.set(
        positionX + this.tileSize / 2 - bitmapText.width / 2,
        positionY + this.tileSize / 2 - bitmapText.height / 2
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
      Game.changeScene(new StartScene());
    }
  }
}
