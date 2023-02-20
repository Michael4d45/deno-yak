import { useEffect, useState } from "preact/hooks";
import { Block, Token } from "./types.ts";

const getBlockAST = (tokens: Token[], pointer: number, block: Block) =>
  buildAST(getBlock(tokens, pointer), {
    parent: block,
    scope: {
      nodes: [],
      functions: {},
    },
  });

const getBlock = (tokens: Token[], pointer: number) => {
  if (tokens[pointer + 1] === undefined) {
    throw (new Error("Unexpected termination"));
  }
  if (tokens[pointer + 1].type !== "LEFT_BRACKET") {
    throw (new Error("Expected '{'"));
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
    console.log({ curToken, rightPointer, depth });
  }
  if (rightPointer >= tokens.length) {
    throw (new Error("Expected '}'"));
  }

  const newTokens = tokens.splice(pointer + 2, rightPointer - pointer - 2);
  tokens.splice(pointer + 1, 2);
  return newTokens;
};

const buildAST = (tokens: Token[], block: Block) => {
  if (tokens.length === 0) return block;
  console.log({ tokens, block });
  for (let pointer = 0; pointer < tokens.length; pointer++) {
    const curToken = tokens[pointer];
    console.log({ pointer, curToken });
    switch (curToken.type) {
      case "FUNCTION_NAME":
        block.scope.nodes.push({
          type: "FUNCTION_CALL",
          name: curToken.value,
        });
        break;
      case "IDENTIFIER":
        block.scope.functions[curToken.name] = {
          type: "FUNCTION_DEF",
          name: curToken.name,
          arity: curToken.arity,
          block: getBlockAST(tokens, pointer, block),
        };
        break;
      case "LEFT_BRACKET":
        throw (new Error(`Unexpected '{'`));
      case "RIGHT_BRACKET":
        throw (new Error(`Unexpected '}'`));
      case "NUMBER":
        block.scope.nodes.push({
          type: "NUMBER",
          value: curToken.value,
        });
        break;
      case "BINARY_OPERATOR":
        block.scope.nodes.push({
          type: "BINARY_OPERATOR",
          value: curToken.value,
        });
        break;
      case "UNARY_OPERATOR":
        block.scope.nodes.push({
          type: "UNARY_OPERATOR",
          value: curToken.value,
        });
        break;
      case "CONDITIONAL":
        block.scope.nodes.push({
          type: "CONDITIONAL",
          value: curToken.value,
          block: getBlockAST(tokens, pointer, block),
        });
        break;
    }
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
  const [astError, setError] = useState("");

  useEffect(() => {
    console.log("INIT");
  }, []);

  useEffect(() => {
    const stringedTokens = JSON.stringify(tokens);
    if (stringedTokens === cachedTokens) return;

    setCachedTokens(stringedTokens);

    try {
      setBlock(buildAST([...tokens], getRootBlock()));
      setError("");
    } catch ({ message }) {
      setError(message);
      setBlock(getRootBlock());
    }
  }, [tokens]);

  return {
    block,
    astError,
  };
};

export default useAST;
