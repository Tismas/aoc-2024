import { AnimatedLabel } from "../../helpers/animations/AnimatedLabel";
import { AnimatedLine } from "../../helpers/animations/AnimatedLine";
import {
  removeStaticContent,
  runAnimation,
} from "../../helpers/animations/runAnimations";
import { zip } from "../../helpers/array";
import { Vector2 } from "../../helpers/Vector2";
import input from "./input.txt?raw";

const marginY = 200;
const spacingY = 100;
const spacingX = 200;
const fontSize = 24;

export const part2 = async (ctx: CanvasRenderingContext2D) => {
  const rows = input.split("\n").map((line) => line.split("   ").map(Number));
  const [left, right] = zip(...rows);

  await Promise.all([
    animateLabels(ctx, left, -spacingX / 2),
    animateLabels(ctx, right, spacingX / 2),
  ]);

  let total = 0;
  animateTotal(ctx, total);
  for (let i = 0; i < left.length; i++) {
    const score = await animateSimilarities(ctx, left, right, i);
    total += score;
    if (score) animateTotal(ctx, total);
  }

  console.log("Part 2", total);
};

const animateLabels = (
  ctx: CanvasRenderingContext2D,
  column: Array<number>,
  offsetX: number
): Promise<void> => {
  const animations = column.map((element, index) => {
    const x = ctx.canvas.width / 2 + offsetX;
    const position = new Vector2(x, marginY + index * spacingY);

    return new AnimatedLabel({
      ctx,
      position,
      opacity: 0,
      label: element.toString(),
      fontSize,
      keepDrawingAfterAnimation: true,
    }).animateOpacity(1, 500);
  });

  return runAnimation(ctx, animations);
};

const animateSimilarities = async (
  ctx: CanvasRenderingContext2D,
  left: Array<number>,
  right: Array<number>,
  index: number
): Promise<number> => {
  const value = left[index];
  const connections = right
    .map((e, i) => (e === value ? i : -1))
    .filter((e) => e !== -1);
  const animations = [];

  const lines = connections.map((targetIndex, i) => {
    const startPosition = new Vector2(
      ctx.canvas.width / 2 - spacingX / 2,
      marginY + index * spacingY
    );
    const targetPosition = new Vector2(
      ctx.canvas.width / 2 + spacingX / 2,
      marginY + targetIndex * spacingY
    );

    return new AnimatedLine({
      ctx,
      startPosition,
      targetPosition,
      keepDrawingAfterAnimation: true,
    }).animateDrawing(500, i * 500);
  });
  await runAnimation(ctx, lines);
  removeStaticContent(lines);

  const similarityValue = connections.length * value;
  if (similarityValue > 0) {
    const x = ctx.canvas.width / 2;
    animations.push(
      new AnimatedLabel({
        ctx,
        position: new Vector2(x - 30, marginY),
        label: connections.length.toString(),
        opacity: 0,
      })
        .animateOpacity(1, 500)
        .animatePosition(new Vector2(x, marginY), 500, 500)
        .animateOpacity(0, 500, 500)
    );
    animations.push(
      new AnimatedLabel({
        ctx,
        position: new Vector2(x, marginY),
        label: "*",
        opacity: 0,
      })
        .animateOpacity(1, 500)
        .animateOpacity(0, 500, 500)
    );
    animations.push(
      new AnimatedLabel({
        ctx,
        position: new Vector2(x + 30, marginY),
        label: value.toString(),
        opacity: 0,
      })
        .animateOpacity(1, 500)
        .animatePosition(new Vector2(x, marginY), 500, 500)
        .animateOpacity(0, 500, 500)
    );

    animations.push(
      new AnimatedLabel({
        ctx,
        position: new Vector2(x, marginY),
        label: `+ ${similarityValue.toString()}`,
        opacity: 0,
      })
        .animateOpacity(1, 250, 1000)
        .animatePosition(new Vector2(x, marginY - 25), 250, 1250)
        .animateOpacity(0, 250, 1300)
    );
  }

  await runAnimation(ctx, animations);
  return similarityValue;
};

let prevTotalAnimatedLabel: AnimatedLabel | null = null;
const animateTotal = (ctx: CanvasRenderingContext2D, total: number) => {
  if (prevTotalAnimatedLabel) {
    removeStaticContent([prevTotalAnimatedLabel]);
  }
  prevTotalAnimatedLabel = new AnimatedLabel({
    ctx,
    label: total.toString(),
    position: new Vector2(ctx.canvas.width / 2, marginY - 50),
    opacity: 0,
    keepDrawingAfterAnimation: true,
  }).animateOpacity(1, 500);

  return runAnimation(ctx, [prevTotalAnimatedLabel]);
};
