import checkToken from "./Tokens/index.ts";
import { Token, TokenType } from "../types.ts";
import { PushTokenType } from "./types.ts";

const sanitize = (str: string) => str.replace(/\/\/.*/g, "");

// This disgusting regex is brought to you by chatGPT.
// 'write js code that splits a string by spaces except for strings that start and end with ", strings can contain escaped \"
// with regex'
const splitString = (str: string) =>
  str.match(/("[^"\\]*(?:\\.[^"\\]*)*"|\S+)/g)?.filter(Boolean);

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

  const removedComments = sanitize(input);

  const arr = splitString(removedComments);

  if (!arr) return tokens;

  for (let cursor = 0; cursor < arr.length; cursor++) {
    const token = arr[cursor];

    checkToken(token, pushToken);
  }

  return tokens;
};

export default tokenizer;
