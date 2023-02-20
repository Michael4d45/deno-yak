import { Token } from "./types.ts";

const functionNameReg = /^[A-Za-z][A-Za-z_]*$/;

const point = (str: string[], pos: number) =>
  str.map((str, n) => `${n === pos ? "-->" : ""}${n + 1}: ${str}`)
    .join("\n");

const splitString = (str: string) => str.trim().split(/[\s]+/);

const tokenizer = (input: string): Token[] => {
  const tokens: Token[] = [];

  if (input.length === 0) {
    return tokens;
  }

  const arr = splitString(input);

  for (let cursor = 0; cursor < arr.length; cursor++) {
    const token = arr[cursor];

    if (!isNaN(Number(token))) {
      tokens.push({ type: "NUMBER", value: Number(token) });
      continue;
    }

    if (token === ".") {
      tokens.push({ type: "UNARY_OPERATOR", value: token });
      continue;
    }

    if (
      token === "+" || token === "-" || token === "*" || token === "%" ||
      token === "=="
    ) {
      tokens.push({ type: "BINARY_OPERATOR", value: token });
      continue;
    }

    if (token === "!" || token === "?") {
      tokens.push({ type: "CONDITIONAL", value: token });
      continue;
    }

    if (token === "{") {
      tokens.push({ type: "LEFT_BRACKET" });
      continue;
    }

    if (token === "}") {
      tokens.push({ type: "RIGHT_BRACKET" });
      continue;
    }

    if (token.includes("#")) {
      const [arity, name] = token.split("#");
      if (isNaN(Number(arity))) {
        throw new Error(
          `Expected Number: ${arity} \n ${point(arr, cursor)}`,
        );
      }
      if (!functionNameReg.test(name)) {
        throw new Error(
          `Expected ${functionNameReg}:\n ${point(arr, cursor)}`,
        );
      }
      tokens.push({
        type: "IDENTIFIER",
        value: token,
        arity: Number(arity),
        name: name,
      });
      continue;
    }

    if (functionNameReg.test(token)) {
      tokens.push({ type: "FUNCTION_NAME", value: token });
      continue;
    }

    throw new Error(
      `Invalid token: ${token} \n ${point(arr, cursor)}`,
    );
  }

  return tokens;
};

export default tokenizer;
