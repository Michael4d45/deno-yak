import { ConditionalNode } from "../../../../types.ts";
import { getProcedure } from "./index.ts";

const calculateConditional = (
  node: ConditionalNode,
  spaces: string,
) => {
  let ifProcedure: string[] = [];

  if (node.if_nodes.length > 0) {
    ifProcedure = getProcedure(node.if_nodes, spaces);
  }

  let elseBlock: string[] = [];

  if (node.else_nodes.length > 0) {
    elseBlock = [
      `${spaces}else`,
      `${spaces}{`,
      ...getProcedure(node.else_nodes, spaces),
      `${spaces}}`,
    ];
  }

  const c = [
    "",
    `${spaces}_TOP = _STACK.back();`,
    `${spaces}_STACK.pop_back();`,
    `${spaces}if (_TOP != 0.0f ) {`,
    ...ifProcedure,
    `${spaces}}`,
    ...elseBlock,
  ];

  return c;
};

export default calculateConditional;
