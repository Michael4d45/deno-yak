import { PushTokenType, TestType } from "../types.ts";

const testNumber: TestType = (token: string, pushToken: PushTokenType) => {
  if (!isNaN(Number(token))) {
    pushToken({ type: "NUMBER", value: Number(token) });
    return true;
  }
  return false;
};

export default testNumber;
