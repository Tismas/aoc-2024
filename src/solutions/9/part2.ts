import { showInConstruction } from "../../helpers/animations/showInConstructionMessage";
import input from "./input.txt?raw";

interface Node {
  next: Node | null;
  prev: Node | null;
  fileId: number;
  size: number;
  freeSpaceAfter: number;
}

export const part2 = (ctx: CanvasRenderingContext2D) => {
  const diskData = input.split("").map(Number);
  let head: Node | null = null;
  let tail: Node | null = null;
  let currentFileId = 0;

  for (let i = 0; i < diskData.length; i += 2) {
    const node: Node = {
      fileId: currentFileId,
      size: diskData[i],
      freeSpaceAfter: diskData[i + 1] || 0,
      next: null,
      prev: null,
    };
    if (!head || !tail) {
      head = node;
      tail = node;
    } else {
      node.prev = tail;
      tail.next = node;
      tail = node;
    }
    currentFileId++;
  }

  if (!tail || !head) throw new Error("wtf?");

  defrag(head, tail);

  let sum = 0;
  let node: Node | null = head;
  let index = 0;
  while (node) {
    const firstValue = node.fileId * index;
    const lastValue = node.fileId * (index + node.size - 1);
    sum += node.size * ((firstValue + lastValue) / 2);
    index += node.size + node.freeSpaceAfter;
    node = node.next;
  }

  showInConstruction(ctx, sum);
};

const defrag = (head: Node, right: Node): void => {
  while (head.freeSpaceAfter === 0) {
    if (!head.next) return;
    head = head.next;
  }

  let left = head;

  while (left !== right) {
    const secondToLast = right.prev!;
    if (tryToMove(left, right)) {
      return defrag(head, secondToLast);
    }
    right = right.prev!;
  }
};

const tryToMove = (left: Node, right: Node) => {
  while (left !== right) {
    if (left.freeSpaceAfter >= right.size) {
      removeNode(right);
      insertNodeAfter(right, left);
      return true;
    }
    left = left.next!;
  }
  return false;
};

const removeNode = (node: Node) => {
  if (node.prev) {
    node.prev.freeSpaceAfter += node.size + node.freeSpaceAfter;
    node.prev.next = node.next;
  }
  if (node.next) {
    node.next.prev = node.prev;
  }
  node.next = null;
  node.prev = null;
};
const insertNodeAfter = (node: Node, prev: Node) => {
  node.freeSpaceAfter = prev.freeSpaceAfter - node.size;
  prev.freeSpaceAfter = 0;

  node.next = prev.next;
  node.prev = prev;

  if (prev.next) {
    prev.next.prev = node;
  }
  prev.next = node;
};

const debug = (head: Node | null) => {
  const disk = [];

  while (head) {
    disk.push(...new Array(head.size).fill(head.fileId));
    disk.push(...new Array(head.freeSpaceAfter).fill("."));
    head = head.next;
  }

  console.log(disk.join(""));
};
