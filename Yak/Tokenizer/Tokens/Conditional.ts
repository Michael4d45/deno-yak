import { Conditional, conditionalOperators } from "../../types.ts";
import { PushTokenType, TestType } from "../types.ts";

const testConditional: TestType = (
  token: string,
  pushToken: PushTokenType,
) => {
  const operator = token as Conditional;
  if (conditionalOperators.includes(operator)) {
    pushToken({ type: "CONDITIONAL", value: operator });
    return true;
  }
  return false;
};

export default testConditional;
