import { showInConstruction } from "../../helpers/animations/showInConstructionMessage";

interface Node {
  next: Node | null;
  prev: Node | null;
  fileId: number;
  size: number;
  freeSpaceAfter: number;
}

export const part2 = (ctx: CanvasRenderingContext2D, input: string) => {
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

  debug(head);
  defrag(head, tail);
  debug(head);

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
    const secondToLast = right.prev;
    if (tryToMove(left, right)) {
      if (!secondToLast) return;
      if (head !== secondToLast) {
        return defrag(head, secondToLast);
      }
    }

    if (!right.prev) return;
    right = right.prev;
  }
};

const tryToMove = (left: Node, right: Node) => {
  while (left !== right) {
    if (left.freeSpaceAfter >= right.size) {
      removeNode(right);
      insertNodeAfter(right, left);
      return true;
    }
    if (!left.next) return;
    left = left.next;
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

const debug = (head: Node) => {
  const memory = [];

  let node: Node | null = head;
  while (node) {
    memory.push(...new Array(node.size).fill(node.fileId));
    memory.push(...new Array(node.freeSpaceAfter).fill("."));
    node = node.next;
  }

  console.log(memory.join(""));
};
