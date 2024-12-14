import { groupBy } from "../../helpers/array";
import { Vector2 } from "../../helpers/Vector2";

interface Robot {
  position: Vector2;
  velocity: Vector2;
}

const width = 101;
const height = 103;

export const part2 = (ctx: CanvasRenderingContext2D, input: string) => {
  const robots = input.split("\n").map(parseRobot);

  const tick = getEasterEggTick(ctx, robots);

  console.log(tick);
  ctx.font = "20px Monospace";
  ctx.fillText(`Tick #${tick}`, ctx.canvas.width / 2, ctx.canvas.height / 2);
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

const getEasterEggTick = (ctx: CanvasRenderingContext2D, robots: Robot[], tick = 0) => {
  outer: while (true) {
    tick++;
    update(robots);

    const longestLine = getLongestVerticalLine(robots);
    if (longestLine > 15) break outer;
  }

  draw(ctx, robots);
  return tick;
};

const update = (robots: Robot[]) => {
  robots.forEach((robot) => {
    robot.position = robot.position.add(robot.velocity).modulo(new Vector2(width, height));
    if (robot.position.x < 0) robot.position.x += width;
    if (robot.position.y < 0) robot.position.y += height;
  });
};

const draw = (ctx: CanvasRenderingContext2D, robots: Robot[]) => {
  const scale = 3;
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.fillStyle = "#fff";
  robots.forEach((robot) => ctx.fillRect(robot.position.x * scale, robot.position.y * scale, 1, 1));
};

const getLongestVerticalLine = (robots: Robot[]) => {
  const columns = groupBy(robots, (robot) => robot.position.x);
  let longestLine = 0;

  for (const column of Object.values(columns)) {
    column.sort((a, b) => a.position.y - b.position.y);

    let prev = column[0];
    let lineLength = 0;
    for (const robot of column) {
      if (Math.abs(robot.position.y - prev.position.y) === 1) {
        lineLength++;
        if (lineLength > longestLine) longestLine = lineLength;
      } else {
        lineLength = 0;
      }
      prev = robot;
    }
  }

  return longestLine;
};
