import { showInConstruction } from "../../helpers/animations/showInConstructionMessage";
import { Vector2 } from "../../helpers/Vector2";

interface Machine {
  buttonA: Vector2;
  buttonB: Vector2;
  prizeLocation: Vector2;
}

export const part2 = (ctx: CanvasRenderingContext2D, input: string) => {
  const machines = input.split("\n\n").map(parseMachine);

  let sum = 0;
  machines.forEach((machine) => {
    const cost = calculatePrice(machine.buttonA, machine.buttonB, machine.prizeLocation);
    if (cost) sum += cost;
  });

  showInConstruction(ctx, sum);
};

const parseMachine = (machine: string): Machine => {
  const [buttonAStr, buttonBStr, prizeLocStr] = machine.split("\n");

  const buttonRegex = /Button \w: X\+(?<x>\d+), Y\+(?<y>\d+)/;
  const buttonA = buttonAStr.match(buttonRegex)?.groups;
  const buttonB = buttonBStr.match(buttonRegex)?.groups;

  const prizeLocRegex = /Prize: X=(?<x>\d+), Y=(?<y>\d+)/;
  const prizeLocation = prizeLocStr.match(prizeLocRegex)?.groups;

  if (!buttonA || !buttonB || !prizeLocation) throw new Error("Regex sucks! Or I suck...");

  return {
    buttonA: new Vector2(Number(buttonA.x), Number(buttonA.y)),
    buttonB: new Vector2(Number(buttonB.x), Number(buttonB.y)),
    prizeLocation: new Vector2(Number(prizeLocation.x) + 10000000000000, Number(prizeLocation.y) + 10000000000000),
  };
};

const calculatePrice = (A: Vector2, B: Vector2, target: Vector2): number | null => {
  const a = A.x;
  const b = B.x;
  const c = A.y;
  const d = B.y;
  const e = target.x;
  const f = target.y;

  const divider = a * d - b * c;
  if (divider === 0) return 0;
  const aPresses = (e * d - b * f) / divider;
  const bPresses = (a * f - e * c) / divider;
  if (Math.round(aPresses) !== aPresses || Math.round(bPresses) !== bPresses) return 0;
  return aPresses * 3 + bPresses;
};
