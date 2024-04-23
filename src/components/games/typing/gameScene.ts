import Scene from "@/lib/game/scene";
import { World } from "@lastolivegames/becsy";

export class GameScene extends Scene {
  private worldPromise = World.create();

  constructor() {
    super();
  }

  public async init() {
    // const world = await this.worldPromise;
  }

  public async update(_delta: number) {
    const world = await this.worldPromise;
    await world.execute();
  }
}
