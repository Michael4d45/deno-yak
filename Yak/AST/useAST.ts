import { useEffect, useState } from "preact/hooks";
import { ASTBlock, Token } from "../types.ts";
import buildAST from "./parse.ts";

interface Props {
  tokens: Token[];
}

const getRootBlock = () => ({
  parent: null,
  nodes: [],
});

const useAST = ({ tokens }: Props) => {
  const [cachedTokens, setCachedTokens] = useState("");
  const [block, setBlock] = useState<ASTBlock>(getRootBlock());

  useEffect(() => {
    const stringedTokens = JSON.stringify(tokens);
    if (stringedTokens === cachedTokens) return;

    setCachedTokens(stringedTokens);

    setBlock(buildAST([...tokens], getRootBlock()));
  }, [tokens]);

  return block;
};

export default useAST;
