import { Block, Stack } from "../types.ts";
import computeNode from "./Nodes/index.ts";
import { PushComputeType, StepType, Variables } from "./types.ts";

const newBlock = (block: Block): Block => {
  return {
    parent: block.parent,
    scope: {
      nodes: block.scope.nodes,
      functions: block.scope.functions,
      variables: {},
    },
  };
};

const Runner = () => {
  interface ComputeType {
    block: Block;
    compute: ReturnType<typeof compute>;
  }
  const computeStack: ComputeType[] = [];
  const stack: Stack = [];

  const reset = () => {
    computeStack.length = 0;
    stack.length = 0;
  };

  const pushCompute: PushComputeType = (block: Block) => {
    const b = newBlock(block);
    computeStack.push({
      block: b,
      compute: compute(b),
    });
  };

  const compute = (block: Block) => {
    let i = 0;

    const computeLine = () => {
      const node = block.scope.nodes[i];
      computeNode(block, node, stack, (b: Block) =>
        pushCompute({
          ...b,
          parent: block,
        }));
      i++;
      return node;
    };

    return {
      computeLine,
      finished: () => i >= block.scope.nodes.length,
    };
  };

  const getVariables = (): Variables => {
    return computeStack.reduce(
      (acc: Variables, curr: ComputeType) =>
        acc.concat(
          Object.entries(curr.block.scope.variables).map(([name, stack]) => ({
            name,
            stack,
          })),
        ),
      [],
    );
  };

  const step = (): StepType => {
    if (computeStack.length === 0) return;

    const { computeLine, finished } =
      computeStack[computeStack.length - 1].compute;

    if (finished()) {
      computeStack.pop();
      return step();
    }

    const node = computeLine();

    return {
      node,
      stack,
    };
  };

  return {
    reset,
    step,
    pushCompute,
    getVariables,
  };
};

export default Runner;
