import { ComputeBlock, FunctionDefNode, Stack } from "../../../../types.ts";
import { PushComputeType } from "./../types.ts";
import { testArgLength } from "./Verification.ts";

const getFunction = (name: string, block: ComputeBlock): FunctionDefNode | null => {
  const func = block.scope.functions[name];

  if (func !== undefined) return func;

  if (block.parent === null) return null;

  return getFunction(name, block.parent);
};

const calculateFunctionCall = (
  block: ComputeBlock,
  name: string,
  stack: Stack,
  pushCompute: PushComputeType,
) => {
  const func = getFunction(name, block);

  if (func === null) {
    throw new Error(`Function '${name}' not defined`);
  }

  testArgLength(func.arity, stack, name);

  pushCompute(func.nodes);
};

export default calculateFunctionCall;
