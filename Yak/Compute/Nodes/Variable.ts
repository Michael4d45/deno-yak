import { ComputeBlock, Stack, VariableNode } from "../../types.ts";
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

const createVar = (name: string, block: ComputeBlock): Stack => {
  return block.scope.variables[name] = [];
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
  let variable = getVariable(node.name, block);

  if (node.operation === "->") {
    if (node.consumes !== "ALL") {
      testArgLength(node.consumes, stack, node.name);
    }
    if (variable === null) {
      variable = createVar(node.name, block);
    }

    const consumes = node.consumes === "ALL" ? stack.length : node.consumes;

    transferTop(stack, variable, consumes);
  }

  if (node.operation === "<-") {
    if (variable === null) {
      throw new Error(`Variable '${node.name}' not defined`);
    }
    if (node.consumes !== "ALL") {
      testArgLength(node.consumes, variable, node.name);
    }

    const consumes = node.consumes === "ALL" ? variable.length : node.consumes;

    transferTop(variable, stack, consumes);
  }
};

export default calculateVariable;
