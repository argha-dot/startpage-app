import { component, field } from "@lastolivegames/becsy";

@component
class Position {
  @field.float64 declare x: number;
  @field.float64 declare y: number;
}

@component
class Velocity {
  @field.float64 declare vx: number;
  @field.float64 declare vy: number;
}

export { Position, Velocity };
