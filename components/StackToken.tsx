import { FunctionComponent } from "preact";
import { Token } from "../Yak/types.d.ts";

interface Props {
  token: Token;
  active: boolean;
  numLength: number;
}

const StackToken: FunctionComponent<Props> = ({ token, active, numLength }) => {
  let whiteSpace = "";
  const len = numLength - `${token.lineNumber}`.length;
  while (whiteSpace.length < len) {
    whiteSpace += " ";
  }
  return (
    <div class="w-full flex flex-row hover:text-gray-600 hover:bg-gray-300 cursor-pointer">
      <div class="text-gray-500">
        {active ? "🔴" : "⚫"}
        {whiteSpace}
        {token.lineNumber}
        {"| "}
      </div>
      <div class="flex flex-col">
        <div>{token.value}</div>
        {token.errors.length > 0 && (
          <div class="text-red-500">
            {token.errors.map((msg) => (
              <div>{msg}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StackToken;
