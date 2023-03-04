import { FunctionComponent } from "preact";
import { YakType } from "../../../Yak/useYak.ts";
import Errors from "./Errors.tsx";
import StackToken from "./StackToken.tsx";

interface Props {
  tokens: YakType["tokens"];
  tokenErrors: YakType["tokenErrors"];
  pos: YakType["pos"];
}

const Tokens: FunctionComponent<Props> = ({ tokens, tokenErrors, pos }) => {
  const numLength = `${tokens.length}`.length;
  return (
    <>
      <div class="w-full h-full flex flex-col">
        <Errors {...{ tokenErrors }} />
        <div class="overflow-y-scroll -h-28 flex-grow">
          {tokens.map((token) => (
            <StackToken
              key={token.lineNumber}
              active={pos === token.lineNumber}
              token={token}
              numLength={numLength}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Tokens;
