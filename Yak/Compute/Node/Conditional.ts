import { ConditionalNode } from "../../types.d.ts";
import { PushComputeType, Stack } from "./../types.d.ts";
import { testArgLength } from "./Verification.ts";

const calculateConditional = (
  node: ConditionalNode,
  stack: Stack,
  pushCompute: PushComputeType,
) => {
  testArgLength(1, stack, node.value);
  const op = node.value;

  const arg = stack.pop() as number;

  // If op is '?' isFalsy is true if arg is 0
  // If op is '!' isFalsy is true if arg is not 0
  const isFalsy = op === "?" ? arg === 0 : arg !== 0;

  if (!isFalsy) {
    pushCompute(node.block);
  }
};

export default calculateConditional;