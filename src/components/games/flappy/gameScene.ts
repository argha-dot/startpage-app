import Game, { SceneI } from "@/lib/game";
import {
  BitmapFont,
  BitmapText,
  Container,
  Texture,
  TilingSprite,
} from "pixi.js";
import {
  FLAPPY_JUMP,
  GAME_HEIGHT,
  GAME_WIDTH,
  GROUND_HEIGHT,
  GROUND_SPEED,
} from "./consts";
import { keyboard } from "@/lib/game/keyboard";
import PipesHandler from "./pipe";
import Flappy from "./bird";
import { Howl } from "howler";
import "@/styles/index.css";

export class GameScene extends Container implements SceneI {
  private floor: TilingSprite;
  private background: TilingSprite[] = [];

  private flappy: Flappy;
  private pipes = new PipesHandler();

  private score = 0;
  private betweenPipe = false;
  private gameState: "idle" | "playing" | "over" = "idle";
  private scoreText: BitmapText;

  private bgSound = new Howl({
    src: ["/bg.mp3"],
    html5: true,
    loop: true,
    volume: 0.2,
  });
  private sounds = new Howl({
    src: ["/flappy.wav"],
    sprite: {
      fly: [0, 185],
      hit: [250, 630],
    },
  });

  constructor() {
    super();

    this.flappy = new Flappy();

    BitmapFont.from("eight-bit", {
      fontFamily: "Pixelized, sans-serif",
      fontSize: 20,
      fontWeight: "normal",
    });
    this.scoreText = new BitmapText(`${this.score}`, {
      fontName: "eight-bit",
      fontSize: 20,
      tint: 0xff0000,
    });

    this.floor = new TilingSprite(
      Texture.from("/floor.png"),
      480,
      GAME_HEIGHT - GROUND_HEIGHT,
    );

    keyboard.init();

    this.createBackdrop();
    this.createFloor();
    this.flappy.init(this);

    this.setupScore();

    this.keyInputs();
  }

  private setupScore() {
    this.scoreText.position.x = GAME_WIDTH / 2;
    this.scoreText.position.y = GROUND_HEIGHT / 4;
    this.scoreText.anchor.set(0.5, 0.5);
    this.addChild(this.scoreText);
  }

  private restart() {
    this.gameState = "idle";
    this.flappy.rotation = 0;
    this.pipes.destroy();

    this.score = 0;
    this.bgSound.stop();

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
        if ("idle" === this.gameState) {
          this.gameState = "playing";
          this.scoreText.text = "0";

          this.bgSound.play();
        }
        if ("playing" === this.gameState) {
          if (!this.flappy.jump) {
            this.flappy.velocity = -1 * FLAPPY_JUMP;
            this.sounds.play("fly");
          }
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

  private birdMovement(delta: number) {
    if ("idle" === this.gameState) {
      this.flappy.idleMovement();
    }

    if ("idle" !== this.gameState && this.flappy.y < GROUND_HEIGHT) {
      this.flappy.playingMovement(delta);
      this.flappy.updateRect();
      this.flappy.directionMovement();
    }
  }

  public update(deltaTime: number) {
    this.birdMovement(deltaTime);

    if (this.gameState === "idle") {
      this.floor.tilePosition.x -= 1 * deltaTime;

      this.scoreText.text = "Press Space";
    }

    if (this.gameState === "playing") {
      this.floor.tilePosition.x -= GROUND_SPEED * deltaTime;
      this.pipes.update(deltaTime, this);

      this.pipes.pipes.forEach((pipe) => {
        if (Game.testCollision(pipe.getBounds(), this.flappy.collisionBox)) {
          this.betweenPipe = true;
        } else {
          if (this.betweenPipe) {
            this.score += 1;
            this.scoreText.text = `${this.score}`;
          }
          this.betweenPipe = false;
        }
        if (
          Game.testCollision(
            pipe.topPipe.getBounds(),
            this.flappy.collisionBox,
          ) ||
          Game.testCollision(
            pipe.bottomPipe.getBounds(),
            this.flappy.collisionBox,
          ) ||
          Game.testCollision(this.flappy.collisionBox, this.floor.getBounds())
        ) {
          this.gameState = "over";
          this.sounds.play("hit");
          this.bgSound.stop();
        }
      });

      this.background.forEach((drop, index) => {
        drop.tilePosition.x -= (2 / Math.pow(2, index)) * deltaTime;
      });
    }
  }
}
