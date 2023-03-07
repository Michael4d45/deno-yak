import { ConditionalNode, CONDITIONAL_IF, Stack } from "../../../../types.ts";
import { PushComputeType} from "./../types.ts";
import { testArgLength } from "./Verification.ts";

const calculateConditional = (
  node: ConditionalNode,
  stack: Stack,
  pushCompute: PushComputeType,
) => {
  testArgLength(1, stack, CONDITIONAL_IF);
  const arg = stack.pop() as number;

  // If op is '?' isFalsy is true if arg is 0
  const isFalsy = arg === 0;

  const nodes = isFalsy ? node.else_nodes : node.if_nodes

  if(nodes.length > 0) pushCompute(nodes);
};

export default calculateConditional;
