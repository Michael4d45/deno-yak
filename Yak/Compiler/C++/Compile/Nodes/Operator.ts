import { funcName, operationFunctions } from "../Functions/Functions.ts";

const calculateOp = (
  op: string,
  spaces: string,
) => {
  return `${spaces}${funcName(operationFunctions.get(op) || "")}();`;
};
export default calculateOp;
