import { FunctionComponent } from "preact";
import { Token } from "../Yak/types.ts";
import StackToken from "./StackToken.tsx";

interface Props {
  tokens: Token[];
  tokenErrors: Token[];
  pos: number;
}

const Tokens: FunctionComponent<Props> = ({
  tokens,
  tokenErrors,
  pos,
}) => {
  const numLength = `${tokens.length}`.length;
  return (
    <div class="w-full h-full flex flex-col">
      <div class="flex flex-row">
        <div>Tokens</div>
        {tokenErrors.length > 0 && (
          <>
            <div class="w-8"></div>
            <div class="text-red-500">
              {tokenErrors.length} Syntax Error(s). Lines: {"["}
              {`${tokenErrors.map((token) => token.lineNumber)}`}
              {"]"}
            </div>
          </>
        )}
      </div>
      {tokens.map((token) => (
        <StackToken
          key={token.lineNumber}
          active={pos === token.lineNumber}
          token={token}
          numLength={numLength}
        />
      ))}
    </div>
  );
};

export default Tokens;
