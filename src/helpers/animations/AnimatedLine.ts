import { Vector2 } from "../Vector2";
import { FieldAnimation } from "./AnimatedField";
import { Animatable, Drawable } from "./Traits";

interface Args {
  ctx: CanvasRenderingContext2D;
  color?: string;
  startPosition: Vector2;
  targetPosition: Vector2;
}

export class AnimatedLine implements Animatable, Drawable {
  private ctx: CanvasRenderingContext2D;
  private color: string;

  private drawingAnimations: FieldAnimation<Vector2>[];
  private startPosition: Vector2;
  private targetPosition: Vector2;
  private endPosition: Vector2;

  constructor({
    ctx,
    startPosition,
    targetPosition,
    color = getComputedStyle(ctx.canvas).getPropertyValue("--fg"),
  }: Args) {
    this.ctx = ctx;
    this.color = color;

    this.startPosition = startPosition;
    this.targetPosition = targetPosition;
    this.endPosition = targetPosition;
    this.drawingAnimations = [];
  }

  animateDrawing(duration: number, delay = 0) {
    this.endPosition = this.startPosition;
    this.drawingAnimations.push(
      new FieldAnimation({
        getCurrentValue: () => this.startPosition,
        targetValue: this.targetPosition,
        duration,
        delay,
      })
    );
    return this;
  }

  private update() {
    for (const animation of this.drawingAnimations) {
      if (!animation.hasStarted() || animation.isFinished) continue;
      this.endPosition = animation.tick();
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(this.startPosition.x, this.startPosition.y);
    ctx.lineTo(this.endPosition.x, this.endPosition.y);
    ctx.stroke();
  }

  tick(): boolean {
    this.update();
    this.draw(this.ctx);
    return this.drawingAnimations.every((anim) => anim.isFinished) ?? true;
  }
}
