import { Stack, UnaryOperator } from "../../types.ts";
import { testArgLength } from "./Verification.ts";

const calculateUnaryOp = (
  op: UnaryOperator,
  stack: Stack,
) => {
  testArgLength(1, stack, op);

  if (op === ".") {
    return stack.push(stack[stack.length - 1]);
  }

  if (op === "@") {
    return stack.pop();
  }
};
export default calculateUnaryOp;
