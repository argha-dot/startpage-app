import Game from "@/lib/game";
import { Texture, TilingSprite } from "pixi.js";
import { GROUND_HEIGHT } from "./consts";
import { Bodies, Body, World } from "matter-js";

export default class Floor extends TilingSprite {
  public body: Body;

  constructor(world: World) {
    super(Texture.WHITE);
    this.width = Game.width * 2;
    this.height = GROUND_HEIGHT;

    this.body = Bodies.rectangle(
      this.width / 2,
      Game.height - GROUND_HEIGHT / 2,
      this.width,
      this.height,
    );
    Body.setStatic(this.body, true);
    this.body.label = "floor";
    this.anchor.set(0.5);

    World.add(world, this.body);
  }

  update(_delta: number) {
    const pos = this.body.position;

    this.x = pos.x;
    this.y = pos.y;
  }
}
