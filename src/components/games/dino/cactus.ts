import { Bodies, Body, World } from "matter-js";
import { Container, SCALE_MODES, Sprite, Texture } from "pixi.js";
import { GAME_HEIGHT, GAME_WIDTH, GROUND_HEIGHT } from "./consts";

const SCALE_X = 3.5;
const SCALE_Y = 3.5;
export default class Cactus extends Sprite {
  public body: Body;

  constructor(x: number, world: World) {
    super(Texture.from("/cactus_1.png"));
    this.width = 14 * SCALE_X;
    this.height = 14 * SCALE_Y;

    this.body = Bodies.rectangle(
      x - this.width / 2,
      GAME_HEIGHT - GROUND_HEIGHT - this.height / 2,
      this.width,
      this.height,
    );
    this.body.label = "obstacle";
    this.anchor.set(0.5);

    World.add(world, this.body);
  }

  public init(game: Container) {
    this.texture = Texture.from("/cactus_1.png");
    this.texture.baseTexture.scaleMode = SCALE_MODES.NEAREST;
    this.scale.set(SCALE_X, SCALE_Y);

    game.addChild(this);
  }

  public update(_delta: number) {
    const pos = this.body.position;
    const angle = this.body.angle;

    Body.setMass(this.body, 500);
    Body.setAngle(this.body, 0);

    this.x = pos.x;
    this.y = pos.y;

    this.rotation = angle;
  }
}
