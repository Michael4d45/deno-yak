import { FunctionComponent } from "preact";
import { Token } from "../Yak/types.ts";

interface Props {
  token: Token;
  rank: number;
  active: boolean;
  numLength: number;
  setPos: (pos: number) => void;
}

const StackToken: FunctionComponent<Props> = ({
  token,
  rank,
  active,
  numLength,
  setPos,
}) => {
  let text = "";
  switch (token.type) {
    case "FUNCTION_NAME":
    case "IDENTIFIER":
    case "BINARY_OPERATOR":
    case "UNARY_OPERATOR":
    case "CONDITIONAL":
      text = token.value;
      break;
    case "LEFT_BRACKET":
      text = "{";
      break;
    case "RIGHT_BRACKET":
      text = "}";
      break;
    case "NUMBER":
      text = `${token.value}`;
      break;
  }
  let whiteSpace = "";
  const len = numLength - `${rank}`.length;
  while (whiteSpace.length < len) {
    whiteSpace += " ";
  }
  return (
    <div
      class="w-full flex flex-row hover:text-gray-600 hover:bg-gray-300 cursor-pointer"
      onClick={() => setPos(rank)}
    >
      <div class="text-gray-500">
        {active ? "🔴" : "⚫"}
        {whiteSpace}
        {rank}
        {"| "}
      </div>
      <div>{text}</div>
    </div>
  );
};

export default StackToken;
