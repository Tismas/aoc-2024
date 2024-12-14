import { showInConstruction } from "../../helpers/animations/showInConstructionMessage";
import { groupBy } from "../../helpers/array";
import { Vector2 } from "../../helpers/Vector2";

interface Robot {
  position: Vector2;
  velocity: Vector2;
}

const width = 101;
const height = 103;
const middleX = Math.floor(width / 2);
const middleY = Math.floor(height / 2);

export const part1 = (ctx: CanvasRenderingContext2D, input: string) => {
  const robots = input.split("\n").map(parseRobot);

  robots.forEach((robot) => {
    robot.position = robot.position.add(robot.velocity.multiply(100)).modulo(new Vector2(width, height));
    if (robot.position.x < 0) robot.position.x += width;
    if (robot.position.y < 0) robot.position.y += height;
  });

  const result = getQuadrantSizes(robots).reduce((acc, x) => acc * x, 1);
  showInConstruction(ctx, result, "Result for my input:");
};

const parseRobot = (rawRobot: string): Robot => {
  const regex = /p=(?<px>-?\d+),(?<py>-?\d+) v=(?<vx>-?\d+),(?<vy>-?\d+)/;
  const groups = rawRobot.match(regex)?.groups;

  if (!groups) throw new Error("Error while parsing input");

  const { px, py, vx, vy } = groups;

  return {
    position: new Vector2(Number(px), Number(py)),
    velocity: new Vector2(Number(vx), Number(vy)),
  };
};

const getQuadrantSizes = (robots: Robot[]) => {
  const quadrants = groupBy(robots, (robot): string => {
    if (robot.position.x < middleX && robot.position.y < middleY) return "topLeft";
    if (robot.position.x > middleX && robot.position.y < middleY) return "topRight";
    if (robot.position.x < middleX && robot.position.y > middleY) return "bottomLeft";
    if (robot.position.x > middleX && robot.position.y > middleY) return "bottomRight";
    return "middle";
  });

  return [quadrants.topLeft, quadrants.topRight, quadrants.bottomLeft, quadrants.bottomRight].map((x) => x.length);
};
