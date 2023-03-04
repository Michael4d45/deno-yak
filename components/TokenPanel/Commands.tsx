import { YakType } from "../../Yak/useYak.ts";

const Commands = ({ step, run, fast, running, reset }: YakType) => (
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
);

export default Commands;
