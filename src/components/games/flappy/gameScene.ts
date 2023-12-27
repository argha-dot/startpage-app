import Game, { SceneI } from "@/lib/game";
import { Container, Texture, TilingSprite } from "pixi.js";
import { GAME_HEIGHT, GROUND_HEIGHT } from "./consts";
import { keyboard } from "@/lib/game/keyboard";
import PipesHandler from "./pipe";
import Flappy from "./bird";

export class GameScene extends Container implements SceneI {
  private flappy: Flappy;
  private floor: TilingSprite;
  private background: TilingSprite[] = [];

  private gameState: "idle" | "playing" | "over" = "idle";

  private pipes = new PipesHandler();

  constructor() {
    super();

    this.flappy = new Flappy();

    this.floor = new TilingSprite(
      Texture.from("/floor.png"),
      480,
      GAME_HEIGHT - GROUND_HEIGHT,
    );

    keyboard.init();

    this.createBackdrop();
    this.createFloor();
    this.flappy.init(this);

    this.keyInputs();
  }

  private restart() {
    this.gameState = "idle";
    this.flappy.rotation = 0;
    this.pipes.destroy();

    this.flappy.velocity = 0;
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
        if ("playing" === this.gameState) {
          if (!this.flappy.jump) this.flappy.velocity = -3;
          this.flappy.jump = true;
        }
      },
      () => {
        this.flappy.jump = false;
      },
    );
    keyboard.registerKey(
      "Escape",
      () => {},
      () => {
        this.gameState = "over";
      },
    );
    keyboard.registerKey(
      "KeyR",
      () => {},
      () => {
        this.restart();
      },
    );
  }

  private birdMovement() {
    if ("idle" === this.gameState) {
      this.flappy.idleMovement();
    }

    if (
      "idle" !== this.gameState &&
      this.flappy.y + this.flappy.height / 2 < GROUND_HEIGHT
    ) {
      this.flappy.playingMovement();
      this.flappy.directionMovement();
    }
  }

  public update(deltaTime: number) {
    this.birdMovement();

    if (this.gameState !== "over") {
      this.floor.tilePosition.x -= 1 * deltaTime;
    }

    this.flappy.updateRect();

    if (this.gameState === "playing") {
      this.pipes.update(deltaTime, this);

      this.pipes.pipes.forEach((pipe) => {
        if (
          Game.testCollision(
            pipe.topPipe.getBounds(),
            this.flappy.collisionBox,
          ) ||
          Game.testCollision(
            pipe.bottomPipe.getBounds(),
            this.flappy.collisionBox,
          )
        ) {
          this.gameState = "over";
        }
      });
      this.background.forEach((drop, index) => {
        drop.tilePosition.x -= (1 / Math.pow(2, index)) * deltaTime;
      });
    }
  }
}
