import { useEffect, useState } from "preact/hooks";
import Error from "../components/Error.tsx";
import Input from "../components/Input.tsx";
import Tokens from "../components/Tokens.tsx";
import tokenizer from "../Yak/Tokenizer.ts";
import { Token } from "../Yak/types.ts";
import useAST from "../Yak/useAST.ts";
import useCompute from "../Yak/useCompute.ts";

export default function REPL() {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [error, setError] = useState("");
  const [pos, setPos] = useState(1);

  const onSubmit = (value: string) => {
    console.log({ value });
    try {
      const newTokens = tokenizer(value);
      if (pos >= newTokens.length) {
        setPos(newTokens.length);
      }
      setTokens(newTokens);
      setError("");
    } catch ({ message }) {
      setTokens([]);
      setError(message);
    }
  };

  const increment = () => {
    setPos((oldPos) => {
      if (oldPos >= tokens.length) return oldPos;
      return oldPos + 1;
    });
  };

  const decrement = () => {
    setPos((oldPos) => {
      if (oldPos <= 1) return 1;
      return oldPos - 1;
    });
  };

  const { block, astError } = useAST({ tokens });

  const { stack } = useCompute({ block, pos });

  useEffect(() => {
    console.log(stack);
  }, [stack]);

  useEffect(() => {
    console.log({ block, astError });
  }, [block, astError]);

  return (
    <div class="flex flex-row w-screen h-screen font-mono">
      <div class="w-1/3 bg-gray-100">
        <Input {...{ onSubmit }} />
      </div>
      <div class="w-1/3 bg-gray-200 whitespace-pre h-full flex flex-col">
        <div class="flex-grow overflow-y-scroll">
          {tokens.length > 0 && (
            <Tokens tokens={tokens} pos={pos} setPos={setPos} />
          )}
          {error && <Error error={error} />}
        </div>
        <div class="w-full flex flex-row">
          <button
            class="flex-grow border border-2 border-gray-300 rounded-lg"
            onClick={decrement}
          >
            Back
          </button>
          <button
            class="flex-grow border border-2 border-gray-300 rounded-lg"
            onClick={increment}
          >
            Step
          </button>
        </div>
      </div>
      <div class="w-1/3 bg-gray-300 flex flex-col">
        <div>Stack</div>
        {stack.reverse().map((num, i) => (
          <div key={i}>{num}</div>
        ))}
      </div>
    </div>
  );
}
