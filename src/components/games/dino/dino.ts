import {
  AnimatedSprite,
  Container,
  SCALE_MODES,
  Spritesheet,
  Texture,
} from "pixi.js";
import {
  JUMP_BUFFER,
  JUMP_HEIGHT,
  JUMP_TIME_FALL,
  JUMP_TIME_PEAK,
  MAX_GRAVITY,
} from "./consts";
import { Vec2D } from "@/lib/game/vec";
import { Bodies, Body, Pair, Vector, World } from "matter-js";
import { getFallGravity, getJumpGravity, getJumpVelo } from "@/lib/utils";
import { keyboard } from "@/lib/game/keyboard";

type Velocity = Vec2D;

export default class Dino extends AnimatedSprite {
  public v: Velocity = { x: 0, y: 0 };
  public velocity = Vector.create(0, 0);
  public onAir = false;
  public jumpBuffer = 0;

  public jump_velocity = getJumpVelo(JUMP_HEIGHT, JUMP_TIME_PEAK);
  public jump_gravity = getJumpGravity(JUMP_HEIGHT, JUMP_TIME_PEAK);
  public fall_gravity = getFallGravity(JUMP_HEIGHT, JUMP_TIME_FALL);

  public body: Body;

  public horizontalMovement: "r" | "l" | "" = "";

  constructor(x: number, y: number, world: World) {
    super([Texture.WHITE]);

    this.body = Bodies.rectangle(
      x - this.texture.width / 2,
      y - this.texture.height / 2,
      this.texture.width * 3.5,
      this.texture.height * 3.5,
    );
    this.body.label = "dino";
    this.anchor.set(0.5);

    World.add(world, this.body);
  }

  private changeAnimationTo(animName: string, sheet: Spritesheet) {
    this.textures = sheet.animations[animName];

    this.textures.forEach((texture) => {
      texture.baseTexture.scaleMode = SCALE_MODES.NEAREST;
    });
  }

  public init(game: Container, sheet: Spritesheet) {
    this.keyInputs();
    this.changeAnimationTo("dino-run", sheet);

    this.scale.set(3.5, 3.5);
    game.addChild(this);

    this.animationSpeed = 0.35;
    this.play();
  }

  private get gravity(): number {
    return this.v.y < 0 ? this.jump_gravity : this.fall_gravity;
  }

  public startJump() {
    this.jumpBuffer = JUMP_BUFFER;
  }

  public endJump() {
    if (this.velocity.y < -0.1) {
      this.velocity.y = -0.1;
    }
  }

  public onCollison(pair: Pair) {
    if (pair.bodyB.label === "floor" || pair.bodyA.label === "floor") {
      this.onAir = false;
    }
  }

  public keyInputs() {
    keyboard.registerKey(
      "Space",
      () => this.startJump(),
      () => this.endJump(),
    );

    keyboard.registerKey(
      "KeyD",
      () => (this.horizontalMovement = "r"),
      () => (this.horizontalMovement = ""),
    );
    keyboard.registerKey(
      "KeyA",
      () => (this.horizontalMovement = "l"),
      () => (this.horizontalMovement = ""),
    );
  }

  public updateMovement(_delta: number) {
    if (this.horizontalMovement === "r") {
      this.velocity.x += 0.5 * _delta;
      if (this.velocity.x > 8) {
        this.velocity.x = 8;
      }
    } else if (this.horizontalMovement === "l") {
      this.velocity.x -= 0.5 * _delta;
      if (this.velocity.x < -8) {
        this.velocity.x = -8;
      }
    } else if (this.horizontalMovement === "") {
      if (this.velocity.x > 0) {
        this.velocity.x -= 0.5 * _delta;
      } else if (this.velocity.x < 0) {
        this.velocity.x += 0.5 * _delta;
      }
      if (Math.abs(this.velocity.x) > 0 && Math.abs(this.velocity.x) < 1) {
        this.velocity.x = 0;
      }
    }

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

    Body.setVelocity(this.body, this.velocity);
    Body.setAngle(this.body, this.angle);

    const pos = this.body.position;
    const angle = this.body.angle;

    this.x = pos.x;
    this.y = pos.y;

    this.rotation = angle;
  }
}
