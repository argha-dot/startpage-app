import { Application, BitmapFont, Container, Rectangle } from "pixi.js";

export interface SceneI extends Container {
  update(framesPassed?: number): void;
}

class Game {
  private constructor() {}

  public static app: Application;
  private static currentScene: SceneI;

  public static init(width: number, height: number, background: number): void {
    Game.app = new Application({
      // resolution: window.devicePixelRatio || 1,
      backgroundColor: background,
      width,
      height,
      antialias: false,
    });
    // @ts-ignore
    globalThis.__PIXI_APP__ = Game.app;

    // Game.app.ticker.maxFPS = 60;

    BitmapFont.from("eight-bit", {
      fontFamily: "Pixelized, sans-serif",
      fontSize: 30,
      fontWeight: "normal",
    });
    Game.app.ticker.add(Game.update);
  }

  public static get view() {
    return Game.app.view as HTMLCanvasElement;
  }

  public static get width(): number {
    return Game.app.view.width;
  }

  public static get height(): number {
    return Game.app.view.height;
  }

  public static changeScene(newScene: SceneI): void {
    if (Game.currentScene) {
      Game.app.stage.removeChild(Game.currentScene);
      Game.currentScene.destroy();
    }

    Game.currentScene = newScene;
    Game.app.stage.addChild(Game.currentScene);
  }

  private static update(framesPassed?: number): void {
    if (Game.currentScene) {
      Game.currentScene.update(framesPassed);
    }
  }

  public static testCollision(bounds1: Rectangle, bounds2: Rectangle): boolean {
    return (
      bounds1.x < bounds2.x + bounds2.width &&
      bounds1.x + bounds1.width > bounds2.x &&
      bounds1.y < bounds2.y + bounds2.height &&
      bounds1.y + bounds1.height > bounds2.y
    );
  }
}

export default Game;
