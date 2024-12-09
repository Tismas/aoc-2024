import { showInConstruction } from "../../helpers/animations/showInConstructionMessage";

export const part1 = (ctx: CanvasRenderingContext2D, input: string) => {
  const equations = input.split("\n");
  let result = 0;

  for (const equation of equations) {
    const [testValue, numbers] = equation.split(": ");
    if (isValid(Number(testValue), numbers.split(" ").map(Number))) {
      result += Number(testValue);
    }
  }

  showInConstruction(ctx, result);
};

const isValid = (testValue: number, numbers: number[]): boolean => {
  let possibleOutcomes = new Set<number>();
  possibleOutcomes.add(numbers[0]);

  for (const number of numbers.slice(1)) {
    const newPossibleOutcomes = new Set<number>();
    for (const possibleOutcome of possibleOutcomes) {
      newPossibleOutcomes.add(number * possibleOutcome);
      newPossibleOutcomes.add(number + possibleOutcome);
    }
    possibleOutcomes = newPossibleOutcomes;
  }

  return possibleOutcomes.has(testValue);
};
