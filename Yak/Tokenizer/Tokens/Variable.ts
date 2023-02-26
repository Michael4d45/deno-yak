import {
  nameReg,
  VariableName,
  VariableOperation,
  variableOperations,
} from "../../types.ts";
import { PushTokenType, TestType } from "../types.ts";

const testVariable: TestType = (
  token: string,
  pushToken: PushTokenType,
) => variableOperations.some((op) => testVariableOp(token, pushToken, op));

const testVariableOp = (
  token: string,
  pushToken: PushTokenType,
  operation: VariableOperation,
) => {
  if (token.includes(operation)) {
    const [consumes, name] = token.split(operation);

    let error = "";

    if (isNaN(Number(consumes))) {
      error += `Expected Number: ${consumes}`;
    } else if (consumes !== "" && Number(consumes) <= 0) {
      error += `Expected Number greater than 0: ${consumes}`;
    }

    if (!nameReg.test(name)) {
      if (error) error += "\n";
      error += `Expected variable name ${nameReg}: ${name}`;
    }

    pushToken({
      type: "VARIABLE",
      value: token as VariableName,
      consumes: consumes !== "" ? Number(consumes) : "ALL",
      name,
      operation: operation,
    }, error);

    return true;
  }
  return false;
};

export default testVariable;
