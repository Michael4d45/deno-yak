import { BinaryOperator, binaryOperators } from "../../types.ts";
import { PushTokenType, TestType } from "../types.ts";

const testBinaryOperator: TestType = (
  token: string,
  pushToken: PushTokenType,
) => {
  const operator = token as BinaryOperator;
  if (binaryOperators.includes(operator)) {
    pushToken({ type: "BINARY_OPERATOR", value: operator });
    return true;
  }
  return false;
};

export default testBinaryOperator;
