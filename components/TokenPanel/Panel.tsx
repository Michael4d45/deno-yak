import { YakType } from "../../Yak/useYak.ts";
import Commands from "./Commands.tsx";
import Tokens from "./Tokens/Tokens.tsx";

const TokenPanel = (yak: YakType) => (
  <div class="w-1/3 bg-gray-200 whitespace-pre h-full flex flex-col">
    <Tokens {...yak} />
    <Commands {...yak} />
  </div>
);

export default TokenPanel;
