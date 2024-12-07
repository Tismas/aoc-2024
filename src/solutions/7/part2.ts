import { AnimatedLabel } from "../../helpers/animations/AnimatedLabel";
import { runAnimation } from "../../helpers/animations/runAnimations";
import { Vector2 } from "../../helpers/Vector2";
import input from "./input.txt?raw";

export const part2 = (ctx: CanvasRenderingContext2D) => {
  const equations = input.split("\n");
  let result = 0;

  for (const equation of equations) {
    const [testValue, numbers] = equation.split(": ");
    if (isValid(Number(testValue), numbers.split(" ").map(Number))) {
      result += Number(testValue);
    }
  }

  const middle = new Vector2(ctx.canvas.width / 2, ctx.canvas.height / 2);
  const resultAnimation = new AnimatedLabel({
    ctx,
    label: `Animation in construction... Result for example input: ${result}`,
    position: middle,
    opacity: 0,
  }).animateOpacity(1, 1000);

  runAnimation(ctx, [resultAnimation]);
};

const isValid = (testValue: number, numbers: number[]): boolean => {
  let possibleOutcomes = new Set<number>();
  possibleOutcomes.add(numbers[0]);

  for (const number of numbers.slice(1)) {
    const newPossibleOutcomes = new Set<number>();
    for (const possibleOutcome of possibleOutcomes) {
      newPossibleOutcomes.add(possibleOutcome * number);
      newPossibleOutcomes.add(possibleOutcome + number);
      newPossibleOutcomes.add(Number(String(possibleOutcome) + String(number)));
    }
    possibleOutcomes = newPossibleOutcomes;
  }

  return possibleOutcomes.has(testValue);
};
