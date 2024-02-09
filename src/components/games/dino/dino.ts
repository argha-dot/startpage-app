import {
  AnimatedSprite,
  Container,
  DisplayObject,
  SCALE_MODES,
  Spritesheet,
  Texture,
} from "pixi.js";
import {
  GAME_HEIGHT,
  GROUND_HEIGHT,
  JUMP_BUFFER,
  JUMP_HEIGHT,
  JUMP_TIME_FALL,
  JUMP_TIME_PEAK,
  // MAX_GRAVITY,
} from "./consts";
// import { collisionAABBSide } from "@/lib/utils";

export interface Velocity {
  x: number;
  y: number;
}

export default class Dino extends AnimatedSprite {
  public velocity: Velocity = { x: 0, y: 0 };
  public isJumping = false;
  public jumpBuffer = 0;
  public groundHeight = GAME_HEIGHT - GROUND_HEIGHT - this.height * 3.5 + 2;
  public startJumpTime: number = 0;

  public jump_velocity = -1 * ((2 * JUMP_HEIGHT) / JUMP_TIME_PEAK);
  public jump_gravity =
    -1 * ((-2 * JUMP_HEIGHT) / (JUMP_TIME_PEAK * JUMP_TIME_PEAK));
  public fall_gravity =
    -1 * ((-2 * JUMP_HEIGHT) / (JUMP_TIME_FALL * JUMP_TIME_FALL));

  constructor() {
    super([Texture.WHITE]);
    console.log(this.jump_gravity, this.fall_gravity, this.jump_velocity);
  }

  private changeAnimationTo(animName: string, sheet: Spritesheet) {
    this.textures = sheet.animations[animName];

    this.textures.forEach((texture) => {
      texture.baseTexture.scaleMode = SCALE_MODES.NEAREST;
    });
  }

  public init(game: Container, sheet: Spritesheet) {
    this.changeAnimationTo("dino-run", sheet);

    this.position.set(40, 80);
    this.scale.set(3.5, 3.5);
    game.addChild(this);

    this.animationSpeed = 0.35;
    this.play();
  }

  private get gravity(): number {
    return this.velocity.y < 0 ? this.jump_gravity : this.fall_gravity;
  }

  public startJump() {
    this.jumpBuffer = JUMP_BUFFER;
  }

  public endJump() {
    if (this.velocity.y < -2) {
      this.velocity.y = -2;
    }
  }

  public updateMovement(_delta: number, _floor: DisplayObject) {
    // console.log(collisionAABBSide(this, floor));

    if (this.jumpBuffer > 0) {
      this.jumpBuffer -= 1;

      if (!this.isJumping) {
        this.velocity.y = this.jump_velocity;
        this.isJumping = true;
        this.jumpBuffer = 0;
        this.startJumpTime = Date.now();
      }
    }

    this.velocity.y += this.gravity * _delta;
    // if (this.velocity.y > MAX_GRAVITY) {
    //   this.velocity.y = MAX_GRAVITY;
    // }

    this.y += Math.floor(this.velocity.y) * _delta;

    if (this.y > this.groundHeight) {
      this.y = this.groundHeight;

      this.velocity.y = 0;
      if (this.isJumping) {
        console.log("duration", this.startJumpTime - Date.now());
      }
      this.isJumping = false;
    }
  }
}
