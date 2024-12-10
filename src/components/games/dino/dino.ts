import { AnimatedSprite, Container, Texture } from "pixi.js";
import {
  JUMP_BUFFER,
  JUMP_HEIGHT,
  JUMP_TIME_FALL,
  JUMP_TIME_PEAK,
  MAX_GRAVITY,
} from "./consts";
import { Vec2D } from "@/lib/game/vec";
import { getFallGravity, getJumpGravity, getJumpVelo } from "@/lib/utils";
import { keyboard } from "@/lib/game/keyboard";

type Velocity = Vec2D;

export default class Dino extends AnimatedSprite {
  public pos: Vec2D = { x: 0, y: 0 };
  public v: Velocity = { x: 0, y: 0 };
  public velocity: Velocity = { x: 0, y: 0 };
  public onAir = false;
  public jumpBuffer = 0;

  public jump_velocity = getJumpVelo(JUMP_HEIGHT, JUMP_TIME_PEAK);
  public jump_gravity = getJumpGravity(JUMP_HEIGHT, JUMP_TIME_PEAK);
  public fall_gravity = getFallGravity(JUMP_HEIGHT, JUMP_TIME_FALL);

  constructor(x: number, y: number) {
    super([Texture.WHITE]);

    this.pos.x = x;
    this.pos.y = y;
  }

  public init(game: Container) {
    this.keyInputs();

    this.position.set(this.pos.x, this.pos.y);
    this.scale.set(3, 3);
    game.addChild(this);

    this.play();
  }

  private get gravity(): number {
    return this.v.y < 0 ? this.jump_gravity : this.fall_gravity;
  }

  public startJump() {
    console.log("startJump");
    this.jumpBuffer = JUMP_BUFFER;
  }

  public endJump() {
    if (this.velocity.y < -0.1) {
      this.velocity.y = -0.1;
    }
  }

  public keyInputs() {
    keyboard.registerKey(
      "Space",
      () => this.startJump(),
      () => this.endJump(),
    );
  }

  public updateMovement(_delta: number) {
    if (this.jumpBuffer > 0) {
      this.jumpBuffer -= 1;

      if (!this.onAir) {
        this.velocity.y = this.jump_velocity;
        this.onAir = true;
        this.jumpBuffer = 0;
      }
    }

    this.velocity.y += this.gravity * _delta;
    if (this.velocity.y > MAX_GRAVITY) {
      this.velocity.y = MAX_GRAVITY;
    }
  }
}
