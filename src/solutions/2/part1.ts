import { AnimatedLabel } from "../../helpers/animations/AnimatedLabel";
import { AnimatedLine } from "../../helpers/animations/AnimatedLine";
import { runAnimation } from "../../helpers/animations/runAnimations";
import { Vector2 } from "../../helpers/Vector2";
import input from "./input.txt?raw";

export const part1 = async (ctx: CanvasRenderingContext2D) => {
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
  }).animateOpacity(1, 500);
  const animatedScoreValue = new AnimatedLabel({
    ctx,
    fontFamily: "Monospace",
    fontSize: 48,
    label: score.toString(),
    opacity: 0,
    position: new Vector2(ctx.canvas.width / 2 + 200, 100),
  }).animateOpacity(1, 500);
  const scoreLabels = [animatedScoreLabel, animatedScoreValue];

  runAnimation(ctx, scoreLabels);
  for (const report of reports) {
    const isSafe = await animateReport(ctx, report, scoreLabels);
    if (isSafe) {
      score += 1;
      const oldAnimatedScore = animatedScoreValue
        .animateOpacity(0, 200)
        .animatePosition(new Vector2(ctx.canvas.width / 2 + 200, 50), 200);
      scoreLabels[1] = new AnimatedLabel({
        ctx,
        fontFamily: "Monospace",
        fontSize: 48,
        label: score.toString(),
        opacity: 0,
        position: new Vector2(ctx.canvas.width / 2 + 200, 150),
      })
        .animateOpacity(1, 200)
        .animatePosition(new Vector2(ctx.canvas.width / 2 + 200, 100), 200);
      await runAnimation(
        ctx,
        [oldAnimatedScore, scoreLabels[1]],
        [animatedScoreLabel]
      );
    }
  }
};

const animateReport = async (
  ctx: CanvasRenderingContext2D,
  report: number[],
  staticLabels: AnimatedLabel[]
) => {
  const entryAnimations = [];
  const expectedSign = Math.sign(report[1] - report[0]);

  const middleX = ctx.canvas.width / 2;
  const middleY = ctx.canvas.height / 2;
  const startingPosition = new Vector2(middleX, ctx.canvas.height + 100);
  const targetPosition = new Vector2(middleX, middleY);

  entryAnimations.push(
    new AnimatedLabel({
      ctx,
      label: report.join("  "),
      position: startingPosition,
      fontSize: 48,
      fontFamily: "Monospace",
      rotationOrigin: "right",
    }).animatePosition(targetPosition, 500)
  );
  await runAnimation(ctx, entryAnimations, staticLabels);

  for (let rightIndex = 1; rightIndex < report.length; rightIndex++) {
    const pairAnimations = [];

    const leftX = middleX - (report.length / 2) * 59;
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
      }).animateOpacity(1, 500, 750)
    );

    await runAnimation(ctx, pairAnimations, [
      ...entryAnimations,
      ...staticLabels,
    ]);
    if (!isSafe) {
      entryAnimations[0]
        .animateRotation(-Math.PI * 0.1, 50, 250)
        .animateRotation(-Math.PI * 0.3, 100, 300)
        .animateRotation(-Math.PI * 0.4, 200, 400)
        .animateRotation(-Math.PI * 0.42, 500, 600)
        .animateRotation(Math.PI / 3, 200, 1100)
        .animateRotation(Math.PI * 3, 400, 1300)
        .animatePosition(
          new Vector2(ctx.canvas.width + 400, middleY),
          400,
          1300
        );
      await runAnimation(ctx, entryAnimations, staticLabels);
      return false;
    }
  }
  return true;
};
