import { Vector2 } from "../Vector2";
import { FieldAnimation } from "./AnimatedField";
import { Animatable, Drawable } from "./Traits";

interface Args {
  ctx: CanvasRenderingContext2D;
  label: string;
  position: Vector2;
  font?: string;
  color?: string;
  opacity?: number;
  rotation?: number;
  textAlign?: CanvasTextAlign;
}

export class AnimatedLabel implements Animatable, Drawable {
  private ctx: CanvasRenderingContext2D;
  private label: string;
  private font: string;
  private color: string;
  private textAlign: CanvasTextAlign;

  private positionAnimations: FieldAnimation<Vector2>[];
  private position: Vector2;

  private opacityAnimations: FieldAnimation<number>[];
  private opacity: number;

  private rotationAnimations: FieldAnimation<number>[];
  private rotation: number;

  constructor({
    ctx,
    label,
    position,
    font = "24px Inter",
    color = getComputedStyle(ctx.canvas).getPropertyValue("--fg"),
    rotation = 0,
    opacity = 1,
    textAlign = "center",
  }: Args) {
    this.ctx = ctx;
    this.label = label;
    this.font = font;
    this.color = color;
    this.textAlign = textAlign;

    this.positionAnimations = [];
    this.position = position;

    this.opacityAnimations = [];
    this.opacity = opacity;

    this.rotationAnimations = [];
    this.rotation = rotation;
  }

  animatePosition(targetPosition: Vector2, duration: number, delay = 0) {
    this.positionAnimations.push(
      new FieldAnimation({
        getCurrentValue: () => this.position,
        targetValue: targetPosition,
        duration: duration,
        delay,
      })
    );
    return this;
  }

  animateOpacity(targetOpacity: number, duration: number, delay = 0) {
    this.opacityAnimations.push(
      new FieldAnimation({
        getCurrentValue: () => this.opacity,
        targetValue: targetOpacity,
        duration,
        delay,
      })
    );
    return this;
  }

  animateRotation(targetRotation: number, duration: number, delay = 0) {
    this.rotationAnimations.push(
      new FieldAnimation({
        getCurrentValue: () => this.rotation,
        targetValue: targetRotation,
        duration,
        delay,
      })
    );
    return this;
  }

  private update() {
    for (const animation of this.positionAnimations) {
      if (!animation.hasStarted() || animation.isFinished) continue;
      this.position = animation.tick();
    }
    for (const animation of this.opacityAnimations) {
      if (!animation.hasStarted() || animation.isFinished) continue;
      this.opacity = animation.tick();
    }
    for (const animation of this.rotationAnimations) {
      if (!animation.hasStarted() || animation.isFinished) continue;
      this.rotation = animation.tick();
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();

    ctx.textAlign = this.textAlign;
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
    this.update();
    this.draw(this.ctx);

    return (
      (this.opacityAnimations.every((anim) => anim.isFinished) ?? true) &&
      (this.positionAnimations.every((anim) => anim.isFinished) ?? true) &&
      (this.rotationAnimations.every((anim) => anim.isFinished) ?? true)
    );
  }
}
