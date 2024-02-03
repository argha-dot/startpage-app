import { DisplayObject } from "pixi.js";

export function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}

export enum Direction {
  Right = "Right",
  Bottom = "Bottom",
  Left = "Left",
  Top = "Top",
  None = "None",
}

export const collisionAABB = (
  obj_one: DisplayObject,
  obj_two: DisplayObject,
): boolean => {
  const bounds1 = obj_one.getBounds();
  const bounds2 = obj_two.getBounds();

  return (
    bounds1.x < bounds2.x + bounds2.width &&
    bounds1.x + bounds1.width > bounds2.x &&
    bounds1.y < bounds2.y + bounds2.height &&
    bounds1.y + bounds1.height > bounds2.y
  );
};

export const collisionAABBSide = (
  obj_one: DisplayObject,
  obj_two: DisplayObject,
): Direction => {
  const bounds1 = obj_one.getBounds();
  const bounds2 = obj_two.getBounds();

  const one_bottom = bounds1.y + bounds1.height;
  const two_bottom = bounds2.y + bounds2.height;

  const one_right = bounds1.x + bounds1.width;
  const two_right = bounds2.x + bounds2.width;

  const b_collision = two_bottom - bounds1.y;
  const r_collision = two_right - bounds1.x;
  const t_collision = one_bottom - bounds2.y;
  const l_collision = one_right - bounds2.x;

  if (
    t_collision < b_collision &&
    t_collision < l_collision &&
    t_collision < r_collision
  ) {
    return Direction.Top;
  }
  if (
    b_collision < t_collision &&
    b_collision < l_collision &&
    b_collision < r_collision
  ) {
    return Direction.Bottom;
  }
  if (
    l_collision < r_collision &&
    l_collision < t_collision &&
    l_collision < b_collision
  ) {
    return Direction.Left;
  }
  if (
    r_collision < l_collision &&
    r_collision < t_collision &&
    r_collision < b_collision
  ) {
    return Direction.Right;
  }

  return Direction.None;
};
