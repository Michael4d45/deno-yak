import { FunctionDefNode } from "../../../../types.ts";
import { getProcedure } from "./index.ts";

const calculateFunctionDef = (
  node: FunctionDefNode,
  spaces: string,
) => {
  return [
    "",
    `${spaces}${node.arity}#${node.name} {`,
    ...getProcedure(node.nodes, spaces),
    `${spaces}}`,
    "",
  ];
};

export default calculateFunctionDef;
