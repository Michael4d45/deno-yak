import {
  ConditionalNode,
  ExpressionNode,
  FunctionDefNode,
  Nodes,
  NodeType,
  StringNode,
  Token,
} from "../types.ts";
import { getNodes } from "./block.ts";
import { buildStringFragments } from "./string.ts";

const parseToken = (
  nodes: Nodes,
  tokens: Token[],
  pointer: number,
) => {
  const token = tokens[pointer];

  const getProceedure = () => buildAST(getNodes(tokens, pointer));

  const pushNode = (node?: NodeType) => {
    nodes.push({
      ...(token as ExpressionNode),
      ...(node ? node : {}),
    });
  };

  if (token.type === "IDENTIFIER") {
    return pushNode({
      type: "FUNCTION_DEF",
      nodes: getProceedure(),
    } as FunctionDefNode);
  }

  if (token.type === "CONDITIONAL_IF") {
    const if_nodes = getProceedure();
    let else_nodes: Nodes = [];
    if (pointer + 1 < tokens.length) {
      const elseToken = tokens[pointer + 1];
      if (elseToken.type === "CONDITIONAL_ELSE") {
        tokens.splice(pointer, 1);
        else_nodes = getProceedure();
      }
    }
    return pushNode({
      type: "CONDITIONAL",
      if_nodes,
      else_nodes,
    } as ConditionalNode);
  }

  if (token.type === "STRING") {
    return pushNode({
      fragments: buildStringFragments(token),
    } as StringNode);
  }

  if (
    token.type === "FUNCTION_CALL" ||
    token.type === "VARIABLE" ||
    token.type === "NUMBER" ||
    token.type === "BINARY_OPERATOR" ||
    token.type === "UNARY_OPERATOR" ||
    token.type === "TERNARY_OPERATOR" ||
    token.type === "VARIABLE_DEF"
  ) {
    return pushNode();
  }
  token.errors.push(`Unexpected token`);
};

const buildAST = (tokens: Token[]) => {
  const nodes: Nodes = [];

  if (tokens.length === 0) return nodes;

  for (let pointer = 0; pointer < tokens.length; pointer++) {
    parseToken(nodes, tokens, pointer);
  }

  return nodes;
};

export default buildAST;
