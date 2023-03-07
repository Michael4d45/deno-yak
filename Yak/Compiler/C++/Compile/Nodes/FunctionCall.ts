import { FunctionCallNode } from "../../../../types.ts";

const calculateFunctionCall = (
  node: FunctionCallNode,
  spaces: string,
) => {
  return [
    `${spaces}${node.value}();`
  ]
};

export default calculateFunctionCall;
