import { showInConstruction } from "../../helpers/animations/showInConstructionMessage";
import input from "./input.txt?raw";

export const part1 = (ctx: CanvasRenderingContext2D) => {
  const disk = [];

  let isFreeSpace = false;
  let fileId = 0;
  for (const sizeStr of input.split("")) {
    const size = Number(sizeStr);

    if (isFreeSpace) {
      disk.push(...new Array(size).fill("."));
    } else {
      disk.push(...new Array(size).fill(fileId));
      fileId++;
    }

    isFreeSpace = !isFreeSpace;
  }

  while (disk.includes(".")) {
    const item = disk.pop();
    if (item !== ".") {
      disk[disk.indexOf(".")] = item;
    }
  }

  const result = disk.reduce((acc, fileId, index) => acc + fileId * index, 0);

  showInConstruction(ctx, result);
};
