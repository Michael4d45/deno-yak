import { ASTBlock, ComputeBlock, ComputeBlockParent, Stack } from "../types.ts";
import computeNode from "./Nodes/index.ts";
import { PushComputeType, StepType, Variables } from "./types.ts";

const newBlock = (
  block: ASTBlock,
  parent: ComputeBlockParent,
): ComputeBlock => {
  return {
    parent: parent,
    nodes: [...block.nodes],
    pointer: 0,
    scope: {
      functions: {},
      variables: {},
    },
  };
};

const computeLine = (
  block: ComputeBlock,
  stack: Stack,
  pushCompute: PushComputeType,
) => {
  const node = block.nodes[block.pointer++];
  computeNode(block, node, stack, pushCompute);
  return node;
};

const Runner = () => {
  const stack: Stack = [];
  let currentBlock: ComputeBlockParent = null;

  const reset = () => {
    currentBlock = null;
    stack.length = 0;
  };

  const pushCompute: PushComputeType = (block: ASTBlock) => {
    currentBlock = newBlock(block, currentBlock);
  };

  const getBlockVariables = (
    block: ComputeBlockParent,
    variables: Variables,
  ): Variables => {
    if (block === null) return [];
    variables = variables.concat(
      Object.entries(block.scope.variables).map(([name, stack]) => ({
        name,
        stack,
      })),
    );
    return variables.concat(getBlockVariables(block.parent, variables));
  };

  const getVariables = (): Variables => getBlockVariables(currentBlock, []);

  const step = (): StepType => {
    if (currentBlock === null) return;

    if (currentBlock.pointer >= currentBlock.nodes.length) {
      currentBlock = currentBlock.parent;
      return step();
    }

    const node = computeLine(currentBlock, stack, pushCompute);

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
