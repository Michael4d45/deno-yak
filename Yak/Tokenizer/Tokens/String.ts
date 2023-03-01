import { STRING_QUOTE, StringType } from "../../types.ts";
import { PushTokenType, TestType } from "../types.ts";

const testString: TestType = (
  token: string,
  pushToken: PushTokenType,
) => {
  if (
    token.startsWith(STRING_QUOTE) && token.endsWith(STRING_QUOTE) &&
    token.length > 1
  ) {
    pushToken({
      type: "STRING",
      value: token as StringType,
    });
    return true;
  }
  return false;
};

export default testString;
