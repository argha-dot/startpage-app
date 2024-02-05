import { Container } from "pixi.js";

export interface sceneInterface extends Container {
  isInitialized: boolean;
  init(): void;
  destroy(): void;
  start(): void;
  stop(): void;
  update(delta: number): void;
}

export default class Scene extends Container implements sceneInterface {
  public isInitialized: boolean;

  constructor() {
    super();
    this.isInitialized = false;
  }

  public init(): void {}

  public destroy(): void {}

  public start(): void {}

  public stop(): void {}

  public update(_delta: number): void {}
}
