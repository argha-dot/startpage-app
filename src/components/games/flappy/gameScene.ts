import {
  Assets,
  BitmapFont,
  BitmapText,
  Container,
  Spritesheet,
  Texture,
  TilingSprite,
} from "pixi.js";
import { Howl } from "howler";

import { keyboard } from "@/lib/game/keyboard";

import PipesHandler from "./pipe";
import Flappy from "./bird";
import {
  FLAPPY_JUMP,
  GAME_HEIGHT,
  GAME_WIDTH,
  GROUND_HEIGHT,
  GROUND_SPEED,
} from "./consts";
import Scene from "@/lib/game/scene";
import { detectCollisionAABB } from "@/lib/utils";

export class GameScene extends Scene {
  private floor: TilingSprite;
  private background: TilingSprite[] = [];

  private flappy: Flappy;
  private pipes = new PipesHandler();

  private score = 0;
  private betweenPipe = false;
  private gameState: "idle" | "playing" | "over" = "idle";
  private scoreText: BitmapText;

  private sounds = new Howl({
    src: ["/flap/flappy.wav"],
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
      fontSize: 60,
      fontWeight: "normal",
    });
    this.scoreText = new BitmapText(`${this.score}`, {
      fontName: "eight-bit",
      fontSize: 60,
      tint: 0xff0000,
    });

    this.floor = new TilingSprite(
      Texture.WHITE,
      480,
      GAME_HEIGHT - GROUND_HEIGHT,
    );
  }

  public async init() {
    await Assets.load("/flap/eight-bit.ttf");
    await Assets.load("/flap/pipe.png");
    const sheet: Spritesheet = await Assets.load("/flap/spritesheet.json");

    keyboard.init();
    this.createFont();

    this.createBackdrop(sheet);
    this.createFloor(sheet);
    this.flappy.init(this, sheet);

    this.setupScore();

    this.keyInputs();
  }

  private createFont() {
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

    this.scoreText.roundPixels = true;
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

    this.flappy.velocity = 0;
  }

  private createFloor(sheet: Spritesheet) {
    this.floor.texture = sheet.textures["floor.png"];
    this.floor.y = GROUND_HEIGHT;

    this.addChild(this.floor);
  }

  private createBackdrop(sheet: Spritesheet) {
    const backdrop = new Container();
    const grass = new TilingSprite(sheet.textures["grass.png"], 480, 70);
    const clouds = new TilingSprite(sheet.textures["clouds.png"], 480, 200);
    const buildings = new TilingSprite(
      sheet.textures["buildings.png"],
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

  public start() {}

  public stop(): void {}

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
        if (detectCollisionAABB(pipe.getBounds(), this.flappy.collisionBox)) {
          this.betweenPipe = true;
        } else {
          if (this.betweenPipe) {
            this.score += 1;
            this.scoreText.text = `${this.score}`;
          }
          this.betweenPipe = false;
        }
        if (
          detectCollisionAABB(
            pipe.topPipe.getBounds(),
            this.flappy.collisionBox,
          ) ||
          detectCollisionAABB(
            pipe.bottomPipe.getBounds(),
            this.flappy.collisionBox,
          ) ||
          detectCollisionAABB(this.flappy.collisionBox, this.floor.getBounds())
        ) {
          this.gameState = "over";
          this.sounds.play("hit");
        }
      });

      this.background.forEach((drop, index) => {
        drop.tilePosition.x -= (2 / Math.pow(2, index)) * deltaTime;
      });
    }
  }
}
