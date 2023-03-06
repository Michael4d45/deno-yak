import { CONDITIONAL_ELSE, CONDITIONAL_IF } from "../../types.ts";
import { PushTokenType, TestType } from "../types.ts";

const testConditional: TestType = (
  token: string,
  pushToken: PushTokenType,
) => {
  if (CONDITIONAL_IF === token) {
    pushToken({ type: "CONDITIONAL_IF", value: token });
    return true;
  }
  if (CONDITIONAL_ELSE === token) {
    pushToken({ type: "CONDITIONAL_ELSE", value: token });
    return true;
  }
  return false;
};

export default testConditional;
