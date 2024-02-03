import Scene from "@/lib/scenes/scene";
import SceneManager from "@/lib/scenes/sceneManager";
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

export default class GameScene extends Scene {
  private background: TilingSprite[] = [];
  private floor: TilingSprite;
  private dino: Dino;

  constructor() {
    super();

    this.dino = new Dino();

    this.floor = new TilingSprite(
      Texture.WHITE,
      SceneManager.width,
      GROUND_HEIGHT,
    );
  }

  public async init() {
    const sheet: Spritesheet = await Assets.load("/spritesheet.json");

    this.createBackground(sheet);
    this.createFloor(sheet);

    this.dino.init(this, sheet);

    keyboard.init();

    keyboard.registerKey(
      "Space",
      () => this.dino.startJump(),
      () => this.dino.endJump(),
    );
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
    bg_zero.width = SceneManager.width;
    bg_zero.height = SceneManager.height;

    this.background.push(bg_one);

    backdrop.addChild(bg_zero, moon, bg_one);
    this.addChild(backdrop);
  }

  private createFloor(sheet: Spritesheet) {
    this.floor.texture = sheet.textures["ground.png"];
    this.floor.y = SceneManager.height - GROUND_HEIGHT;

    this.addChild(this.floor);
  }

  public start() {}

  public stop() {}

  public update(_delta: number) {
    this.floor.tilePosition.x -= 6 * _delta;

    this.background.forEach((bg, index) => {
      bg.tilePosition.x -= (0.25 / Math.pow(2, index)) * _delta;
    });

    if (this.floor) {
      this.dino.updateMovement(_delta, this.floor);
    }
  }
}
