import Scene from "@/lib/game/scene";
import Game from "@/lib/game";
// import { stringify, parse } from "flatted";
import {
  Assets,
  Container,
  SCALE_MODES,
  Sprite,
  Spritesheet,
  Texture,
  TilingSprite,
} from "pixi.js";
import { BG_PRIMARY, GAME_HEIGHT, GAME_WIDTH, GROUND_HEIGHT } from "../consts";
import Dino from "../dino";
import { keyboard } from "@/lib/game/keyboard";
import { Engine, Events } from "matter-js";
import Floor from "../floor";
import Cactus from "../cactus";

type Enemy = Cactus;

export default class GameScene extends Scene {
  private background: TilingSprite[] = [];
  private floor: Floor;
  private dino: Dino;

  private engine: Engine;

  private enemies: Enemy[] = [];

  constructor() {
    super();

    this.engine = Engine.create();
    this.engine.gravity.y = 0;
    this.dino = new Dino(70, 70, this.engine.world);
    this.floor = new Floor(this.engine.world);
  }

  public async init() {
    const sheet: Spritesheet = await Assets.load("/spritesheet.json");
    keyboard.init();

    this.createBackground(sheet);
    this.createFloor(sheet);

    this.dino.init(this, sheet);

    Events.on(this.engine, "collisionStart", (e) => {
      e.pairs.forEach((pair) => {
        if (pair.bodyA.label === "dino" || pair.bodyB.label === "dino") {
          this.dino.onCollison(pair);
        }
      });
    });

    this.createEnemies();
  }

  private createEnemies() {
    const cactus = new Cactus(400, this.engine.world);
    this.enemies.push(cactus);

    this.enemies.forEach((enemy) => {
      enemy.init(this);
    });
    cactus.init(this);
  }

  private createBackground(_sheet: Spritesheet) {
    const backdrop = new Container();

    const moon = new Sprite(Texture.from("/moon.png"));
    moon.texture.baseTexture.scaleMode = SCALE_MODES.NEAREST;
    moon.position.set(GAME_WIDTH - 60 - 16 * 4, 50);
    moon.scale.set(4.0);

    const bg_one = new TilingSprite(Texture.from("/bg-1.png"), 120, 46);
    bg_one.texture.baseTexture.scaleMode = SCALE_MODES.NEAREST;
    bg_one.scale.set(5, 5);
    bg_one.position.set(0, GAME_HEIGHT - GROUND_HEIGHT - 46 * 5);

    const bg_zero = new Sprite(Texture.WHITE);
    bg_zero.tint = BG_PRIMARY;
    bg_zero.width = Game.width;
    bg_zero.height = Game.height;

    this.background.push(bg_one);

    backdrop.addChild(bg_zero, moon, bg_one);
    this.addChild(backdrop);
  }

  private createFloor(sheet: Spritesheet) {
    this.floor.texture = sheet.textures["ground.png"];
    this.floor.y = Game.height - GROUND_HEIGHT;

    this.addChild(this.floor);
  }

  public start() { }

  public stop() { }

  public update(_delta: number) {
    Engine.update(this.engine);

    this.floor.update(_delta);

    this.background.forEach((bg, index) => {
      bg.tilePosition.x -= (0.25 / Math.pow(2, index)) * _delta;
    });

    if (this.floor) {
      this.dino.updateMovement(_delta);
    }

    this.enemies.forEach((enemy) => {
      enemy.update(_delta);
    });
  }
}
