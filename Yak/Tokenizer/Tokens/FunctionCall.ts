import { functionNameReg, PushTokenType, TestType } from "../types.ts";

const testFunctionCall: TestType = (
  token: string,
  pushToken: PushTokenType,
) => {
  if (functionNameReg.test(token)) {
    pushToken({ type: "FUNCTION_CALL", value: token });
    return true;
  }
  return false;
};

export default testFunctionCall;
