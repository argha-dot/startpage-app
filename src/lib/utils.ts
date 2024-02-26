import { DisplayObject, Rectangle } from "pixi.js";

export const getJumpVelo = (jumpHeight: number, jumpTimePeak: number) => {
  return -1 * ((2 * jumpHeight) / jumpTimePeak);
};

export const getJumpGravity = (jumpHeight: number, jumpTimePeak: number) => {
  return -1 * ((-2 * jumpHeight) / (jumpTimePeak * jumpTimePeak));
};

export const getFallGravity = (jumpHeight: number, jumpTimeFall: number) => {
  return -1 * ((-2 * jumpHeight) / (jumpTimeFall * jumpTimeFall));
};

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

export const detectCollisionAABB = (
  obj_one: Rectangle,
  obj_two: Rectangle,
): boolean => {
  return (
    obj_one.x < obj_two.x + obj_two.width &&
    obj_one.x + obj_one.width > obj_two.x &&
    obj_one.y < obj_two.y + obj_two.height &&
    obj_one.y + obj_one.height > obj_two.y
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
