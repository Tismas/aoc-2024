import { AnimatedLabel } from "../../helpers/animations/AnimatedLabel";
import { AnimatedLine } from "../../helpers/animations/AnimatedLine";
import { runAnimation } from "../../helpers/animations/runAnimations";
import { sum, zip } from "../../helpers/array";
import { Vector2 } from "../../helpers/Vector2";

import input from "./input.txt?raw";

const marginY = 200;
const spacingY = 100;
const spacingX = 200;
const fontSize = 24;

export const part1 = async (ctx: CanvasRenderingContext2D) => {
  const rows = input.split("\n").map((line) => line.split("   ").map(Number));
  const [left, right] = zip(...rows);
  const leftSorted = [...left].sort((e1, e2) => e1 - e2);
  const rightSorted = [...right].sort((e1, e2) => e1 - e2);

  await Promise.all([
    animateLabels(ctx, left, -spacingX / 2),
    animateLabels(ctx, right, spacingX / 2),
  ]);

  const distances = await animateDistances(ctx, leftSorted, rightSorted);
  const result = await animateResults(ctx, distances);
  console.log("Part 1", result);
};

const animateLabels = (
  ctx: CanvasRenderingContext2D,
  column: Array<number>,
  offsetX: number
): Promise<void> => {
  const columnWithIds = column.map((value, index) => ({ value, id: index }));
  const sortedWithIds = [...columnWithIds].sort(
    (e1, e2) => e1.value - e2.value
  );

  const animations = columnWithIds.map((element, index) => {
    const targetIndex = sortedWithIds.findIndex(
      (sortedElement) => sortedElement.id === element.id
    );
    const x = ctx.canvas.width / 2 + offsetX;
    const position = new Vector2(x, marginY + index * spacingY);
    const targetPosition = new Vector2(x, marginY + targetIndex * spacingY);

    return new AnimatedLabel({
      ctx,
      position,
      opacity: 0,
      label: element.value.toString(),
      fontSize,
      keepDrawingAfterAnimation: true,
    })
      .animateOpacity(1, 500)
      .animatePosition(targetPosition, 1000, 1000);
  });

  return runAnimation(ctx, animations);
};

const animateDistances = async (
  ctx: CanvasRenderingContext2D,
  left: Array<number>,
  right: Array<number>
): Promise<Array<number>> => {
  const animations = [];
  const distances = [];
  const margin = 20;
  const rows = left.length;

  for (let i = 0; i < rows; i++) {
    const y = marginY + spacingY * i;
    const distance = Math.abs(left[i] - right[i]);
    distances.push(distance);

    // left line
    animations.push(
      new AnimatedLine({
        ctx,
        startPosition: new Vector2(
          ctx.canvas.width / 2 - spacingX / 2 + margin,
          y
        ),
        targetPosition: new Vector2(ctx.canvas.width / 2 - margin, y),
        keepDrawingAfterAnimation: true,
      }).animateDrawing(500, i * 100)
    );
    // right line
    animations.push(
      new AnimatedLine({
        ctx,
        startPosition: new Vector2(
          ctx.canvas.width / 2 + spacingX / 2 - margin,
          y
        ),
        targetPosition: new Vector2(ctx.canvas.width / 2 + margin, y),
        keepDrawingAfterAnimation: true,
      }).animateDrawing(500, i * 100)
    );

    // labels
    const position = new Vector2(ctx.canvas.width / 2, marginY + i * spacingY);
    animations.push(
      new AnimatedLabel({
        ctx,
        position,
        label: distance.toString(),
        opacity: 0,
        keepDrawingAfterAnimation: true,
      }).animateOpacity(1, 500, i * 100)
    );
  }

  await runAnimation(ctx, animations);

  return distances;
};

const animateResults = async (
  ctx: CanvasRenderingContext2D,
  distances: number[]
): Promise<number> => {
  const total = sum(distances);

  const equalsAnimation = new AnimatedLabel({
    ctx,
    position: new Vector2(ctx.canvas.width / 2, marginY - 30),
    rotation: Math.PI / 2,
    opacity: 0,
    label: "=",
    keepDrawingAfterAnimation: true,
  }).animateOpacity(1, 500);
  const resultAnimation = new AnimatedLabel({
    ctx,
    position: new Vector2(ctx.canvas.width / 2, marginY - 60),
    opacity: 0,
    label: total.toString(),
    keepDrawingAfterAnimation: true,
  }).animateOpacity(1, 500);

  await runAnimation(ctx, [equalsAnimation, resultAnimation]);

  return total;
};
