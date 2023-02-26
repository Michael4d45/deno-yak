import { TernaryOperator, ternaryOperators } from "../../types.ts";
import { PushTokenType, TestType } from "../types.ts";

const testTernaryOperator: TestType = (
  token: string,
  pushToken: PushTokenType,
) => {
  const operator = token as TernaryOperator;
  if (ternaryOperators.includes(operator)) {
    pushToken({ type: "TERNARY_OPERATOR", value: operator });
    return true;
  }
  return false;
};

export default testTernaryOperator;
