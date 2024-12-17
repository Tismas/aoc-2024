import { showInConstruction } from "../../helpers/animations/showInConstructionMessage";

export const part1 = (ctx: CanvasRenderingContext2D, input: string) => {
  const [rawRegisters, rawProgram] = input.split("\n\n");

  const registers = rawRegisters.split("\n").map(parseRegister);
  const program = rawProgram.replace("Program: ", "").split(",").map(Number);

  let instructionPointer = 0;
  const out: number[] = [];
  while (instructionPointer < program.length) {
    const opcode = program[instructionPointer];
    const operand = program[instructionPointer + 1];

    if (opcode === 0) {
      registers[0] = bitShift(operand, registers);
    } else if (opcode === 1) {
      registers[1] = registers[1] ^ operand;
    } else if (opcode === 2) {
      registers[1] = getComboOperandValue(operand, registers) % 8;
    } else if (opcode === 3) {
      if (registers[0] !== 0) {
        instructionPointer = operand;
        continue;
      }
    } else if (opcode === 4) {
      registers[1] = registers[1] ^ registers[2];
    } else if (opcode === 5) {
      out.push(getComboOperandValue(operand, registers) % 8);
    } else if (opcode === 6) {
      registers[1] = bitShift(operand, registers);
    } else if (opcode === 7) {
      registers[2] = bitShift(operand, registers);
    }

    instructionPointer += 2;
  }

  showInConstruction(ctx, out.join(","));
};

const parseRegister = (rawRegister: string) => {
  const regex = /Register [A|B|C]: (?<value>\d+)/;
  const value = rawRegister.match(regex)?.groups?.value;
  if (!value) throw new Error(`Failed to parse register: ${rawRegister}`);
  return Number(value);
};

const getComboOperandValue = (operand: number, registers: number[]) => {
  if (operand <= 3) return operand;
  if (operand <= 6) return registers[operand - 4];
  throw new Error("Invalid combo operand");
};

const bitShift = (operand: number, registers: number[]) => {
  const numerator = registers[0];
  return numerator >> getComboOperandValue(operand, registers);
};
