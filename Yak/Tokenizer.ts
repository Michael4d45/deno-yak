import { Token, TokenType } from "./types.ts";

const functionNameReg = /^[A-Za-z][A-Za-z_]*$/;

const splitString = (str: string) => str.trim().split(/[\s]+/);

const tokenizer = (input: string): Token[] => {
  const tokens: Token[] = [];

  if (input.length === 0) {
    return tokens;
  }

  const pushToken = (token: TokenType, error = "") =>
    tokens.push({
      ...token,
      lineNumber: tokens.length + 1,
      errors: error ? [error] : [],
    });

  const arr = splitString(input);

  for (let cursor = 0; cursor < arr.length; cursor++) {
    const token = arr[cursor];

    if (!isNaN(Number(token))) {
      pushToken({ type: "NUMBER", value: Number(token) });
      continue;
    }

    if (token === "." || token === "@") {
      pushToken({ type: "UNARY_OPERATOR", value: token });
      continue;
    }

    if (
      token === "+" || token === "-" || token === "*" || token === "%" ||
      token === "==" || token === "|" || token === "&" || token === "^" ||
      token === "<->" || token === "<^>"
    ) {
      pushToken({ type: "BINARY_OPERATOR", value: token });
      continue;
    }

    if (token === "<<<") {
      pushToken({ type: "TERNARY_OPERATOR", value: token });
      continue;
    }

    if (token === "!" || token === "?") {
      pushToken({ type: "CONDITIONAL", value: token });
      continue;
    }

    if (token === "{") {
      pushToken({ type: "LEFT_BRACKET", value: "{" });
      continue;
    }

    if (token === "}") {
      pushToken({ type: "RIGHT_BRACKET", value: "}" });
      continue;
    }

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
        value: token,
        arity: Number(arity),
        name: name,
      }, error);
      continue;
    }

    if (functionNameReg.test(token)) {
      pushToken({ type: "FUNCTION_CALL", value: token });
      continue;
    }

    pushToken({ type: "UNKNOWN", value: token }, "Unknown Token");
  }

  return tokens;
};

export default tokenizer;
