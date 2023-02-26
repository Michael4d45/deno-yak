import { PushTokenType, TestType } from "../types.ts";

const testRightBracket: TestType = (
  token: string,
  pushToken: PushTokenType,
) => {
  if (token === "}") {
    pushToken({ type: "RIGHT_BRACKET", value: "}" });
    return true;
  }
  return false;
};

export default testRightBracket;
