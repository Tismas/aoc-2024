import { lerp, lerpVector } from "../lerp";
import { Vector2 } from "../Vector2";

type AnimatedValueType = number | Vector2;

interface AnimatedValue<T extends AnimatedValueType> {
  getCurrentValue: () => T;
  targetValue: T;
  duration: number;
  delay?: number;
  onFinish?: (targetValue: T) => void;
}

export class FieldAnimation<const T extends AnimatedValueType> {
  private startValue: T | null;
  private getCurrentValue: () => T;
  private targetValue: T;
  private startTime: number;
  private duration: number;
  private onFinish?: (targetValue: T) => void;
  isFinished: boolean;

  constructor({
    getCurrentValue,
    targetValue,
    duration,
    delay = 0,
    onFinish,
  }: AnimatedValue<T>) {
    this.startValue = null;
    this.getCurrentValue = getCurrentValue;
    this.targetValue = targetValue;
    this.duration = duration;
    this.startTime = Date.now() + delay;
    this.isFinished = false;
    this.onFinish = onFinish;
  }

  get runningTime() {
    return Date.now() - this.startTime;
  }

  hasStarted() {
    return this.runningTime >= 0;
  }

  private isVectorAnimation(): this is FieldAnimation<Vector2> {
    return this.targetValue instanceof Vector2;
  }
  private isNumberAnimation(): this is FieldAnimation<number> {
    return typeof this.targetValue === "number";
  }

  tick(): T {
    const animationProgress = this.runningTime / this.duration;
    if (!this.hasStarted()) return this.getCurrentValue();
    if (this.runningTime >= this.duration) {
      this.isFinished = true;
      this.onFinish?.(this.targetValue);
      return this.targetValue;
    }
    if (this.startValue === null) {
      this.startValue = this.getCurrentValue();
      return this.startValue;
    }

    if (this.isVectorAnimation()) {
      return lerpVector(
        this.startValue,
        this.targetValue,
        animationProgress
      ) as T & Vector2;
    }
    if (this.isNumberAnimation()) {
      return lerp(this.startValue, this.targetValue, animationProgress) as T &
        number;
    }
    throw new Error("Invalid animation");
  }
}
