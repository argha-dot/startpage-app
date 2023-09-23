import Game, { SceneI } from "@/lib/game";
import Keyboard from "@/lib/game/keyboard";
import { Container, Graphics } from "pixi.js";
import { GameScene } from "./gameScene";

export class StartScene extends Container implements SceneI {
  private test: Graphics;
  constructor() {
    super();
    this.test = new Graphics();
    this.test.beginFill(0xff0000, 1);
    this.test.drawRect(0, 0, 200, 40);
    this.test.endFill();

    this.addChild(this.test);
  }

  update() {
    if (Keyboard.state.get("Enter")) {
      Game.changeScene(new GameScene());
    }
  }
}
