import { PushTokenType, TestType } from "../types.ts";

const unknown: TestType = (
  token: string,
  pushToken: PushTokenType,
) => {
  pushToken({ type: "UNKNOWN", value: token }, "Unknown Token");
  return true;
};

export default unknown;
