import { useEffect, useState } from "preact/hooks";
import Input from "../components/Input.tsx";
import Tokens from "../components/Tokens.tsx";
import useCompute from "../Yak/Compute/useCompute.ts";
import tokenizer from "../Yak/Tokenizer/index.ts";
import { Token } from "../Yak/types.ts";
import useAST from "../Yak/AST/useAST.ts";
import { Variable } from "../Yak/Compute/types.ts";

const PlayGround = () => {
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
    const newTokenErrors = tokens.filter((token) => token.errors.length > 0);

    setTokenErrors(newTokenErrors);

    if (newTokenErrors.length === 0) {
      setBlock(block);
    }
  }, [tokens, block]);

  return (
    <div class="flex flex-row w-screen h-screen font-mono">
      <div class="w-1/3 bg-gray-100">
        <Input {...{ onSubmit }} />
      </div>
      <div class="w-1/3 bg-gray-200 whitespace-pre h-full flex flex-col">
        <div class="flex-grow overflow-y-scroll">
          <Tokens tokens={tokens} tokenErrors={tokenErrors} pos={pos} />
        </div>
        <div class="w-full flex flex-row">
          <button
            class="flex-grow border border-2 border-gray-300 rounded-lg"
            onClick={step}
          >
            Step
          </button>
          <button
            class="flex-grow border border-2 border-gray-300 rounded-lg"
            onClick={run}
          >
            {running === null ? <>Run</> : <>Stop</>}
          </button>
          <button
            class="flex-grow border border-2 border-gray-300 rounded-lg"
            onClick={fast}
          >
            {running === null ? <>Fast</> : <>Stop</>}
          </button>
          <button
            class="flex-grow border border-2 border-gray-300 rounded-lg"
            onClick={reset}
          >
            Reset
          </button>
        </div>
      </div>
      <div class="w-1/3 bg-gray-300 flex flex-row space-x-2">
        <div class="flex flex-col">
          <div>Stack</div>
          {calcError && <div class="text-red-500">{calcError}</div>}
          <div class="overflow-y-scroll">
            {[...stack].reverse().map((num, i) => (
              <div key={i}>{num}</div>
            ))}
          </div>
        </div>
        {variables.map(({ name, stack }: Variable) => (
          <div class="flex flex-col">
            <div>{name}</div>
            <div class="overflow-y-scroll">
              {[...stack].reverse().map((num, i) => (
                <div key={i}>{num}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayGround;
