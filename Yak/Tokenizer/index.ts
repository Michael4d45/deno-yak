import checkToken from "./Tokens/index.ts";
import { Token, TokenType } from "../types.ts";
import { PushTokenType } from "./types.ts";

const splitString = (str: string) => str.trim().split(/[\s]+/);

const tokenizer = (input: string): Token[] => {
  const tokens: Token[] = [];

  if (input.length === 0) {
    return tokens;
  }

  const pushToken: PushTokenType = (token: TokenType, error = "") =>
    tokens.push({
      ...token,
      lineNumber: tokens.length + 1,
      errors: error ? [error] : [],
    });

  const arr = splitString(input);

  for (let cursor = 0; cursor < arr.length; cursor++) {
    const token = arr[cursor];

    checkToken(token, pushToken);
  }

  return tokens;
};

export default tokenizer;
