import { ExpressionNode, Nodes, STACK } from "../../../../types.ts";
import calculateConditional from "./Conditional.ts";
import calculateFunctionDef from "./FunctionDef.ts";

export const baseSpace = "    ";

export const getProcedure = (nodes: Nodes, spaces?: string): string[] => {
  if (spaces === undefined) spaces = "";
  else spaces = `${baseSpace}${spaces}`;
  return nodes.reduce(
    (acc: string[], curr) => acc.concat(computeNode(curr, spaces)),
    [],
  );
};

const computeNode = (
  node: ExpressionNode,
  spaces = "",
): string[] | string => {
  switch (node.type) {
    case "NUMBER":
    case "TERNARY_OPERATOR":
    case "BINARY_OPERATOR":
    case "UNARY_OPERATOR":
    case "FUNCTION_CALL":
    case "STRING":
      return `${spaces}${node.value}`;
    case "CONDITIONAL":
      return calculateConditional(node, spaces);
    case "VARIABLE":
      return `${node.consumes === STACK ? spaces : "/n"}${
        node.consumes === STACK ? STACK : ""
      }${node.operation}${node.name}`;
    case "FUNCTION_DEF":
      return calculateFunctionDef(node, spaces);
    case "VARIABLE_DEF":
      return `${spaces}[]${node.name}`;
  }
};

export default computeNode;
