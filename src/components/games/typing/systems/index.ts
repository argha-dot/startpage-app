import { System, system } from "@lastolivegames/becsy";
import { Position, Velocity } from "../entities";

@system
class VelocityInputController extends System {
  private readonly movables = this.query((q) => q.current.with(Velocity).write);
  private readonly keyPressed = new Set<string>();

  initialize(): void {
    document.addEventListener("keydown", (e) => {
      this.keyPressed.add(e.key);
    });

    document.addEventListener("keyup", (e) => {
      this.keyPressed.delete(e.key);
    });
  }

  execute(): void {
    for (const movable of this.movables.current) {
      const vel = movable.write(Velocity);

      if (this.keyPressed.has("ArrowUp") || this.keyPressed.has("KeyW")) {
        vel.vy = -100;
      } else if (
        this.keyPressed.has("ArrowDown") ||
        this.keyPressed.has("KeyS")
      ) {
        vel.vy = 100;
      } else {
        vel.vy = 0;
      }

      if (this.keyPressed.has("ArrowRight") || this.keyPressed.has("KeyD")) {
        vel.vx = 100;
      } else if (
        this.keyPressed.has("ArrowLeft") ||
        this.keyPressed.has("KeyA")
      ) {
        vel.vy = -100;
      } else {
        vel.vy = 0;
      }
    }
  }
}

@system
class Movement extends System {
  private readonly movables = this.query(
    (q) => q.current.with(Velocity).and.with(Position).write,
  );

  execute(): void {
    for (const movable of this.movables.current) {
      const vel = movable.read(Velocity);
      const pos = movable.write(Position);

      pos.x += vel.vx;
      pos.y += vel.vy;
    }
  }
}

@system
export class Renderer extends System {}

export { VelocityInputController, Movement };
