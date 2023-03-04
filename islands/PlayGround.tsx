import Input from "../components/Input.tsx";
import Tokens from "../components/Tokens.tsx";
import { Variable } from "../Yak/Compute/types.ts";
import useYak from "../Yak/useYak.ts";

const PlayGround = () => {
  const yak = useYak();

  return (
    <div class="flex flex-row w-screen h-screen font-mono">
      <div class="w-1/3 bg-gray-100">
        <Input onSubmit={yak.onSubmit} />
      </div>
      <div class="w-1/3 bg-gray-200 whitespace-pre h-full flex flex-col">
        <div class="flex-grow overflow-y-scroll">
          <Tokens
            tokens={yak.tokens}
            tokenErrors={yak.tokenErrors}
            pos={yak.pos}
          />
        </div>
        <div class="w-full flex flex-row">
          <button
            class="flex-grow border border-2 border-gray-300 rounded-lg"
            onClick={yak.step}
          >
            Step
          </button>
          <button
            class="flex-grow border border-2 border-gray-300 rounded-lg"
            onClick={yak.run}
          >
            {yak.running === null ? <>Run</> : <>Stop</>}
          </button>
          <button
            class="flex-grow border border-2 border-gray-300 rounded-lg"
            onClick={yak.fast}
          >
            {yak.running === null ? <>Fast</> : <>Stop</>}
          </button>
          <button
            class="flex-grow border border-2 border-gray-300 rounded-lg"
            onClick={yak.reset}
          >
            Reset
          </button>
        </div>
      </div>
      <div class="w-1/3 bg-gray-300 flex flex-row space-x-2">
        <div class="flex flex-col">
          <div>Stack</div>
          {yak.calcError && <div class="text-red-500">{yak.calcError}</div>}
          <div class="overflow-y-scroll">
            {[...yak.stack].reverse().map((num, i) => (
              <div key={i}>{num}</div>
            ))}
          </div>
        </div>
        {yak.variables.map(({ name, stack }: Variable) => (
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
