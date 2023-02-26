import { nameReg } from "../../types.ts";
import { PushTokenType, TestType } from "../types.ts";

const testFunctionCall: TestType = (
  token: string,
  pushToken: PushTokenType,
) => {
  if (nameReg.test(token)) {
    pushToken({ type: "FUNCTION_CALL", value: token });
    return true;
  }
  return false;
};

export default testFunctionCall;
