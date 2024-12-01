import { lerp, lerpVector } from "../lerp";
import { Vector2 } from "../Vector2";
import { Animatable, Drawable } from "./Traits";

interface Args {
  ctx: CanvasRenderingContext2D;
  label: string;
  font?: string;
  color?: string;

  startPosition: Vector2;
  targetPosition?: Vector2;

  startRotation?: number;
  targetRotation?: number;

  startOpacity?: number;
  targetOpacity?: number;

  duration?: number;
  delay?: number;
}

export class AnimatedLabel implements Animatable, Drawable {
  private ctx: CanvasRenderingContext2D;
  private label: string;
  private font: string;
  private color: string;

  private position: Vector2;
  private startPosition: Vector2;
  private targetPosition: Vector2;

  private rotation: number;
  private startRotation: number;
  private targetRotation: number;

  private opacity: number;
  private startOpacity: number;
  private targetOpacity: number;

  private duration: number;
  private animationStart: number;

  constructor({
    startPosition,
    targetPosition = startPosition,
    startRotation = 0,
    targetRotation = startRotation,
    startOpacity = 1,
    targetOpacity = startOpacity,
    ctx,
    label,
    font = "24px Inter",
    color = getComputedStyle(ctx.canvas).getPropertyValue("--fg"),
    duration = 1000,
    delay = 0,
  }: Args) {
    this.ctx = ctx;
    this.label = label;
    this.font = font;
    this.color = color;

    this.position = startPosition;
    this.startPosition = startPosition;
    this.targetPosition = targetPosition;

    this.rotation = startRotation;
    this.startRotation = startRotation;
    this.targetRotation = targetRotation;

    this.opacity = startOpacity;
    this.startOpacity = startOpacity;
    this.targetOpacity = targetOpacity;

    this.duration = duration;
    this.animationStart = Date.now() + delay;
  }

  private update(): boolean {
    const currentAnimationTime = Date.now() - this.animationStart;
    const animationProgress = currentAnimationTime / this.duration;
    if (currentAnimationTime < 0) return false;

    if (currentAnimationTime >= this.duration) {
      this.position = this.targetPosition;
      return true;
    } else {
      this.position = lerpVector(
        this.startPosition,
        this.targetPosition,
        animationProgress
      );
      this.opacity = lerp(
        this.startOpacity,
        this.targetOpacity,
        animationProgress
      );
      this.rotation = lerp(
        this.startRotation,
        this.targetRotation,
        animationProgress
      );
      return false;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    ctx.font = this.font;

    ctx.translate(this.position.x, this.position.y);
    ctx.rotate(this.rotation);
    ctx.fillText(this.label, 0, 0);

    ctx.restore();
  }

  tick(): boolean {
    const done = this.update();
    this.draw(this.ctx);
    return done;
  }
}
