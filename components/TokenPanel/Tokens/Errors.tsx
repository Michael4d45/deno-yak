import { YakType } from "../../../Yak/useYak.ts";

interface Props {
  tokenErrors: YakType["tokenErrors"];
}

const Errors = ({ tokenErrors }: Props) => (
  <>
    {tokenErrors.length > 0 && (
      <>
        <div class="w-8"></div>
        <div class="text-red-500">
          <div>{tokenErrors.length} Syntax Error(s).</div>
          <div>{`${tokenErrors.map((token) => token.lineNumber)}`}</div>
        </div>
      </>
    )}
  </>
);

export default Errors;
