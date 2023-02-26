import { TernaryOperator } from "../../types.ts";
import { Stack } from "./../types.ts";
import { testArgLength } from "./Verification.ts";

const calculateTernaryOp = (
  op: TernaryOperator,
  stack: Stack,
) => {
  testArgLength(3, stack, op);

  const first = stack.pop() as number;
  const second = stack.pop() as number;
  const third = stack.pop() as number;

  if (op === "<<<") {
    return stack.push(first, third, second);
  }
};

export default calculateTernaryOp;
