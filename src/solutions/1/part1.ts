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
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  const rows = input.split("\n").map((line) => line.split("   ").map(Number));
  const [left, right] = zip(...rows);
  const leftSorted = [...left].sort((e1, e2) => e1 - e2);
  const rightSorted = [...right].sort((e1, e2) => e1 - e2);

  const leftLabelAnimation = getAnimatedLabels(ctx, left, -spacingX / 2);
  const rightLabelAnimations = getAnimatedLabels(ctx, right, spacingX / 2);

  const labelAnimations = [...leftLabelAnimation, ...rightLabelAnimations];
  await runAnimation(ctx, labelAnimations);

  const [distanceAnimation, distances] = getAnimatedDistances(
    ctx,
    leftSorted,
    rightSorted
  );
  await runAnimation(ctx, distanceAnimation, labelAnimations);

  const resultLabels = getAnimatedResult(ctx, distances);
  await runAnimation(ctx, resultLabels, [
    ...distanceAnimation,
    ...labelAnimations,
  ]);
};

// export const part2 = (ctx: CanvasRenderingContext2D) => {};

const getAnimatedLabels = (
  ctx: CanvasRenderingContext2D,
  column: Array<number>,
  offsetX: number
): Array<AnimatedLabel> => {
  const columnWithIds = column.map((value, index) => ({ value, id: index }));
  const sortedWithIds = [...columnWithIds].sort(
    (e1, e2) => e1.value - e2.value
  );

  return columnWithIds.map((element, index) => {
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
      font: `${fontSize}px Inter`,
    })
      .animateOpacity(1, 500)
      .animatePosition(targetPosition, 1000, 1000);
  });
};

const getAnimatedDistances = (
  ctx: CanvasRenderingContext2D,
  left: Array<number>,
  right: Array<number>
): [Array<AnimatedLine | AnimatedLabel>, Array<number>] => {
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
      }).animateOpacity(1, 500, i * 100)
    );
  }

  return [animations, distances];
};

const getAnimatedResult = (
  ctx: CanvasRenderingContext2D,
  distances: number[]
): Array<AnimatedLabel> => {
  const total = sum(distances);

  const equalsAnimation = new AnimatedLabel({
    ctx,
    position: new Vector2(ctx.canvas.width / 2, marginY - 30),
    rotation: Math.PI / 2,
    opacity: 0,
    label: "=",
  }).animateOpacity(1, 500);
  const resultAnimation = new AnimatedLabel({
    ctx,
    position: new Vector2(ctx.canvas.width / 2, marginY - 60),
    opacity: 0,
    label: total.toString(),
  }).animateOpacity(1, 500);

  console.log("Part 1:", total);
  return [equalsAnimation, resultAnimation];
};
