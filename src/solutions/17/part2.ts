import { showInConstruction } from "../../helpers/animations/showInConstructionMessage";

export const part2 = (ctx: CanvasRenderingContext2D, input: string) => {
  const [rawRegisters, rawProgram] = input.split("\n\n");

  const registers = rawRegisters.split("\n").map(parseRegister);
  const program = rawProgram.replace("Program: ", "").split(",").map(BigInt);

  const result = findCorrectDigits(program, registers);

  if (result) {
    showInConstruction(ctx, parseInt(result.join(""), 8));
  } else {
    showInConstruction(ctx, "Not found");
  }
};

const findCorrectDigits = (
  program: bigint[],
  registers: bigint[],
  digits = new Array(16).fill(1),
  index = 0
): number[] | null => {
  if (index === program.length) return digits;

  for (let i = 0; i < 8; i++) {
    const modifiedDigits = [...digits];
    modifiedDigits[index] = i;
    const number = BigInt(parseInt(modifiedDigits.join(""), 8));
    const modifiedRegisters = [number, registers[1], registers[2]];
    const out = runProgram(program, [...modifiedRegisters]);

    if (out[out.length - 1 - index] === program[program.length - 1 - index]) {
      const result = findCorrectDigits(program, registers, modifiedDigits, index + 1);
      if (result) return result;
    }
  }

  return null;
};

const parseRegister = (rawRegister: string) => {
  const regex = /Register [A|B|C]: (?<value>\d+)/;
  const value = rawRegister.match(regex)?.groups?.value;
  if (!value) throw new Error(`Failed to parse register: ${rawRegister}`);
  return BigInt(value);
};

const runProgram = (program: bigint[], registers: bigint[]) => {
  let instructionPointer = 0;
  const out: bigint[] = [];
  while (instructionPointer < program.length) {
    const opcode = program[instructionPointer];
    const operand = program[instructionPointer + 1];

    if (opcode === 0n) {
      registers[0] = bitShift(operand, registers);
    } else if (opcode === 1n) {
      registers[1] = registers[1] ^ operand;
    } else if (opcode === 2n) {
      registers[1] = getComboOperandValue(operand, registers) % 8n;
    } else if (opcode === 3n) {
      if (registers[0] !== 0n) {
        instructionPointer = Number(operand);
        continue;
      }
    } else if (opcode === 4n) {
      registers[1] = registers[1] ^ registers[2];
    } else if (opcode === 5n) {
      out.push(getComboOperandValue(operand, registers) % 8n);
    } else if (opcode === 6n) {
      registers[1] = bitShift(operand, registers);
    } else if (opcode === 7n) {
      registers[2] = bitShift(operand, registers);
    }

    instructionPointer += 2;
  }
  return out;
};

const getComboOperandValue = (operand: bigint, registers: bigint[]): bigint => {
  if (operand <= 3n) return operand;
  if (operand <= 6n) return registers[Number(operand - 4n)];
  throw new Error("Invalid combo operand");
};

const bitShift = (operand: bigint, registers: bigint[]) => {
  const numerator = registers[0];
  return numerator >> getComboOperandValue(operand, registers);
};
