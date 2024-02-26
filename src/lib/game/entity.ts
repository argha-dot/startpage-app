import { Bodies, World, Body } from "matter-js";

export default class PhysicsEntity {
  public body: Body;

  constructor(x: number, y: number, w: number, h: number, world: World) {
    this.body = Bodies.rectangle(x, y, w, h);

    World.add(world, this.body);
  }
}
