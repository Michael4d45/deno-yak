import { useEffect, useState } from "preact/hooks";
import { Block, NodeType, Token } from "./types.ts";

const getBlockAST = (tokens: Token[], pointer: number, block: Block) =>
  buildAST(getBlock(tokens, pointer), {
    parent: block,
    scope: {
      nodes: [],
      functions: {},
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

  const pushNode = (node: NodeType) => {
    block.scope.nodes.push({
      ...node,
      lineNumber: token.lineNumber,
    });
  };

  switch (token.type) {
    case "FUNCTION_NAME":
      pushNode({
        type: "FUNCTION_CALL",
        name: token.value,
      });
      break;
    case "IDENTIFIER":
      block.scope.functions[token.name] = {
        type: "FUNCTION_DEF",
        name: token.name,
        arity: token.arity,
        block: getBlockAST(tokens, pointer, block),
      };
      break;
    case "NUMBER":
      pushNode({
        type: "NUMBER",
        value: token.value,
      });
      break;
    case "BINARY_OPERATOR":
      pushNode({
        type: "BINARY_OPERATOR",
        value: token.value,
      });
      break;
    case "UNARY_OPERATOR":
      pushNode({
        type: "UNARY_OPERATOR",
        value: token.value,
      });
      break;
    case "CONDITIONAL":
      pushNode({
        type: "CONDITIONAL",
        value: token.value,
        block: getBlockAST(tokens, pointer, block),
      });
      break;
    default:
      token.errors.push(`Unexpected token`);
      break;
  }
};

const buildAST = (tokens: Token[], block: Block) => {
  if (tokens.length === 0) return block;

  for (let pointer = 0; pointer < tokens.length; pointer++) {
    parseToken(block, tokens, pointer);
  }

  return block;
};

interface Props {
  tokens: Token[];
}

const getRootBlock = () => ({
  parent: null,
  scope: {
    nodes: [],
    functions: {},
  },
});

const useAST = ({ tokens }: Props) => {
  const [cachedTokens, setCachedTokens] = useState("");
  const [block, setBlock] = useState<Block>(getRootBlock());

  useEffect(() => {
    const stringedTokens = JSON.stringify(tokens);
    if (stringedTokens === cachedTokens) return;

    setCachedTokens(stringedTokens);

    setBlock(buildAST([...tokens], getRootBlock()));
  }, [tokens]);

  return block;
};

export default useAST;
