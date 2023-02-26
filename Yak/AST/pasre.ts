import {
  Block,
  ConditionalNode,
  ExpressionNode,
  FunctionDefNode,
  NodeType,
  Token,
} from "../types.ts";

const getBlockAST = (tokens: Token[], pointer: number, block: Block) =>
  buildAST(getBlock(tokens, pointer), {
    parent: block,
    scope: {
      nodes: [],
      functions: {},
      variables: {},
    },
  });

const getBlock = (tokens: Token[], pointer: number) => {
  if (
    tokens[pointer + 1] === undefined
  ) {
    tokens[pointer].errors.push("Expected block");
    throw new Error("Syntax error");
  }
  if (
    tokens[pointer + 1].type !== "LEFT_BRACKET"
  ) {
    tokens[pointer + 1].errors.push("Expected '{'");
    throw new Error("Syntax error");
  }
  let rightPointer = pointer + 1;
  let depth = 1;
  while (depth > 0 && tokens[++rightPointer] !== undefined) {
    const curToken = tokens[rightPointer];
    if (curToken.type === "RIGHT_BRACKET") {
      depth--;
    }
    if (curToken.type === "LEFT_BRACKET") {
      depth++;
    }
  }
  if (rightPointer >= tokens.length) {
    tokens[tokens.length - 1].errors.push("Expected '}'");
  }

  const newTokens = tokens.splice(pointer + 2, rightPointer - pointer - 2);
  tokens.splice(pointer + 1, 2);
  return newTokens;
};

const parseToken = (
  block: Block,
  tokens: Token[],
  pointer: number,
) => {
  const token = tokens[pointer];

  const pushNode = (node?: NodeType) => {
    block.scope.nodes.push({
      ...(token as ExpressionNode),
      ...(node ? node : {}),
    });
  };

  if (token.type === "IDENTIFIER") {
    block.scope.functions[token.name] = {
      type: "FUNCTION_DEF",
      block: getBlockAST(tokens, pointer, block),
    } as FunctionDefNode;
    return;
  }

  if (token.type === "CONDITIONAL") {
    return pushNode({
      block: getBlockAST(tokens, pointer, block),
    } as ConditionalNode);
  }

  if (
    token.type === "FUNCTION_CALL" ||
    token.type === "VARIABLE" ||
    token.type === "NUMBER" ||
    token.type === "BINARY_OPERATOR" ||
    token.type === "UNARY_OPERATOR" ||
    token.type === "TERNARY_OPERATOR"
  ) {
    return pushNode();
  }
  token.errors.push(`Unexpected token`);
};

const buildAST = (tokens: Token[], block: Block) => {
  if (tokens.length === 0) return block;

  for (let pointer = 0; pointer < tokens.length; pointer++) {
    parseToken(block, tokens, pointer);
  }

  return block;
};

export default buildAST;
