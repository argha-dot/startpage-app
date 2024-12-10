import Scene from "@/lib/game/scene";
import { Container, TilingSprite } from "pixi.js";
import { keyboard } from "@/lib/game/keyboard";
import { GAME_HEIGHT } from "../consts";
import Dino from "../dino";
import Floor from "../floor";

export default class GameScene extends Scene {
  private background: TilingSprite[] = [];
  private dino: Dino;
  private floor: Floor;

  constructor() {
    super();

    this.dino = new Dino(40, GAME_HEIGHT - 120 - 16 * 3);
    this.floor = new Floor();
  }

  public async init() {
    keyboard.init();

    this.createBackground();

    this.dino.init(this);
    this.dino.keyInputs();

    this.floor.init(this);
  }

  private createBackground() {
    const backdrop = new Container();

    this.addChild(backdrop);
  }

  private moveBackground(_delta: number) {
    this.background.forEach((bg, index) => {
      bg.tilePosition.x -= (0.25 / Math.pow(2, index)) * _delta;
    });
  }

  public start() {}

  public stop() {}

  public update(_delta: number) {
    // this.moveBackground(_delta);
    this.floor.update(_delta);

    this.dino.updateMovement(_delta);
  }
}
