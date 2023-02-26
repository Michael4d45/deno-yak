import { FunctionIdentifier } from "../../types.ts";
import { functionNameReg, PushTokenType, TestType } from "../types.ts";

const testIdentifier: TestType = (
  token: string,
  pushToken: PushTokenType,
) => {
  if (token.includes("#")) {
    const [arity, name] = token.split("#");

    let error = "";

    if (isNaN(Number(arity))) {
      error += `Expected Number: ${arity}`;
    }
    if (!functionNameReg.test(name)) {
      if (error) error += "\n";
      error += `Expected function name ${functionNameReg}: ${name}`;
    }

    pushToken({
      type: "IDENTIFIER",
      value: token as FunctionIdentifier,
      arity: Number(arity),
      name: name,
    }, error);

    return true;
  }
  return false;
};

export default testIdentifier;
