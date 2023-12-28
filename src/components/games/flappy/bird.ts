import { Container, Rectangle, Sprite, Texture } from "pixi.js";
import {
  FLAPPY_HEIGHT,
  FLAPPY_WIDTH,
  GAME_HEIGHT,
  GAME_WIDTH,
  GRAVITY_ACC,
  MAX_GRAVIRY,
} from "./consts";

export default class Flappy extends Sprite {
  public velocity = 0;
  public jump = false;
  public collisionBox = new Rectangle();

  constructor() {
    super(Texture.from("/flappy.png"));
  }

  public init(game: Container) {
    this.position.set(
      (GAME_WIDTH - FLAPPY_WIDTH) / 2,
      (GAME_HEIGHT - FLAPPY_HEIGHT) / 2,
    );

    this.collisionBox.width = 34;
    this.collisionBox.height = 26;

    game.addChild(this);
    this.pivot.set(FLAPPY_WIDTH / 2, FLAPPY_HEIGHT / 2);
  }

  public idleMovement() {
    this.y =
      (GAME_HEIGHT - FLAPPY_HEIGHT) / 2 +
      Math.floor(Math.sin(Date.now() / 100) * 10);
  }

  public playingMovement(delta: number) {
    this.velocity += GRAVITY_ACC;
    if (this.velocity > MAX_GRAVIRY) {
      this.velocity = MAX_GRAVIRY;
    }
    this.y += Math.floor(this.velocity) * delta;
  }

  public directionMovement() {
    if (this.velocity > 0) {
      this.rotation += Math.PI / 180;
      if (this.rotation > Math.PI / 2) {
        this.rotation = Math.PI / 2;
      }
    } else if (this.velocity < 0) {
      this.rotation -= Math.PI / 90;
      if (this.rotation < -Math.PI / 4) {
        this.rotation = -Math.PI / 4;
      }
    }
  }

  public updateRect() {
    this.collisionBox.x = this.x + 2 - FLAPPY_WIDTH / 2;
    this.collisionBox.y = this.y + 4 - FLAPPY_HEIGHT / 2;
  }
}
