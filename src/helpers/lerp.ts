import { Vector2 } from "./Vector2";

export const lerp = (start: number, end: number, t: number) => {
  return start + (end - start) * t;
};

export const lerpVector = (
  vec1: Vector2,
  vec2: Vector2,
  t: number
): Vector2 => {
  return new Vector2(lerp(vec1.x, vec2.x, t), lerp(vec1.y, vec2.y, t));
};
