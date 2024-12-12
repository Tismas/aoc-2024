import { isBetween } from "./primitives";

export class Vector2 {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(vec: Vector2): Vector2 {
    return new Vector2(this.x + vec.x, this.y + vec.y);
  }

  subtract(vec: Vector2): Vector2 {
    return new Vector2(this.x - vec.x, this.y - vec.y);
  }

  distanceTo(vec: Vector2): number {
    return vec.subtract(this).getLength();
  }

  getLength(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  equals(vec: Vector2): boolean {
    return this.x == vec.x && this.y === vec.y;
  }

  multiply(constant: number): Vector2 {
    return new Vector2(this.x * constant, this.y * constant);
  }

  isInBound(xLower: number, xUpper: number, yLower: number, yUpper: number): boolean {
    return isBetween(this.x, xLower, xUpper) && isBetween(this.y, yLower, yUpper);
  }

  getAdjacent() {
    return [
      new Vector2(this.x + 1, this.y),
      new Vector2(this.x - 1, this.y),
      new Vector2(this.x, this.y + 1),
      new Vector2(this.x, this.y - 1),
    ];
  }

  toString() {
    return `${this.x},${this.y}`;
  }
}
