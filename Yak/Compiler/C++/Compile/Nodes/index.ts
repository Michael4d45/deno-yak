import { ExpressionNode, Nodes } from "../../../../types.ts";
import calculateConditional from "./Conditional.ts";
import calculateFunctionCall from "./FunctionCall.ts";
import calculateNumber from "./Number.ts";
import calculateString from "./String.ts";
import calculateOp from "./Operator.ts";
import calculateVariable from "./Variable.ts";
import calculateFunctionDef from "./FunctionDef.ts";

export const getProcedure = (nodes: Nodes, spaces = ""): string[] => {
  spaces = `    ${spaces}`;
  return nodes.reduce(
    (acc: string[], curr) => acc.concat(computeNode(curr, spaces)),
    [],
  );
};

const computeNode = (
  node: ExpressionNode,
  spaces = "    ",
): string[] | string => {
  switch (node.type) {
    case "NUMBER":
      return calculateNumber(node.value, spaces);
    case "TERNARY_OPERATOR":
    case "BINARY_OPERATOR":
    case "UNARY_OPERATOR":
      return calculateOp(node.value, spaces);
    case "CONDITIONAL":
      return calculateConditional(node, spaces);
    case "VARIABLE":
      return calculateVariable(node, spaces);
    case "FUNCTION_CALL":
      return calculateFunctionCall(node, spaces);
    case "FUNCTION_DEF":
      return calculateFunctionDef(node, spaces);
    case "VARIABLE_DEF":
      return `${spaces}std::vector<double> ${node.name} = {};`;
    case "STRING":
      return calculateString(node, spaces);
  }
  return "";
};

export default computeNode;
