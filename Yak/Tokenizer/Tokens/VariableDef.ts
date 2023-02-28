import { nameReg, VAR_DECLARATION, VariableDefName } from "../../types.ts";
import { PushTokenType } from "../types.ts";

const testVariableDef = (
  token: string,
  pushToken: PushTokenType,
) => {
  if (token.startsWith(VAR_DECLARATION)) {
    const name = token.slice(VAR_DECLARATION.length);

    let error = "";

    if (!nameReg.test(name)) {
      error += `Expected variable name ${nameReg}: ${name}`;
    }

    pushToken({
      type: "VARIABLE_DEF",
      value: token as VariableDefName,
      name,
    }, error);

    return true;
  }
  return false;
};

export default testVariableDef;
