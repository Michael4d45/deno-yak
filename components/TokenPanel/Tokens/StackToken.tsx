import { useEffect, useRef } from "preact/hooks";
import { Token } from "../../../Yak/types.ts";

interface Props {
  token: Token;
  active: boolean;
  numLength: number;
}

const scrollIntoViewIfNeeded = (target: HTMLElement | null) => {
  if (!target) return;

  const parent = target.parentElement;

  if (!parent) return null;

  const parentRect = parent.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();
  
  if (targetRect.bottom > parentRect.bottom) {
    parent.scrollBy(0, targetRect.bottom - parentRect.bottom);
  }

  if (targetRect.top < parentRect.top) {
    parent.scrollBy(0, targetRect.top - parentRect.top);
  }
};

const StackToken = ({ token, active, numLength }: Props) => {
  const ref = useRef(null);
  let whiteSpace = "";
  const len = numLength - `${token.lineNumber}`.length;
  while (whiteSpace.length < len) {
    whiteSpace += " ";
  }

  useEffect(() => {
    if (active) {
      scrollIntoViewIfNeeded(ref.current);
    }
  }, [active]);

  return (
    <div
      ref={ref}
      class="w-full flex flex-row hover:text-gray-600 hover:bg-gray-300 cursor-pointer"
    >
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
