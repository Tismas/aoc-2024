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

  const leftAnimatedLabels = getAnimatedLabels(ctx, left, -spacingX / 2);
  const rightAnimatedLabels = getAnimatedLabels(ctx, right, spacingX / 2);

  const labels = [...leftAnimatedLabels, ...rightAnimatedLabels];
  await runAnimation(ctx, labels);

  const distanceLines = getAnimatedDistanceLines(ctx, left.length);
  await runAnimation(ctx, distanceLines, labels);

  const [distanceLabels, distances] = getDistances(
    ctx,
    leftSorted,
    rightSorted
  );
  await runAnimation(ctx, distanceLabels, [...distanceLines, ...labels]);

  const resultLabels = getResultLabels(ctx, distances);
  await runAnimation(ctx, resultLabels, [
    ...distanceLabels,
    ...distanceLines,
    ...labels,
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
    const startPosition = new Vector2(x, marginY + index * spacingY);
    const targetPosition = new Vector2(x, marginY + targetIndex * spacingY);

    return new AnimatedLabel({
      ctx,
      startPosition,
      targetPosition,
      delay: 1000,
      label: element.value.toString(),
      font: `${fontSize}px Inter`,
    });
  });
};

const getAnimatedDistanceLines = (
  ctx: CanvasRenderingContext2D,
  rows: number
): Array<AnimatedLine> => {
  const lines = [];
  const margin = 20;

  for (let i = 0; i < rows; i++) {
    const y = marginY + spacingY * i;

    // left line
    lines.push(
      new AnimatedLine({
        ctx,
        startPosition: new Vector2(
          ctx.canvas.width / 2 - spacingX / 2 + margin,
          y
        ),
        targetPosition: new Vector2(ctx.canvas.width / 2 - margin, y),
        duration: 500,
      })
    );
    // right line
    lines.push(
      new AnimatedLine({
        ctx,
        startPosition: new Vector2(
          ctx.canvas.width / 2 + spacingX / 2 - margin,
          y
        ),
        targetPosition: new Vector2(ctx.canvas.width / 2 + margin, y),
        duration: 500,
      })
    );
  }

  return lines;
};

const getDistances = (
  ctx: CanvasRenderingContext2D,
  left: Array<number>,
  right: Array<number>
): [Array<AnimatedLabel>, Array<number>] => {
  const distanceLabels = [];
  const distances = [];

  for (let i = 0; i < left.length; i++) {
    const distance = Math.abs(left[i] - right[i]);
    distances.push(distance);
    const position = new Vector2(ctx.canvas.width / 2, marginY + i * spacingY);

    distanceLabels.push(
      new AnimatedLabel({
        ctx,
        startPosition: position,
        label: distance.toString(),
        startOpacity: 0,
        targetOpacity: 1,
        duration: 500,
      })
    );
  }

  return [distanceLabels, distances];
};

const getResultLabels = (
  ctx: CanvasRenderingContext2D,
  distances: number[]
): Array<AnimatedLabel> => {
  const total = sum(distances);

  const equals = new AnimatedLabel({
    ctx,
    startPosition: new Vector2(ctx.canvas.width / 2, marginY - 30),
    startRotation: Math.PI / 2,
    startOpacity: 0,
    targetOpacity: 1,
    label: "=",
  });
  const result = new AnimatedLabel({
    ctx,
    startPosition: new Vector2(ctx.canvas.width / 2, marginY - 60),
    startOpacity: 0,
    targetOpacity: 1,
    label: total.toString(),
  });

  console.log("Part 1:", total);
  return [equals, result];
};
