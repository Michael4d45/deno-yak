import { Block, ExpressionNode } from "../../types.d.ts";
import { PushComputeType, Stack } from "../types.d.ts";
import calculateBinaryOp from "./BinaryOperator.ts";
import calculateConditional from "./Conditional.ts";
import calculateFunctionCall from "./FunctionCall.ts";
import calculateTernaryOp from "./TernaryOperator.ts";
import calculateUnaryOp from "./UnaryOperator.ts";

const computeNode = (
  block: Block,
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
  }
};

export default computeNode;