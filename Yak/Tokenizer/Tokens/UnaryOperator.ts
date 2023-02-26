import { UnaryOperator, unaryOperators } from "../../types.ts";
import { PushTokenType, TestType } from "../types.ts";

const testUnaryOperator: TestType = (
  token: string,
  pushToken: PushTokenType,
) => {
  const operator = token as UnaryOperator;
  if (unaryOperators.includes(operator)) {
    pushToken({ type: "UNARY_OPERATOR", value: operator });
    return true;
  }
  return false;
};

export default testUnaryOperator;
