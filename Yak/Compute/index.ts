import { Block } from "../types.d.ts";
import computeNode from "./Node/index.ts";
import { PushComputeType, Stack, StepType } from "./types.d.ts";

const Runner = () => {
  type ComputeType = ReturnType<typeof compute>;
  const computeStack: ComputeType[] = [];
  const stack: Stack = [];

  const reset = () => {
    computeStack.length = 0;
    stack.length = 0;
  };

  const pushCompute: PushComputeType = (block: Block) =>
    computeStack.push(compute(block));

  const compute = (block: Block) => {
    let i = 0;

    const computeLine = () => {
      const node = block.scope.nodes[i];
      computeNode(block, node, stack, pushCompute);
      i++;
      return node;
    };

    return {
      computeLine,
      finished: () => i >= block.scope.nodes.length,
    };
  };

  const step = (): StepType => {
    if (computeStack.length === 0) return;

    const { computeLine, finished } = computeStack[computeStack.length - 1];

    if (finished()) {
      computeStack.pop();
      return step();
    }

    const node = computeLine();

    return {
      node,
      stack: [...stack],
    };
  };

  return {
    reset,
    step,
    stack,
    pushCompute,
  };
};

export default Runner;
