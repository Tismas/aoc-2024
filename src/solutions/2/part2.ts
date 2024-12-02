import { AnimatedLabel } from "../../helpers/animations/AnimatedLabel";
import { AnimatedLine } from "../../helpers/animations/AnimatedLine";
import {
  removeStaticContent,
  runAnimation,
} from "../../helpers/animations/runAnimations";
import { Vector2 } from "../../helpers/Vector2";
import input from "./input.txt?raw";

export const part2 = async (ctx: CanvasRenderingContext2D) => {
  const reports = input
    .split("\n")
    .map((report) => report.split(" ").map(Number));

  let score = 0;
  const animatedScoreLabel = new AnimatedLabel({
    ctx,
    fontFamily: "Monospace",
    fontSize: 48,
    label: "Safe reports:",
    opacity: 0,
    position: new Vector2(ctx.canvas.width / 2, 100),
    keepDrawingAfterAnimation: true,
  }).animateOpacity(1, 500);
  let animatedScoreValue = new AnimatedLabel({
    ctx,
    fontFamily: "Monospace",
    fontSize: 48,
    label: score.toString(),
    opacity: 0,
    position: new Vector2(ctx.canvas.width / 2 + 200, 100),
    keepDrawingAfterAnimation: true,
  }).animateOpacity(1, 500);
  runAnimation(ctx, [animatedScoreLabel, animatedScoreValue]);

  for (const report of reports) {
    const isSafe = await animateReport(ctx, report);
    if (isSafe) {
      score += 1;
      const oldAnimatedScore = animatedScoreValue
        .animateOpacity(0, 200)
        .animatePosition(new Vector2(ctx.canvas.width / 2 + 200, 50), 200);
      animatedScoreValue = new AnimatedLabel({
        ctx,
        fontFamily: "Monospace",
        fontSize: 48,
        label: score.toString(),
        opacity: 0,
        position: new Vector2(ctx.canvas.width / 2 + 200, 150),
        keepDrawingAfterAnimation: true,
      })
        .animateOpacity(1, 210)
        .animatePosition(new Vector2(ctx.canvas.width / 2 + 200, 100), 200);
      await runAnimation(ctx, [oldAnimatedScore, animatedScoreValue]);
      removeStaticContent([oldAnimatedScore]);
    }
  }
};

const animateReport = async (
  ctx: CanvasRenderingContext2D,
  report: number[],
  fails = 0,
  offsetX = 0
): Promise<boolean> => {
  const expectedSign = Math.sign(report[1] - report[0]);
  const middleX = ctx.canvas.width / 2;
  const middleY = ctx.canvas.height / 2;
  const startingPosition =
    fails === 0
      ? new Vector2(middleX + offsetX, ctx.canvas.height + 100)
      : new Vector2(middleX, middleY);
  const targetPosition = new Vector2(middleX + offsetX, middleY);
  const reportLabel = new AnimatedLabel({
    ctx,
    label: report.join("  "),
    position: startingPosition,
    fontSize: 48,
    fontFamily: "Monospace",
    rotationOrigin: "right",
    keepDrawingAfterAnimation: true,
  }).animatePosition(targetPosition, 500);
  runAnimation(ctx, [reportLabel]);

  const isSafePromises = [];
  for (let rightIndex = 1; rightIndex < report.length; rightIndex++) {
    const leftX = middleX - (report.length / 2) * 59 + offsetX;
    isSafePromises.push(
      animatePairCheck(ctx, report, leftX, rightIndex, expectedSign)
    );
  }
  const invalidIndex = (await Promise.all(isSafePromises)).indexOf(false);
  const isSafe = invalidIndex === -1;

  if (!isSafe) {
    if (fails === 0) {
      const withoutLeft = [...report];
      withoutLeft.splice(invalidIndex, 1);
      const withoutRight = [...report];
      withoutRight.splice(invalidIndex + 1, 1);
      removeStaticContent([reportLabel]);

      const [retryLeft, retryRight] = await Promise.all([
        animateReport(ctx, withoutLeft, 1, -500),
        animateReport(ctx, withoutRight, 1, 500),
      ]);

      return retryLeft || retryRight;
    } else {
      setTimeout(() => animateThrowAway(ctx, reportLabel), 0);
    }
  }
  removeStaticContent([reportLabel]);
  return isSafe;
};

const animatePairCheck = async (
  ctx: CanvasRenderingContext2D,
  report: number[],
  leftX: number,
  rightIndex: number,
  expectedSign: number
): Promise<boolean> => {
  const middleY = ctx.canvas.height / 2;
  const pairAnimations = [];

  const leftIndex = rightIndex - 1;

  const spacing = 79;
  const lineWidth = 15;
  pairAnimations.push(
    new AnimatedLine({
      ctx,
      startPosition: new Vector2(leftX + leftIndex * spacing, middleY - 25),
      targetPosition: new Vector2(
        leftX + lineWidth + leftIndex * spacing,
        middleY - 50
      ),
      keepDrawingAfterAnimation: true,
    }).animateDrawing(500, 500)
  );
  const rightArrowOffset = 60;
  pairAnimations.push(
    new AnimatedLine({
      ctx,
      startPosition: new Vector2(
        leftX + rightArrowOffset + leftIndex * spacing,
        middleY - 25
      ),
      targetPosition: new Vector2(
        leftX + rightArrowOffset - lineWidth + leftIndex * spacing,
        middleY - 50
      ),
      keepDrawingAfterAnimation: true,
    }).animateDrawing(500, 500)
  );

  const diff = report[rightIndex] - report[leftIndex];
  const isSafe =
    Math.abs(diff) <= 3 && diff !== 0 && Math.sign(diff) === expectedSign;
  pairAnimations.push(
    new AnimatedLabel({
      ctx,
      label: (diff > 0 ? "+" : "") + diff.toString(),
      color: isSafe ? "green" : "red",
      position: new Vector2(
        leftX + +lineWidth + leftIndex * spacing + 10,
        middleY - 65
      ),
      opacity: 0,
      keepDrawingAfterAnimation: true,
    }).animateOpacity(1, 500, 750)
  );

  await runAnimation(ctx, pairAnimations);
  removeStaticContent(pairAnimations);
  return isSafe;
};

const animateThrowAway = (
  ctx: CanvasRenderingContext2D,
  label: AnimatedLabel
): Promise<void> => {
  const middleY = ctx.canvas.height / 2;
  label
    .animateRotation(-Math.PI * 0.1, 50, 250)
    .animateRotation(-Math.PI * 0.3, 100, 300)
    .animateRotation(-Math.PI * 0.4, 200, 400)
    .animateRotation(-Math.PI * 0.42, 500, 600)
    .animateRotation(Math.PI / 3, 200, 1100)
    .animateRotation(Math.PI * 3, 400, 1300)
    .animatePosition(new Vector2(ctx.canvas.width + 400, middleY), 400, 1300);

  return runAnimation(ctx, [label]);
};
