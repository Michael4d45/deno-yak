import { ComputeBlock, ExpressionNode, Stack } from "../../types.ts";
import { PushComputeType } from "../types.ts";
import calculateBinaryOp from "./BinaryOperator.ts";
import calculateConditional from "./Conditional.ts";
import calculateFunctionCall from "./FunctionCall.ts";
import calculateTernaryOp from "./TernaryOperator.ts";
import calculateUnaryOp from "./UnaryOperator.ts";
import calculateVariable from "./Variable.ts";

const computeNode = (
  block: ComputeBlock,
  node: ExpressionNode,
  stack: Stack,
  pushCompute: PushComputeType,
) => {
  switch (node.type) {
    case "NUMBER":
      return stack.push(node.value);
    case "TERNARY_OPERATOR":
      return calculateTernaryOp(node.value, stack);
    case "BINARY_OPERATOR":
      return calculateBinaryOp(node.value, stack);
    case "UNARY_OPERATOR":
      return calculateUnaryOp(node.value, stack);
    case "CONDITIONAL":
      return calculateConditional(node, stack, pushCompute);
    case "FUNCTION_CALL":
      return calculateFunctionCall(block, node.value, stack, pushCompute);
    case "VARIABLE":
      return calculateVariable(block, node, stack);
    case "FUNCTION_DEF":
      return block.scope.functions[node.name] = node;
  }
};

export default computeNode;
