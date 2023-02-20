import { FunctionComponent } from "preact";
import { Token } from "../Yak/types.ts";
import StackToken from "./StackToken.tsx";

interface Props {
  tokens: Token[];
  pos: number;
  setPos: (pos: number) => void;
}

const Tokens: FunctionComponent<Props> = ({ tokens, pos, setPos }) => {
  const numLength = `${tokens.length}`.length;
  return (
    <div class="w-full h-full flex flex-col">
      <div>Tokens</div>
      {tokens.map((token, n) => (
        <StackToken
          key={n}
          rank={n + 1}
          active={pos === n + 1}
          token={token}
          numLength={numLength}
          setPos={setPos}
        />
      ))}
    </div>
  );
};

export default Tokens;
