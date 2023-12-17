import { Application, BitmapFont, Container } from "pixi.js";

export interface SceneI extends Container {
  update(framesPassed?: number): void;
}

class Game {
  private constructor() {}

  private static app: Application;
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

    Game.app.ticker.add(Game.update);
    Game.app.ticker.maxFPS = 60;
    BitmapFont.from("comic 20", {
      fontFamily: "Tahoma, Geneva, sans-serif",
      fontSize: 60,
      fontWeight: "bolder",
    });
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
}

export default Game;
