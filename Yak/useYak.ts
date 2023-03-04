import { useEffect, useState } from "preact/hooks";
import useAST from "./AST/useAST.ts";
import useCompute from "./Compute/useCompute.ts";
import tokenizer from "./Tokenizer/index.ts";
import { Token } from "./types.ts";

export type YakType = ReturnType<typeof useYak>;

const useYak = () => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [tokenErrors, setTokenErrors] = useState<Token[]>([]);
  const [pos, setPos] = useState(1);

  const onSubmit = (value: string) => {
    setTokens(tokenizer(value));
  };

  const block = useAST({ tokens });

  const {
    setBlock,
    stack,
    step,
    run,
    calcError,
    running,
    reset,
    fast,
    variables,
  } = useCompute({
    setPos,
  });

  useEffect(() => {
    const newTokenErrors = tokens.filter((token: Token) =>
      token.errors.length > 0
    );

    setTokenErrors(newTokenErrors);

    if (newTokenErrors.length === 0) {
      setBlock(block);
    }
  }, [tokens, block]);

  return {
    tokens,
    tokenErrors,
    pos,
    onSubmit,
    stack,
    step,
    run,
    calcError,
    running,
    reset,
    fast,
    variables,
  };
};

export default useYak;
