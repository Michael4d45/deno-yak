import { useEffect, useState } from "preact/hooks";
import { Block, Token } from "../types.ts";
import buildAST from "./pasre.ts";

interface Props {
  tokens: Token[];
}

const getRootBlock = () => ({
  parent: null,
  scope: {
    nodes: [],
    functions: {},
    variables: {},
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
