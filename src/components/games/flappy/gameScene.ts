import { SceneI } from "@/lib/game";
import { Container, Sprite, Texture, TilingSprite } from "pixi.js";
import {
  FLAPPY_HEIGHT,
  FLAPPY_WIDTH,
  GAME_HEIGHT,
  GAME_WIDTH,
  GRAVITY_ACC,
  GROUND_HEIGHT,
  MAX_GRAVIRY,
} from "./consts";
import { keyboard } from "@/lib/game/keyboard";
import PipesHandler from "./pipe";

export class GameScene extends Container implements SceneI {
  private flappy: Sprite;
  private floor: TilingSprite;
  private background: TilingSprite[] = [];

  private gameState: "idle" | "playing" = "idle";

  private velocity = 0;
  private jump = false;

  private pipes = new PipesHandler();

  constructor() {
    super();

    this.flappy = new Sprite(Texture.from("/flappy.png"));

    this.floor = new TilingSprite(
      Texture.from("/floor.png"),
      480,
      GAME_HEIGHT - GROUND_HEIGHT,
    );

    keyboard.init();

    this.createBackdrop();
    this.createFloor();
    this.createFlappy();

    this.keyInputs();
  }

  private createFlappy() {
    this.flappy.position.set(
      (GAME_WIDTH - FLAPPY_WIDTH) / 2,
      (GAME_HEIGHT - FLAPPY_HEIGHT) / 2,
    );

    this.addChild(this.flappy);
    this.flappy.pivot.set(FLAPPY_WIDTH / 2, FLAPPY_HEIGHT / 2);
  }

  private createFloor() {
    this.floor.y = GROUND_HEIGHT;

    this.addChild(this.floor);
  }

  private createBackdrop() {
    const backdrop = new Container();
    const grass = new TilingSprite(Texture.from("/grass.png"), 480, 70);
    const clouds = new TilingSprite(Texture.from("/clouds.png"), 480, 200);
    const buildings = new TilingSprite(
      Texture.from("/buildings.png"),
      480,
      140,
    );

    grass.y = GAME_HEIGHT - 70 - (3 * GAME_HEIGHT) / 20;
    clouds.y = GAME_HEIGHT - 200 - (3 * GAME_HEIGHT) / 20;
    buildings.y = GAME_HEIGHT - 140 - (3 * GAME_HEIGHT) / 20;

    this.background.push(grass, buildings, clouds);
    backdrop.addChild(clouds, buildings, grass);

    this.addChild(backdrop);
  }

  private keyInputs() {
    keyboard.registerKey(
      "Space",
      () => {
        if ("idle" === this.gameState) this.gameState = "playing";
        if (!this.jump) this.velocity = -3;
        this.jump = true;
      },
      () => {
        this.jump = false;
      },
    );
    keyboard.registerKey(
      "Escape",
      () => {},
      () => {
        this.gameState = "idle";
      },
    );
  }

  private birdMovement() {
    if (this.gameState === "idle") {
      this.flappy.y =
        (GAME_HEIGHT - FLAPPY_HEIGHT) / 2 +
        Math.floor(Math.sin(Date.now() / 100) * 10);
    }

    if (
      "playing" === this.gameState &&
      this.flappy.y + this.flappy.height / 2 < GROUND_HEIGHT
    ) {
      this.velocity += GRAVITY_ACC;
      if (this.velocity > MAX_GRAVIRY) {
        this.velocity = MAX_GRAVIRY;
      }
      this.flappy.y += Math.floor(this.velocity);
    }
  }

  private birdDirection() {
    if (this.velocity > 0) {
      this.flappy.rotation += Math.PI / 180;
      if (this.flappy.rotation > Math.PI / 4) {
        this.flappy.rotation = Math.PI / 4;
      }
    } else if (this.velocity < 0) {
      this.flappy.rotation -= Math.PI / 180;
      if (this.flappy.rotation < -Math.PI / 4) {
        this.flappy.rotation = -Math.PI / 4;
      }
    }
  }

  public update(deltaTime: number) {
    this.birdMovement();
    this.birdDirection();
    this.floor.tilePosition.x -= 1 * deltaTime;

    if (this.gameState === "playing") {
      this.pipes.update(deltaTime, this);
    }

    this.background.forEach((drop, index) => {
      drop.tilePosition.x -= (1 / Math.pow(2, index)) * deltaTime;
    });
  }
}
