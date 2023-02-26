import { PushTokenType, TestType } from "../types.ts";

const testLeftBracket: TestType = (
  token: string,
  pushToken: PushTokenType,
) => {
  if (token === "{") {
    pushToken({ type: "LEFT_BRACKET", value: "{" });
    return true;
  }
  return false;
};

export default testLeftBracket;
