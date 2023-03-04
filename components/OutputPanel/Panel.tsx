import { Variable } from "../../Yak/Compute/types.ts";
import { YakType } from "../../Yak/useYak.ts";

const OutputPanel = ({ calcError, stack, variables }: YakType) => (
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
);

export default OutputPanel;
