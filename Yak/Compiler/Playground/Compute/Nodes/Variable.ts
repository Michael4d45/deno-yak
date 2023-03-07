import { ComputeBlock, Stack, TAKE_CONSUMES, VariableNode, VariableOperation } from "../../../../types.ts";
import { testArgLength } from "./Verification.ts";

const getVariable = (
  name: string,
  block: ComputeBlock,
): Stack | null => {
  const variable = block.scope.variables[name];

  if (variable !== undefined) return variable;

  if (block.parent === null) return null;

  return getVariable(name, block.parent);
};

const transferTop = (from: Stack, to: Stack, count: number) => {
  const top = from.splice(from.length - count);
  to.push(...top.reverse());
};

const calculateVariable = (
  block: ComputeBlock,
  node: VariableNode,
  stack: Stack,
) => {
  const variable = getVariable(node.name, block);

  if (variable === null) {
    throw new Error(`Variable '${node.name}' not defined`);
  }

  let consumesNumber = Number();

  if (node.consumes === TAKE_CONSUMES) {
    testArgLength(1, stack, node.name);
    const top = stack.pop();
    if (top !== undefined) {
      if (!(Number.isInteger(top) && top > 0)) {
        throw new Error(`Expected positive integer, got ${top}`);
      }
      consumesNumber = top;
    } else {
      throw new Error("Against all odds, this error has been reached");
    }
  }

  const operationTransfer = (
    op: VariableOperation,
    from: Stack,
    to: Stack,
  ) => {
    if (node.operation === op) {
      if (node.consumes === TAKE_CONSUMES) {
        testArgLength(consumesNumber, from, node.name);
      } else {
        consumesNumber = from.length;
      }

      transferTop(from, to, consumesNumber);
    }
  };

  operationTransfer("->", stack, variable);
  operationTransfer("<-", variable, stack);
};

export default calculateVariable;
