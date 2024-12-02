import { AnimatedLabel } from "../../helpers/animations/AnimatedLabel";
import { AnimatedLine } from "../../helpers/animations/AnimatedLine";
import { runAnimation } from "../../helpers/animations/runAnimations";
import { zip } from "../../helpers/array";
import { Vector2 } from "../../helpers/Vector2";
import input from "./input.txt?raw";

const marginY = 200;
const spacingY = 100;
const spacingX = 200;
const fontSize = 24;

export const part2 = async (ctx: CanvasRenderingContext2D) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  const rows = input.split("\n").map((line) => line.split("   ").map(Number));
  const [left, right] = zip(...rows);

  const leftLabels = getAnimatedLabels(ctx, left, -spacingX / 2);
  const rightLabels = getAnimatedLabels(ctx, right, spacingX / 2);
  const labels = [...leftLabels, ...rightLabels];

  await runAnimation(ctx, labels);

  let total = 0;
  for (let i = 0; i < left.length; i++) {
    const [linesAnimations, score] = getAnimatedSimilarities(
      ctx,
      left,
      right,
      i
    );
    const totalAnimations = score ? getAnimatedTotal(ctx, total) : [];
    await runAnimation(ctx, [...linesAnimations, ...totalAnimations], labels);
    total += score;
  }

  await runAnimation(ctx, getAnimatedTotal(ctx, total), labels);
  console.log("Part 2", total);
};

const getAnimatedLabels = (
  ctx: CanvasRenderingContext2D,
  column: Array<number>,
  offsetX: number
): Array<AnimatedLabel> => {
  return column.map((element, index) => {
    const x = ctx.canvas.width / 2 + offsetX;
    const position = new Vector2(x, marginY + index * spacingY);

    return new AnimatedLabel({
      ctx,
      position,
      opacity: 0,
      label: element.toString(),
      fontSize,
    }).animateOpacity(1, 500);
  });
};

const getAnimatedSimilarities = (
  ctx: CanvasRenderingContext2D,
  left: Array<number>,
  right: Array<number>,
  index: number
): [Array<AnimatedLine | AnimatedLabel>, number] => {
  const value = left[index];
  const connections = right
    .map((e, i) => (e === value ? i : -1))
    .filter((e) => e !== -1);
  const animations = [];

  connections.forEach((targetIndex, i) => {
    const startPosition = new Vector2(
      ctx.canvas.width / 2 - spacingX / 2,
      marginY + index * spacingY
    );
    const targetPosition = new Vector2(
      ctx.canvas.width / 2 + spacingX / 2,
      marginY + targetIndex * spacingY
    );

    animations.push(
      new AnimatedLine({
        ctx,
        startPosition,
        targetPosition,
      }).animateDrawing(500, i * 500)
    );
  });

  const similarityValue = connections.length * value;
  if (similarityValue > 0) {
    const x = ctx.canvas.width / 2;
    const delay = connections.length * 500;

    animations.push(
      new AnimatedLabel({
        ctx,
        position: new Vector2(x - 30, marginY),
        label: connections.length.toString(),
        opacity: 0,
      })
        .animateOpacity(1, 500, delay)
        .animatePosition(new Vector2(x, marginY), 500, delay + 500)
        .animateOpacity(0, 500, delay + 500)
    );
    animations.push(
      new AnimatedLabel({
        ctx,
        position: new Vector2(x, marginY),
        label: "*",
        opacity: 0,
      })
        .animateOpacity(1, 500, delay)
        .animateOpacity(0, 500, delay + 500)
    );
    animations.push(
      new AnimatedLabel({
        ctx,
        position: new Vector2(x + 30, marginY),
        label: value.toString(),
        opacity: 0,
      })
        .animateOpacity(1, 500, delay)
        .animatePosition(new Vector2(x, marginY), 500, delay + 500)
        .animateOpacity(0, 500, delay + 500)
    );

    animations.push(
      new AnimatedLabel({
        ctx,
        position: new Vector2(x, marginY),
        label: `+ ${similarityValue.toString()}`,
        opacity: 0,
      })
        .animateOpacity(1, 250, delay + 1000)
        .animatePosition(new Vector2(x, marginY - 25), 250, delay + 1250)
        .animateOpacity(0, 250, delay + 1300)
    );
  }

  return [animations, similarityValue];
};

const getAnimatedTotal = (ctx: CanvasRenderingContext2D, total: number) => {
  const animations = [];

  animations.push(
    new AnimatedLabel({
      ctx,
      label: total.toString(),
      position: new Vector2(ctx.canvas.width / 2, marginY - 50),
      opacity: 0,
    }).animateOpacity(1, 500)
  );

  return animations;
};
