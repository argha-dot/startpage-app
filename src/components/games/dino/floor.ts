import { Container, Texture, TilingSprite } from "pixi.js";
import { COLOR_LIGHT, GAME_HEIGHT, GAME_WIDTH, GROUND_HEIGHT } from "./consts";

export default class Floor extends TilingSprite {
  constructor() {
    super(Texture.from("/dino/ground.png"));
    this.width = GAME_WIDTH * 2;
    this.height = GROUND_HEIGHT;
  }

  public init(game: Container) {
    this.position.set(0, GAME_HEIGHT - GROUND_HEIGHT);
    this.tint = COLOR_LIGHT;

    game.addChild(this);
  }

  public update(_delta: number) {
    this.tilePosition.x -= (25 / Math.pow(2, 2)) * _delta;
  }
}
