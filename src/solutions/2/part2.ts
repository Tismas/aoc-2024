import { sum } from "../../helpers/array";
import input from "./input.txt?raw";

const checkReport = (report: number[], sign: number, fails = 0): 0 | 1 => {
  for (let i = 1; i < report.length; i++) {
    const diff = report[i] - report[i - 1];
    if (Math.sign(diff) !== sign || diff === 0 || Math.abs(diff) > 3) {
      if (fails >= 1) return 0;
      const withoutLeft = [...report];
      withoutLeft.splice(i - 1, 1);
      const withoutRight = [...report];
      withoutRight.splice(i, 1);
      return (
        checkReport(withoutLeft, sign, 1) || checkReport(withoutRight, sign, 1)
      );
    }
  }
  return 1;
};

const getSign = (report: number[]) => {
  const signs = [
    Math.sign(report[1] - report[0]),
    Math.sign(report[2] - report[1]),
    Math.sign(report[3] - report[2]),
  ];

  return Math.sign(sum(signs));
};

export const part2 = () => {
  const reports = input
    .split("\n")
    .map((report) => report.split(" ").map(Number));
  let safe = 0;

  for (const report of reports) {
    const sign = getSign(report);
    safe += checkReport(report, sign);
  }

  console.log("Part 2", safe);
};
