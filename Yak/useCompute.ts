import { useEffect, useState } from "preact/hooks";
import {
  BinaryOperator,
  Block,
  ConditionalNode,
  FunctionDefNode,
  Statement,
  UnaryOperator,
} from "./types.ts";

interface Props {
  block: Block;
}

type Stack = number[];

const testArgLength = (expect: number, stack: Stack) => {
  if (stack.length < expect) {
    throw new Error(
      `Unary operator expected ${expect} argument(s), got ${stack.length}`,
    );
  }
};

const calculateBinaryOp = (
  op: BinaryOperator,
  stack: Stack,
) => {
  testArgLength(2, stack);

  const first = stack.pop() as number;
  const second = stack.pop() as number;
  switch (op) {
    case "+":
      return first + second;
    case "-":
      return first - second;
    case "*":
      return first * second;
    case "%":
      return first % second;
    case "==":
      return first === second ? 1 : 0;
  }
};

const calculateUnaryOp = (
  op: UnaryOperator,
  stack: Stack,
) => {
  testArgLength(1, stack);

  const arg = stack[stack.length - 1];
  switch (op) {
    case ".":
      return arg;
  }
};

const calculateConditional = (
  node: ConditionalNode,
  stack: Stack,
) => {
  testArgLength(1, stack);
  const op = node.value;

  const arg = stack.pop() as number;

  // If op is '?' isFalsy is true if arg is 0
  // If op is '!' isFalsy is true if arg is not 0
  const isFalsy = op === "?" ? arg === 0 : arg !== 0;

  if (!isFalsy) {
    compute(node.block, stack);
  }
};

const getFunction = (name: string, block: Block): FunctionDefNode | null => {
  const func = block.scope.functions[name];

  if (func !== undefined) return func;

  if (block.parent === null) return null;

  return getFunction(name, block.parent);
};

const calculateFunctionCall = (
  block: Block,
  name: string,
  stack: Stack,
) => {
  const func = getFunction(name, block);

  if (func === null) {
    throw new Error(`Function '${name}' not defined`);
  }

  testArgLength(func.arity, stack);

  compute(func.block, stack);
};

const computeNode = (block: Block, node: Statement, stack: Stack) => {
  switch (node.type) {
    case "NUMBER":
      return node.value;
    case "BINARY_OPERATOR":
      return calculateBinaryOp(node.value, stack);
    case "UNARY_OPERATOR":
      return calculateUnaryOp(node.value, stack);
    case "CONDITIONAL":
      return calculateConditional(node, stack);
    case "FUNCTION_CALL":
      return calculateFunctionCall(block, node.name, stack);
    case "FUNCTION_DEF":
      throw new Error("Unexpected Function Def");
  }
};

const compute = (block: Block, stack: Stack) => {
  console.log(`${stack}`);
  block.scope.nodes.forEach((node) => {
    const res = computeNode(block, node, stack);
    if (res !== undefined) stack.push(res);
  });
  return stack;
};

const useCompute = ({ block }: Props) => {
  const [stack, setStack] = useState<Stack>([]);

  useEffect(() => {
    setStack(compute(block, []));
  }, [block]);

  return {
    stack,
  };
};

export default useCompute;
