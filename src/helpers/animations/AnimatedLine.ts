import { lerpVector } from "../lerp";
import { Vector2 } from "../Vector2";
import { Animatable, Drawable } from "./Traits";

interface Args {
  ctx: CanvasRenderingContext2D;
  color?: string;

  startPosition: Vector2;
  targetPosition: Vector2;
  duration?: number;
  delay?: number;
}

export class AnimatedLine implements Animatable, Drawable {
  private ctx: CanvasRenderingContext2D;
  private color: string;
  private position: Vector2;

  private startPosition: Vector2;
  private targetPosition: Vector2;
  private duration: number;
  private animationStart: number;

  constructor({
    startPosition,
    targetPosition,
    ctx,
    color = getComputedStyle(ctx.canvas).getPropertyValue("--fg"),
    duration = 1000,
    delay = 0,
  }: Args) {
    this.ctx = ctx;
    this.color = color;
    this.position = startPosition;

    this.startPosition = startPosition;
    this.targetPosition = targetPosition;
    this.duration = duration;

    this.animationStart = Date.now() + delay;
  }

  private update(): boolean {
    const currentAnimationTime = Date.now() - this.animationStart;
    const movePercentage = currentAnimationTime / this.duration;
    if (currentAnimationTime < 0) return false;

    if (currentAnimationTime >= this.duration) {
      this.position = this.targetPosition;
      return true;
    } else {
      this.position = lerpVector(
        this.startPosition,
        this.targetPosition,
        movePercentage
      );
      return false;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(this.startPosition.x, this.startPosition.y);
    ctx.lineTo(this.position.x, this.position.y);
    ctx.stroke();
  }

  tick(): boolean {
    const done = this.update();
    this.draw(this.ctx);
    return done;
  }
}
