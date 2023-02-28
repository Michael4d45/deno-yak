import { ConditionalNode, Stack } from "../../types.ts";
import { PushComputeType} from "./../types.ts";
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
    pushCompute(node.nodes);
  }
};

export default calculateConditional;
