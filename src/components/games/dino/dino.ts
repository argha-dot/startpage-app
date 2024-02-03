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
  GRAVITY_ACC,
  GROUND_HEIGHT,
  JUMP_BUFFER,
  MAX_GRAVITY,
} from "./consts";
import { collisionAABBSide } from "@/lib/utils";

export interface Velocity {
  x: number;
  y: number;
}

export default class Dino extends AnimatedSprite {
  public velocity: Velocity = { x: 0, y: 0 };
  public isJumping = false;
  public jumpBuffer = 0;
  public groundHeight = GAME_HEIGHT - GROUND_HEIGHT - this.height * 3.5 + 2;

  constructor() {
    super([Texture.WHITE]);
  }

  public init(game: Container, sheet: Spritesheet) {
    this.textures = sheet.animations["dino-run"];

    this.textures.forEach((texture) => {
      texture.baseTexture.scaleMode = SCALE_MODES.NEAREST;
    });

    this.position.set(40, 80);
    this.scale.set(3.5, 3.5);
    game.addChild(this);

    this.animationSpeed = 0.35;
    this.play();
  }

  public startJump() {
    this.jumpBuffer = JUMP_BUFFER;
  }

  public endJump() {
    if (this.velocity.y < -2) {
      this.velocity.y = -2;
    }
  }

  public updateMovement(_delta: number, floor: DisplayObject) {
    console.log(collisionAABBSide(this, floor));

    if (this.jumpBuffer > 0) {
      this.jumpBuffer -= 1;

      if (!this.isJumping) {
        this.velocity.y = -7;
        this.isJumping = true;
        this.jumpBuffer = 0;
      }
    }

    this.velocity.y += GRAVITY_ACC * _delta;
    if (this.velocity.y > MAX_GRAVITY) {
      this.velocity.y = MAX_GRAVITY;
    }

    this.y += Math.floor(this.velocity.y) * _delta;

    if (this.y > this.groundHeight) {
      this.y = this.groundHeight;

      this.velocity.y = 0;
      this.isJumping = false;
    }
  }
}
