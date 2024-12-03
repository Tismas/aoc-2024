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
}
