import {
  Consumes,
  nameReg,
  STACK,
  TAKE_CONSUMES,
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
    let [consumes, name] = token.split(operation);

    let error = "";

    if (consumes === "") {
      consumes = TAKE_CONSUMES;
    } else if (consumes !== STACK) {
      error += `Expected "STACK" or <EMPTY> : ${consumes}`;
    }

    if (!nameReg.test(name)) {
      if (error) error += "\n";
      error += `Expected variable name ${nameReg}: ${name}`;
    }

    pushToken({
      type: "VARIABLE",
      value: token as VariableName,
      consumes: consumes as Consumes,
      name,
      operation,
    }, error);

    return true;
  }
  return false;
};

export default testVariable;
