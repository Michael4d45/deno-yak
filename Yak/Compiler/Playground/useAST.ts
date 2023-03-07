import { useEffect, useState } from "preact/hooks";
import buildAST from "../../AST/parse.ts";
import { Nodes, Token } from "../../types.ts";

interface Props {
  tokens: Token[];
}

const useAST = ({ tokens }: Props) => {
  const [cachedTokens, setCachedTokens] = useState("");
  const [block, setBlock] = useState<Nodes>([]);

  useEffect(() => {
    const stringedTokens = JSON.stringify(tokens);
    if (stringedTokens === cachedTokens) return;

    setCachedTokens(stringedTokens);

    setBlock(buildAST([...tokens]));
  }, [tokens]);

  return block;
};

export default useAST;
