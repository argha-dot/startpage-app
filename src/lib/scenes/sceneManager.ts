import { Application, IApplicationOptions, settings } from "pixi.js";
import { sceneInterface } from "./sceneInterface";

export default class SceneManager {
  private static app: Application;
  private static scenes: { [name: string]: sceneInterface };
  private static current: string | null;

  // private constructor
  private constructor() {}

  public static get width(): number {
    return this.app.view.width;
  }

  public static get height(): number {
    return this.app.view.width;
  }

  public static get view() {
    return this.app.view as HTMLCanvasElement;
  }

  /**
   * Initializes the PIXI app and adds the ticker and all
   * @param config the configuration for the app
   * @returns void
   */
  public static init(config: Partial<IApplicationOptions>): void {
    this.app = new Application({
      // view: document.getElementById(canvasId) as HTMLCanvasElement,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
      ...config,
    });
    // @ts-ignore
    globalThis.__PIXI_APP__ = this.app;

    this.scenes = {};
    this.current = null;

    this.app.ticker.maxFPS = 60;

    settings.ROUND_PIXELS = true;

    this.app.ticker.add(SceneManager.update);
  }

  /**
   * Updates the current scene automatically
   * @returns void
   */
  private static update(delta: number): void {
    let active: sceneInterface | null = SceneManager.active;
    if (active) {
      active.isInitialized && active.update(delta);
    }
  }

  /**
   * Adds a scene to the scene manager.
   * @param name Name of the scene to be added
   * @param scene The scene object to be added
   * @returns nothing
   */
  public static add(name: string, scene: sceneInterface): void {
    if (!name || this.sceneExists(name)) {
      console.error("Scene with same name already exists!!");
      return;
    }

    this.scenes[name] = scene;
    // scene.app = this.app;
    // scene.scenes = this;
  }

  /**
   * Remove a scene from the manager
   * @param name the name of the scene to be removed
   * @returns {boolean} whether the operation was successful
   */
  public static remove(name: string): boolean {
    if (!name || !this.sceneExists(name)) {
      console.error("Scene doesn't exist!");
      return false;
    }

    if (this.current === name) this.stop();

    const scene = this.scenes[name];

    if (scene.isInitialized) {
      scene.destroy();
      scene.isInitialized = false;
    }

    delete this.scenes[name];
    return true;
  }

  /**
   *
   * @param {string} name name of the new scene to be started;
   */
  public static start(name: string): void {
    if (!name || !this.sceneExists(name) || this.current === name) return;

    this.stop();

    this.current = name;
    const newScene = this.scenes[this.current];

    if (newScene) {
      if (!newScene.isInitialized) {
        newScene.init();
        newScene.isInitialized = true;
      }
      this.app.stage.addChild(newScene);
      newScene.start();
    }
  }

  /**
   * Stops the active scene from running and un sets it from the manager.
   */
  public static stop(): void {
    let active: sceneInterface | null = this.active;
    if (active) {
      this.current = null;
      active.stop();
      this.app.stage.removeChild(active);
    }
  }

  public static sceneExists(name: string): boolean {
    return name in this.scenes;
  }

  public static get active(): sceneInterface | null {
    return this.current ? this.scenes[this.current] : null;
  }
}
