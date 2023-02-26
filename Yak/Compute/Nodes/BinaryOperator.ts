import { BinaryOperator } from "../../types.ts";
import { Stack } from "../types.ts";
import { testArgLength } from "./Verification.ts";

const calculateBinaryOp = (
  op: BinaryOperator,
  stack: Stack,
) => {
  testArgLength(2, stack, op);

  const first = stack.pop() as number;
  const second = stack.pop() as number;

  if (op === "+") {
    return stack.push(first + second);
  }

  if (op === "-") {
    return stack.push(second - first);
  }

  if (op === "*") {
    return stack.push(first * second);
  }

  if (op === "%") {
    return stack.push(first % second);
  }

  if (op === "==") {
    return stack.push(first === second ? 1 : 0);
  }

  if (op === "|") {
    return stack.push(first === 1 || second === 1 ? 1 : 0);
  }

  if (op === "&") {
    return stack.push(first === 1 && second === 1 ? 1 : 0);
  }

  if (op === "^") {
    return stack.push(
      (first === 1 || second === 1) && first !== second ? 1 : 0,
    );
  }

  if (op === "<->") {
    return stack.push(first, second);
  }

  if (op === "<^>") {
    return stack.push(first, second, first);
  }
};

export default calculateBinaryOp;