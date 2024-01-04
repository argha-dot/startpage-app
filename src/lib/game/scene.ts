import { Container } from "pixi.js";

export interface SceneI extends Container {
  update(delta?: number): void;
}
