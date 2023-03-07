import {
  TAKE_CONSUMES,
  VariableNode,
  VariableOperation,
} from "../../../../types.ts";
import { funcName } from "../Functions/Functions.ts";

const calculateVariable = (
  node: VariableNode,
  spaces: string,
) => {
  const c = [
    "",
  ];

  const operationTransfer = (
    op: VariableOperation,
    from: string,
    to: string,
  ) => {
    if (node.operation === op) {
      if (node.consumes === TAKE_CONSUMES) {
        c.push(
          `${spaces}_TOP = _STACK.back();`,
          `${spaces}_STACK.pop_back();`,
        );
      } else {
        c.push(
          `${spaces}_TOP = ${from}.size();`,
        );
      }

      c.push(`${spaces}${funcName("transferTop")}(${from}, ${to});`);
    }
  };

  operationTransfer("->", "_STACK", node.name);
  operationTransfer("<-", node.name, "_STACK");

  return c;
};

export default calculateVariable;
